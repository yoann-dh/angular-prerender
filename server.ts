import { join } from 'path';
import * as express from 'express';

const app = express();
const router = express.Router();
const prerender = require('prerender');
const config = require('./config.json');
let server;
/**
 * Set APP PORT
 */
const APP_PORT = process.env.APP_PORT || 8080;
/**
 * Set TRUE OR FALSE IF YOU USE BASE_HREF BUILD
 */
const IS_BASE_HREF_BUILD = process.env.IS_BASE_HREF_BUILD || true;
/**
 * FOLDER CONFIG
 */
const DIST_FOLDER = join(process.cwd(), './dist/');
const PRERENDER_HOST = process.env.PRERENDER_HOST || 'localhost:8080';
/**
 * SET YOUR BASE_HREF BUILD IF YOU ENABLED BASE_URL ELSE SET THE DIST FOLDER BUILD
 * yarn build --prod --base-href /buildName/ --outputPath dist/buildName
 */
const ANGULAR_BUILD_NAME = process.env.ANGULAR_BUILD_NAME || config.name;

if (!isDevMode()) {
  server = prerender({
  chromeFlags: [ '--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222', '--hide-scrollbars', '--disable-dev-shm-usage' ],
  forwardHeaders: true,
  chromeLocation: '/usr/bin/chromium-browser'
});
} else {
  server = prerender();
}

async function bootstrap() {
  IS_BASE_HREF_BUILD ? app.use(express.static(DIST_FOLDER)) : app.use(express.static(DIST_FOLDER + ANGULAR_BUILD_NAME));
  server.start();
  app.use(require('prerender-node')
    .set('prerenderServiceUrl', 'http://localhost:3000/')
    .set('host', PRERENDER_HOST));

  router.get('/*', ( req, res) => {
    res.sendFile(DIST_FOLDER + `${ANGULAR_BUILD_NAME}/index.html`);
  });

  app.use(`/${IS_BASE_HREF_BUILD ? ANGULAR_BUILD_NAME : ''}`, router);

  app.listen(APP_PORT, () => {
    console.log(`Node Express server listening on http://localhost:${APP_PORT}/${ANGULAR_BUILD_NAME}`);
  });
}

function isDevMode() {
  return process.env.NODE_ENV === 'dev';
}
(async () => {
  try {
    await bootstrap();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

