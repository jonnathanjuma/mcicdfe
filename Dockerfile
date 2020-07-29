# Stage 1
FROM node:12.15-alpine as node

WORKDIR /usr/src/mcicdfe

COPY package*.json ./

RUN npm install

COPY . .

# Stage 2
FROM nginx:1.13.12-alpine

COPY --from=node /usr/src/mcicdfe /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf