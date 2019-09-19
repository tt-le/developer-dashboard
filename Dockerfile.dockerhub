FROM registry.access.redhat.com/ubi8/nodejs-10
RUN whoami
RUN echo ${HOME}
RUN pwd

ENV NPM_CONFIG_PREFIX=${HOME}/.npm-global
ENV PATH=$PATH:${HOME}/.npm-global/bin

RUN mkdir -p ${HOME}/app/client && \
    mkdir -p ${HOME}/app/server && \
    mkdir -p ${HOME}/app/public

# Install npm packages
COPY ./package.json ${HOME}/app
COPY ./client ${HOME}/app/client
COPY ./server ${HOME}/app/server
COPY ./public ${HOME}/app/public
RUN cd ${HOME}/app; npm install && npm run build

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000/tcp

WORKDIR ${HOME}/app

CMD ["npm", "start"]



