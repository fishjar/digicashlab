FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

# RUN npm install --production --registry=https://registry.npm.taobao.org
RUN npm install --production

EXPOSE 7001

# CMD ["npm", "start"]
# CMD npm run docker