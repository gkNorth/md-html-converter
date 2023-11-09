FROM ghcr.io/puppeteer/puppeteer:21.5.0

RUN apk add --nocache udev ttf-freefont chromium git
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
CMD [ "nest", "index.js" ]