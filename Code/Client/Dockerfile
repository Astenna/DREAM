# build environment
FROM node:14.17.0 as build
ENV NODE_ENV production
USER root
WORKDIR /Client
COPY package.json /Client/
COPY package-lock.json /Client/
RUN npm install
COPY . /Client/
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /Client/build /usr/share/nginx/html
COPY --from=build /Client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]