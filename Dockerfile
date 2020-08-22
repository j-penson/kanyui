# Stage: 1
FROM node:9-slim as react-build
RUN mkdir usr/src/app
WORKDIR usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install --silent
COPY . ./
RUN npm run build

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
ENV PORT 8080
ENV HOST 0.0.0.0
RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"
COPY --from=react-build usr/src/app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]