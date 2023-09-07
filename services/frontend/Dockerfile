FROM node:lts-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install @vue/cli@5.0.8 -g

COPY package.json .
COPY package-lock.json .
RUN npm install && npm install jquery && npm install vue-yandex-maps@next


CMD ["npm", "run", "serve"]
