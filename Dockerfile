FROM node:12.18.4

WORKDIR /calvin-more-like-this-service

COPY package*.json ./

RUN npm install

COPY . .

# EXPOSE 4022
RUN npm run webpack

CMD ["npm", "run", "newrelic"]

# docker run -p 4022:4022 -d --numberhere--