FROM node:14-slim

WORKDIR /api
COPY . .

RUN npm i

EXPOSE 3000

CMD node index.js