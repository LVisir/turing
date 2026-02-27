FROM node:20-alpine

WORKDIR /app

ENV NG_CLI_ANALYTICS=false

RUN npm install -g @angular/cli@18

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]