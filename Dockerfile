FROM node:8.9-alpine as angular-built
RUN npm i -g @angular/cli@1.5.0
ADD . /usr/src/app
WORKDIR /usr/src/app
RUN npm i
RUN npm rebuild node-sass --force
RUN ng build --prod

FROM nginx:alpine
COPY --from=angular-built /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 4200
CMD [ "nginx", "-g", "daemon off;" ]
