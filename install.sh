#!/bin/bash

npm i npm-install-all
npm-install-all server.js 
npm-install-all mongo_conn_native.js
npm-install-all logger.js
npm i --save-dev nodemon
npm i --save-dev eslint
npm i --save-dev husky
npx husky install
npm pkg set scripts.prepare "husky install"
npm run docker
