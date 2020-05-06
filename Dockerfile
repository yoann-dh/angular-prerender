FROM node:12-alpine
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/

RUN apk add --update-cache chromium \
 && rm -rf /var/cache/apk/* /tmp/*

COPY package.json yarn.lock ./

RUN yarn --silent &&\
  mkdir /ng-app &&\
  cp -R ./node_modules ./ng-app &&\
  cp package.json yarn.lock ./ng-app

WORKDIR /ng-app

COPY . .

ENV APP_PORT 80
ENV PRERENDER_HOST localhost
ENV ANGULAR_BUILD_NAME angular-prerender
EXPOSE 80

RUN yarn build:prod:base

CMD ["yarn", "start"]
