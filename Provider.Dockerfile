FROM node:8
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY /dataPresenter /usr/src/app/dataPresenter
COPY /src /usr/src/app/src

RUN npm install
RUN npm run build



