FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY server/package*.json ./

RUN npm install --production
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./server/ .
ENV PORT 8080
ENV NODE_ENV production
EXPOSE 8080
CMD [ "node", "./bin/www" ]
