import { join } from 'path';
import * as express from 'express';
import * as prerender from 'prerender';

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 8080;
const preRenderServer = prerender();


const DIST_FOLDER = join(process.cwd(), './dist/angular-prerender');

async function bootstrap() {
  if (isDevMode()) {
    preRenderServer.start();
  }
  app.use(require('prerender-node'));
  app.use(express.static(DIST_FOLDER));
  router.get('/*', ( req, res) => {
      res.sendFile(DIST_FOLDER + `/index.html`);
  });
  app.use('/angular-prerender', router);
  app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}/angular-prerender`);
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

