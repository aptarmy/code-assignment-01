FROM node:16
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install

# Fix: Eslint permission error
RUN mkdir -p /app/node_modules/.cache && chmod -R 777 /app/node_modules/.cache

EXPOSE 3000
CMD ["npm", "run", "start"]