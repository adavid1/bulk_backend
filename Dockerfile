FROM node:carbon-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Building for production :
# RUN npm ci --only=production

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000

CMD [ "npm", "run", "start" ]

# ts-node -r tsconfig-paths/register src/main.ts
#    "start:dev": "tsc-watch -p tsconfig.build.json --onSuccess \"node dist/main.js\"",
