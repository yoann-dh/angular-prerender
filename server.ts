import { join } from 'path';
import * as express from 'express';

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 8080;


const DIST_FOLDER = join(process.cwd(), './dist/angular-prerender');
const HOST = process.env.HOST || 'localhost:8080';

async function bootstrap() {
  app.use(require('prerender-node')
    .set('prerenderServiceUrl', 'http://localhost:3000/')
    .set('host', HOST));
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

