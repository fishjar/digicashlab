FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install --registry=https://registry.npm.taobao.org

EXPOSE 7001

# CMD ["npm", "start"]
# CMD npm run docker