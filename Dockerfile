
FROM node:14.21.2-alpine
WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install
COPY . .
RUN yarn build

CMD ["npm","start"]