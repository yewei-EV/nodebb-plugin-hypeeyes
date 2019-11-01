FROM node:lts

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# hypeeyes plugin
COPY nodebb-plugin-hypeeyes nodebb-plugin-hypeeyes
RUN cd nodebb-plugin-hypeeyes && npm install && npm run build && npm cache clean --force 

# theme
COPY nodebb-theme-hypeeyes nodebb-theme-hypeeyes

# forum install
#   forum copy
COPY hypeeyes-forum/install/package.json hypeeyes-forum/package.json
COPY hypeeyes-forum/install/config.json hypeeyes-forum/config.json
COPY hypeeyes-forum hypeeyes-forum
#   forum node_module install
RUN cd hypeeyes-forum && npm install --only=prod
RUN ln -s /usr/src/app/nodebb-plugin-hypeeyes hypeeyes-forum/node_modules && ln -s /usr/src/app/nodebb-theme-hypeeyes hypeeyes-forum/node_modules
#   forum build
ENV NODE_ENV=production \
    daemon=false \
    silent=false

RUN cd hypeeyes-forum && ./nodebb build && npm cache clean --force
# RUN rm -rf hypeeyes-forum/node_module/nodebb-plugin-hypeeyes && rm -rf hypeeyes-forum/node_module/nodebb-theme-hypeeyes
# RUN ln -s nodebb-plugin-hypeeyes hypeeyes-forum/node_module && ln -s nodebb-theme-hypeeyes hypeeyes-forum/node_module

# hypeeyes web
COPY hypeeyes-web hypeeyes-web

EXPOSE 4567

CMD ./hypeeyes-forum/nodebb start
