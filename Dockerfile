FROM node:16-alpine

WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "dist/main"]
EXPOSE 3000