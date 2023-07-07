FROM node:20-alpine

ENV NODE_ENV production

WORKDIR /server

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]