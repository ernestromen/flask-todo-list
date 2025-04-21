FROM node:10.15.2-alpine
RUN mkdir /frontend
WORKDIR /frontend
COPY package.json /frontend/package.json
RUN npm install bootstrap axios react-router-dom \
  @fortawesome/fontawesome-svg-core \
  @fortawesome/react-fontawesome \
  @fortawesome/free-solid-svg-icons