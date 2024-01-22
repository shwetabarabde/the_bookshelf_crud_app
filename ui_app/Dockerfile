FROM node:20.11.0
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli@10.2.4

COPY . /usr/src/app

EXPOSE 4200
CMD ["npm", "start"]