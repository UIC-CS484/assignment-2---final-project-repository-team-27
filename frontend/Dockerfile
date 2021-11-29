FROM node:14.18.1

LABEL version="1.0.0"
LABEL description="Docker image for frontend using react"
LABEL author="Lokesh Roopkumar"

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]