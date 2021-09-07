FROM node:14.0 AS compile-image
WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install

RUN npm run build
FROM socialengine/nginx-spa:latest

COPY ./build /app
RUN chmod -R 777 /app
EXPOSE 80
