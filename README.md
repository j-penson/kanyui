

KanyUI is the UI for https://github.com/mxdillon/kanyai

### Run locally

```
npm install
npm start
```

### Docker

1. Build using the `node:9-slim` base image and `npm run build`
2. Serve using nginx
```
# Build
docker built -t kanyui .

# Run and serve on localhost:8080
docker run -p 8080:80 kanyui
```


