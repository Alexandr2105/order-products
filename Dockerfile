FROM node:20.9.0

USER node

RUN mkdir -p /home/node/dist/order_products

WORKDIR /home/node/dist/order_products

COPY --chown=node package*.json ./
COPY --chown=node yarn.lock ./

RUN yarn install --frozen-lockfile

ENV PORT=3000

COPY --chown=node . .

RUN yarn build

EXPOSE ${PORT}

CMD ["yarn","start"]