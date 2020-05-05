FROM node:12.16.1-alpine3.10

COPY package.json yarn.lock ./

RUN yarn --silent &&\
  mkdir /ng-app &&\
  cp -R ./node_modules ./ng-app &&\
  cp package.json yarn.lock ./ng-app

WORKDIR /ng-app

COPY . .

ENV PORT 80
EXPOSE 80

RUN yarn build:prod

CMD ["yarn", "start"]
