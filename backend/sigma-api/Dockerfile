FROM node:20-bullseye

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn

EXPOSE 8500

CMD ["yarn", "start"]

