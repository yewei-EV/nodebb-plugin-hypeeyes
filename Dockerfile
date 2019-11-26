FROM node:12.13
ENV NODE_ENV=production daemon=false silent=false
WORKDIR /app
RUN npm config set registry=http://registry.npm.taobao.org
COPY hypeeyes-forum/install/package.json hypeeyes-forum/package.json
RUN cd hypeeyes-forum && npm install --only=prod
COPY hypeeyes-plugin/package.json hypeeyes-plugin/package.json
RUN cd hypeeyes-plugin && npm install --only=prod
COPY hypeeyes-web/package.json hypeeyes-web/package.json
RUN cd hypeeyes-web && npm install
COPY hypeeyes-forum hypeeyes-forum
COPY hypeeyes-web hypeeyes-web
RUN cd hypeeyes-web &&  ./node_modules/.bin/ng build --prod --aot --base-href=/hypeeyes/web/
COPY hypeeyes-theme hypeeyes-theme
COPY hypeeyes-plugin hypeeyes-plugin
RUN rm -rf hypeeyes-forum/node_modules/nodebb-plugin-hypeeyes
RUN ln -s /app/hypeeyes-plugin hypeeyes-forum/node_modules/nodebb-plugin-hypeeyes
RUN rm -rf hypeeyes-forum/node_modules/nodebb-theme-hypeeyes
RUN ln -s /app/hypeeyes-theme hypeeyes-forum/node_modules/nodebb-theme-hypeeyes
RUN cp hypeeyes-forum/config-build.json hypeeyes-forum/config.json && ./hypeeyes-forum/nodebb build
RUN cp hypeeyes-forum/config-production.json hypeeyes-forum/config.json
RUN rm -rf hypeeyes-forum/config-build.json && rm -rf hypeeyes-forum/config-production.json
EXPOSE 4567
CMD ./hypeeyes-forum/nodebb start
