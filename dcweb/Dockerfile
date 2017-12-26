FROM node:latest

ENV NPM_CONFIG_LOGLEVEL warn
# ARG app_env
# ENV APP_ENV $app_env

# RUN mkdir -p /frontend
RUN mkdir -p /frontend

WORKDIR /frontend
COPY . /frontend

# RUN npm install --production --registry=https://registry.npm.taobao.org
RUN npm install --production

CMD npm install -g serve && \
	npm run build && \
	serve -s -p 5000 build

# CMD if [ ${APP_ENV} = production ]; \
# 	then \
# 	npm install -g http-server && \
# 	npm run build && \
# 	cd build && \
# 	hs -p 3000; \
# 	else \
# 	npm run start; \
# 	fi

EXPOSE 5000