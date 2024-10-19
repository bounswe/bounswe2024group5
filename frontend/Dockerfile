FROM node:21-alpine

RUN npm install -g pnpm

WORKDIR /frontend/

COPY pnpm-lock.yaml .
COPY package.json .

COPY public public
COPY src src

COPY index.html .
COPY tailwind.config.js .
COPY postcss.config.js .
COPY tsconfig.app.json .
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY vite.config.ts .
COPY eslint.config.js .

RUN pnpm install

CMD ["pnpm", "run", "dev", "--host"]