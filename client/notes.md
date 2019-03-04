## testing components

see: https://bit.ly/2TEPXkh

#### things to omit:

- third party libraries
- constants
- inline styles
- things unrelated to the tested component

#### things to test:

- snapshots
- component logic

---

update snapshot

    yarn test -u

---

#### How to get to 90% component test coverage

(1) One component should have only one snapshot. unless you need to test the behavior of a component in 2 states.
first test stores default state in snapshot, second test simulates event and checks the presense of a particular class.

(2) Props. first, check the render of default prop values. expect value to equal defaultProps.
second, check the custom value of the prop. Set your own value and expect it to be received after rendering.

(3) Events. after creating a snapshot and covering props, you can be sure the component renders correctly.

- mock event => simulate it => expect event was called
- mock event => simulate event w/ params => expect event was called w/ passed params
- pass necessary props => render component => simulate event => expect certain behavior on called event

(4) Conditions. for output of a particular class, rendering a certain section of the code, transferring required props, etc.
with default values, only one branch will pass test while 2nd remains untested

(5) State. 2 tests:

- first, check the current state
- second, check the state after calling an event
  render component => call function directly in test => check how state has changed
  to call the function of the component, you need to get an instance of the component and only then call its methods

#### routing

`as` on `<Link>` decorates the URL differently from the URL it fetches

[custom server/routing](https://github.com/zeit/next.js/#custom-server-and-routing)

For the initial page load, `getInitialProps` will execute on the server only. `getInitialProps` will only be executed on the client when navigating to a different route via the `Link` component or using the routing APIs.

`getInitialProps` can **not** be used in children components. Only in `/pages`.

[fetching data/component lifecycle](https://github.com/zeit/next.js/#fetching-data-and-component-lifecycle)

This example makes `/a` resolve to `./pages/b`, and `/b` resolve to `./pages/a`:

```js
// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/a') {
      app.render(req, res, '/b', query);
    } else if (pathname === '/b') {
      app.render(req, res, '/a', query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
```

The `next` API is as follows:

- `next(opts: object)`

Supported options:

- `dev` (`bool`) whether to launch Next.js in dev mode - default `false`
- `dir` (`string`) where the Next project is located - default `'.'`
- `quiet` (`bool`) Hide error messages containing server information - default `false`
- `conf` (`object`) the same object you would use in `next.config.js` - default `{}`

Then, change your `start` script to `NODE_ENV=production node server.js`.

#### Disabling file-system routing

By default, `Next` will serve each file in `/pages` under a pathname matching the filename (eg, `/pages/some-file.js` is served at `site.com/some-file`.

If your project uses custom routing, this behavior may result in the same content being served from multiple paths, which can present problems with SEO and UX.

To disable this behavior & prevent routing based on files in `/pages`, simply set the following option in your `next.config.js`:

```js
// next.config.js
module.exports = {
  useFileSystemPublicRoutes: false,
};
```

Note that `useFileSystemPublicRoutes` simply disables filename routes from SSR; client-side routing
may still access those paths. If using this option, you should guard against navigation to routes
you do not want programmatically.

You may also wish to configure the client-side Router to disallow client-side redirects to filename
routes; please refer to [Intercepting `popstate`](#intercepting-popstate).

#### `testPathIgnorePatterns`

An array of regexp pattern strings that are matched against all test paths before executing the test. If the test path matches any of the patterns, it will be skipped.

#### `transformIgnorePatterns`

Sometimes it happens (especially in React Native or TypeScript projects) that 3rd party modules are published as untranspiled. Since all files inside node_modules are not transformed by default, Jest will not understand the code in these modules, resulting in syntax errors. To overcome this, you may use transformIgnorePatterns to whitelist such modules.
