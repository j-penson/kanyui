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
ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
COPY --from=react-build usr/src/app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]