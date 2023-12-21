FROM node:alpine

WORKDIR /srv

COPY /back/package.json .
COPY back ./back
COPY front ./front

RUN npm install

CMD ["node", "./back/server.js"]
