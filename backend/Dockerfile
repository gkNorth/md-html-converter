# ステージ1: ビルド環境を構築
FROM node:18.18.0-alpine AS build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# ステージ2: 実行環境を構築
FROM node:18.18.0-alpine
WORKDIR /usr/src/app

# Puppeteerの依存関係をインストール
RUN apk update \
    && apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

# Puppeteer用の環境変数を設定
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# ビルドステージから必要なファイルをコピー
COPY --from=build /usr/src/app/dist ./dist
COPY package.json yarn.lock ./

# 本番用のnode_modulesをインストール
RUN yarn install --production --frozen-lockfile

RUN which chromium-browser || true

EXPOSE 3000
CMD ["node", "dist/main"]