![](https://panvala-example.surge.sh/shot.png)

### Prerequisites

- Node.JS 12+
- Git

### Getting started

- Clone project.
- `cd` into example, iframe and js in seperate tabs.
- In each of them:
  - Copy `.env.sample` to `.env`, filling out `INFURA_ID` with your own. The id is an Infura app project id which you can get one for free by signing up [here](https://infura.io).
  - Ran `yarn`
  - Ran `make` or `yarn start`
- Visit the example page at http://localhost:3400

### Demo

https://panvala-example.surge.sh

### Video demo

https://photos.app.goo.gl/GkEa6EnQrg2A7rDW9

### How it works

Todo.

### Deploying to production

- `cd` into example, iframe and js in seperate tabs.
- In each of them:

  - Copy `.env.production.sample` to `.env`, filling out `INFURA_ID` with your own. The id is an Infura app project id which you can get one for free by signing up [here](https://infura.io). Also, replace `JS_HOST` and `IFRAME_HOST` with the your domain name. For example, if your domain is `https://example.com`, you may want to set `JS_HOST` as `https://js.example.com/v1` and IFRAME_HOST as `https://iframe.example.com/v1`.
  - Ran `yarn`
  - Ran `make` or `yarn start`
  - Serve the generated `dist` e.g. via nginx

- An alternate deployment method is to use the provided convenience script, `./deploy.sh`, to accomplish the above in one run. This produces a single dist folder in the root of the project. You'd probably have to use different `JS_HOST` and `IFRAME_HOST` settings in this case.

Project is a submission to the [Panvala "Donate with PAN" Widget hackathon bounty](https://gitcoin.co/issue/Panvala/panvala/24/100024358).
