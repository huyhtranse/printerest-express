FROM node:16

WORKDIR /usr/src/app

COPY package*.json .

RUN npm command

COPY source dest

EXPOSE 8080