# plaintext

turn any website to plaintext

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
  http://localhost:5000/job

# get job progress
curl http://localhost:5000/job/[uuid]/poll

# get job results
curl http://localhost:5000/job/[uuid]
```

## UI
  - Dummy UI: http://localhost:5000/
  - Bull Dashboard: http://localhost:5000/job/queues/
