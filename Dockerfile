FROM node:14.0 AS compile-image
WORKDIR /app
COPY . .
RUN yarn install

RUN yarn build
FROM socialengine/nginx-spa:latest

COPY --from=compile-image /app/build /app
RUN chmod -R 777 /app
EXPOSE 80
