# Base image
FROM node:20-alpine


WORKDIR /app


COPY package.json package-lock.json ./

RUN npm ci


COPY . .


RUN npm install -g nodemon


EXPOSE 8080

CMD ["npm", "run", "start:dev"]
