# kanyUI

![CI-build](https://github.com/j-penson/kanyui/workflows/CI-build/badge.svg)

kanyUI is the front-end for [kanyAI](https://github.com/mxdillon/kanyai).

Project is live at https://www.kanyai.com/. \
Created by [mxdillon](https://github.com/mxdillon) & [j-penson
](https://github.com/j-penson). 

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


