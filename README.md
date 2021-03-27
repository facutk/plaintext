# plaintext

https://plaintext.facu.tk/

Turn any website to plaintext

![Demo](https://raw.githubusercontent.com/facutk/plaintext/main/demo.gif)

## Install
```
git clone git@github.com:facutk/bull_demo.git
cd bull_demo
npm i
npm run dev
```

## Usage
```
# queue url
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com/facutk/plaintext/blob/main/README.md"}' \
  https://plaintext.facu.tk/job

# get job progress
curl https://plaintext.facu.tk/job/[uuid]/poll

# get job results
curl https://plaintext.facu.tk/job/[uuid]
```

## UI
  - Dummy UI: http://localhost:5000/
  - Bull Dashboard: http://localhost:5000/job/queues/

### Heroku Dependencies
  - Redis Addon
  - Buildpacks:
    - heroku/nodejs
    - https://github.com/jontewks/puppeteer-heroku-buildpack.git
