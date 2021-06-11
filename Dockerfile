FROM node:12.18.4

WORKDIR /moreLikeThis

COPY package*.json ./

RUN npm install

COPY . .

# EXPOSE 4022
RUN npm run webpack

CMD ["npm", "start"]

# docker run -p 4022:4022 -d --numberhere--