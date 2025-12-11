FROM node:23.11 as build

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build



FROM node:23.11 

WORKDIR /app
COPY --from=build /app/build ./build
RUN npm install -g serve
EXPOSE 3000
CMD serve -s build