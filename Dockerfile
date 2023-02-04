
FROM node:14.21.2-alpine3.16

WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install
RUN yarn build

CMD ["npm","start"]