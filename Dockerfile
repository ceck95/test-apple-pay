
FROM node:12.18.4-alpine3.11

RUN npm -g yarn

WORKDIR /app
COPY . .
RUN yarn install

CMD ["npm","start"]