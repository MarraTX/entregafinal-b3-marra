FROM node:22.9.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src

EXPOSE 8080

CMD ["npm", "run", "start"]

#docker build -t dashcamed/entregafinalb3:1.0.0-lts .
#docker push dashcamed/entregafinalb3:1.0.0-lts
#docker pull dashcamed/entregafinalb3:1.0.0-lts