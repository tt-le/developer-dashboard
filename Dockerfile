FROM registry.access.redhat.com/ubi8/nodejs-10

RUN mkdir app

WORKDIR app

COPY package.json .
COPY package-lock.json .
COPY .env .
COPY default.conf .
COPY src/ ./src/
COPY public/ ./public/
COPY server/ ./server/

RUN npm install

RUN npm run build

CMD ["npm", "start"]
