FROM ghcr.io/puppeteer/puppeteer:21.5.0

RUN apk add --nocache udev ttf-freefont chromium git
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
CMD [ "nest", "index.js" ]