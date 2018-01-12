FROM node:8.9-alpine as angular-built

# Gyp dependencies
RUN apk add --no-cache make gcc g++ python2 && \
  npm install --production --silent && \
  apk del make gcc g++ python2
RUN ln -s /usr/bin/python2.7 /usr/bin/python

# Angular
RUN npm i -g @angular/cli@1.6.3
ADD . /usr/src/app
WORKDIR /usr/src/app
RUN npm i
RUN npm rebuild node-sass --force
RUN ng build

# Nginx
FROM nginx:alpine
COPY --from=angular-built /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 4200
CMD [ "nginx", "-g", "daemon off;" ]
