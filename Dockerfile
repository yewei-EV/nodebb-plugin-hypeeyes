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

FROM node:alpine
ENV NODE_ENV=production daemon=false silent=false
WORKDIR /app
COPY hypeeyes-forum/node_modules hypeeyes-forum/node_modules
COPY hypeeyes-plugin/node_modules hypeeyes-plugin/node_modules
COPY hypeeyes-forum hypeeyes-forum
COPY hypeeyes-theme hypeeyes-theme
COPY hypeeyes-plugin hypeeyes-plugin
COPY hypeeyes-web hypeeyes-web
RUN rm -rf hypeeyes-forum/node_modules/nodebb-plugin-hypeeyes
RUN ln -s /app/hypeeyes-plugin hypeeyes-forum/node_modules/nodebb-plugin-hypeeyes
RUN rm -rf hypeeyes-forum/node_modules/nodebb-theme-hypeeyes
RUN ln -s /app/hypeeyes-theme hypeeyes-forum/node_modules/nodebb-theme-hypeeyes
EXPOSE 4567
CMD ./hypeeyes-forum/nodebb start
