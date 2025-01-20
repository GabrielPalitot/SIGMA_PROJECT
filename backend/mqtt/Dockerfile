FROM node:20-bullseye

WORKDIR /mqtt

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn

CMD ["yarn", "tsnd", "client.ts"]