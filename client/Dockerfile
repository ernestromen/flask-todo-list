FROM node:18-alpine
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN mkdir /frontend
WORKDIR /frontend
COPY package.json /frontend/package.json
RUN npm install
