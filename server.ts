import { join } from 'path';
import * as express from 'express';


const app = express();
const router = express.Router();
const APP_PORT = process.env.APP_PORT || 8080;
const prerender = require('prerender');
let server;

if (!isDevMode()) {
  server = prerender({
  chromeFlags: [ '--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222', '--hide-scrollbars', '--disable-dev-shm-usage' ],
  forwardHeaders: true,
  chromeLocation: '/usr/bin/chromium-browser'
});
} else {
  server = prerender();
}



const DIST_FOLDER = join(process.cwd(), './dist/angular-prerender');
const PRERENDER_HOST = process.env.PRERENDER_HOST || 'localhost:8080';

async function bootstrap() {
  server.start();
  app.use(require('prerender-node')
    .set('prerenderServiceUrl', 'http://localhost:3000/')
    .set('host', PRERENDER_HOST));
  app.use(express.static(DIST_FOLDER));
  app.get('*', ( req, res) => {
      res.sendFile(DIST_FOLDER + '/index.html');
  });
  app.use('/angular-prerender', router);
  app.listen(APP_PORT, () => {
    console.log(`Node Express server listening on http://localhost:${APP_PORT}/angular-prerender`);
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

