FROM node:12 as build-stage

WORKDIR /usr/src/app
COPY ./package.json .
RUN yarn
COPY . .

RUN yarn build

FROM nginx:stable-alpine

COPY --from=build-stage /usr/src/app/build /app

COPY default.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]