FROM node:22.9.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src

EXPOSE 8080

CMD ["npm", "run", "prod"]

#docker build -t marratx/entregafinalb3:1.0.0-lts .
#docker push marratx/entregafinalb3:1.0.0-lts
#docker pull marratx/entregafinalb3:1.0.0-lts