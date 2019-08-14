FROM registry.access.redhat.com/ubi8/nodejs-10

RUN mkdir app
RUN echo $PWD

# Install npm production packages
COPY package.json ./app
COPY . ./app
RUN cd ./app; npm install --production

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

WORKDIR ./app

CMD ["npm", "start"]



