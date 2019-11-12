FROM node:alpine
ENV NODE_ENV=production daemon=false silent=false
WORKDIR /app
COPY --from=hypeeyes/core /app .
COPY --from=hypeeyes/web /app/hypeeyes-web/dist hypeeyes-web/dist
EXPOSE 4567
CMD ./hypeeyes-forum/nodebb start
