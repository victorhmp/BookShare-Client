FROM node:9.5-alpine

ENV INSTALL_PATH /usr/src/app

RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY package.json yarn.lock ./

# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# ENV PATH /usr/src/app/node_modules/.bin:$PATH

# COPY package.json /usr/src/app/package.json

RUN yarn install
RUN yarn add react-scripts -g

CMD ["yarn", "start"]
