FROM node:14.18.1

LABEL version="1.0.0"
LABEL description="Docker image for backend using node, express, sqlite"
LABEL author="Lokesh Roopkumar"

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3005

CMD ["npm", "start"]