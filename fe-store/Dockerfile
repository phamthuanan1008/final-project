FROM node:23.11 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build



FROM node:23.11 

WORKDIR /app
COPY --from=build /app/dist ./build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3001"]