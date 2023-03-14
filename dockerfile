FROM node:16

WORKDIR /app

RUN npm install -g typescript
RUN npm install -g ts-node

COPY . /app

RUN npm install

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "start"]
