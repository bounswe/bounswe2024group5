FROM node:21-alpine

WORKDIR /frontend/

COPY public public
COPY src src
COPY package.json .
COPY tailwind.config.js .

RUN npm install

CMD ["npm", "start"]