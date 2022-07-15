FROM node:alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
COPY . /usr/src/app
RUN npm ci
CMD [ "npm","run","local"]