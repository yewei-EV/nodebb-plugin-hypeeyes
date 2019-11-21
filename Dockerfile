#FROM node:12.13
#ENV NODE_ENV=production daemon=false silent=false
#WORKDIR /app
#COPY hypeeyes-forum/install/package.json hypeeyes-forum/package.json
#COPY hypeeyes-plugin/package.json nodebb-plugin-hypeeyes/package.json
#RUN cd hypeeyes-forum && npm install --only=prod
#RUN cd nodebb-plugin-hypeeyes && npm install
#COPY hypeeyes-forum hypeeyes-forum
#COPY hypeeyes-forum/config-build.json hypeeyes-forum/config.json
#COPY hypeeyes-plugin nodebb-plugin-hypeeyes
#COPY hypeeyes-theme nodebb-theme-hypeeyes
#RUN ln -s /app/nodebb-plugin-hypeeyes hypeeyes-forum/node_modules && ln -s /app/nodebb-theme-hypeeyes hypeeyes-forum/node_modules
#RUN cd nodebb-plugin-hypeeyes && npm run build && npm cache clean --force
#RUN cd hypeeyes-forum && ./nodebb build && npm cache clean --force
#COPY hypeeyes-forum/config-production.json hypeeyes-forum/config.json
#COPY hypeeyes-web hypeeyes-web
#EXPOSE 4567
#CMD ./hypeeyes-forum/nodebb start

FROM node:12.13
ENV NODE_ENV=production daemon=false silent=false
WORKDIR /app
COPY hypeeyes-forum/install/package.json hypeeyes-forum/package.json
RUN cd hypeeyes-forum && npm config set registry=http://registry.npm.taobao.org && npm install --only=prod
COPY hypeeyes-plugin/package.json hypeeyes-plugin/package.json
RUN cd hypeeyes-plugin && npm config set registry=http://registry.npm.taobao.org && npm install --only=prod
COPY hypeeyes-forum hypeeyes-forum
COPY hypeeyes-theme hypeeyes-theme
COPY hypeeyes-plugin hypeeyes-plugin
COPY hypeeyes-web hypeeyes-web
RUN rm -rf hypeeyes-forum/node_modules/nodebb-plugin-hypeeyes
RUN ln -s /app/hypeeyes-plugin hypeeyes-forum/node_modules/nodebb-plugin-hypeeyes
RUN rm -rf hypeeyes-forum/node_modules/nodebb-theme-hypeeyes
RUN ln -s /app/hypeeyes-theme hypeeyes-forum/node_modules/nodebb-theme-hypeeyes
RUN cp hypeeyes-forum/config-build.json hypeeyes-forum/config.json && ./hypeeyes-forum/nodebb build
#RUN cp hypeeyes-forum/config-production.json hypeeyes-forum/config.json
RUN rm -rf hypeeyes-forum/config-build.json && rm -rf hypeeyes-forum/config-production.json
EXPOSE 4567
CMD ./hypeeyes-forum/nodebb start
