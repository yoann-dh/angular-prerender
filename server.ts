import { join } from 'path';
import * as express from 'express';
require('dotenv').config();
const axios = require('axios');


const app = express();
const router = express.Router();
const prerender = require('prerender');
let server;
/**
 * Set APP ENV CONFIG
 */
const APP_PORT = process.env.APP_PORT;
const IS_BASE_HREF_BUILD = !!process.env.ANGULAR_BUILD_NAME;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const API_KEY = process.env.API_KEY;
/**
 * FOLDER CONFIG
 */
const DIST_FOLDER = join(process.cwd(), './dist/');
const PRERENDER_HOST = process.env.PRERENDER_HOST;
/**
 * SET YOUR BASE_HREF BUILD IF YOU ENABLED BASE_URL ELSE SET THE DIST FOLDER BUILD
 * yarn build --prod --base-href /buildName/ --outputPath dist/buildName
 */
const ANGULAR_BUILD_NAME = process.env.ANGULAR_BUILD_NAME;

if (IS_PRODUCTION) {
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

  router.get('/api/moviedb/popular-movies', (req, res) => {
    findPopularMovies().then(
      (response) => res.send(response.data.results));
  });
  router.get('/api/moviedb/:id', (req, res) => {
    findOneMovie(+req.params.id).then((response) => res.send(response.data));
  });
  router.get('/*', ( req, res) => {
    res.sendFile(DIST_FOLDER + `${ANGULAR_BUILD_NAME}/index.html`);
  });

  app.use(`/${IS_BASE_HREF_BUILD ? ANGULAR_BUILD_NAME : ''}`, router);

  app.listen(APP_PORT, () => {
    console.log(`Node Express server listening on http://localhost:${APP_PORT}/${ANGULAR_BUILD_NAME}`);
  });
}
(async () => {
  try {
    await bootstrap();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

/**
 * Axios async req to movie db
 */
const findPopularMovies = async () => {
  try {
    return await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`);
  } catch (error) {
    console.error(error);
  }
};
const findOneMovie = async (id: number) => {
  try {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr-FR`);
  } catch (error) {
    console.error(error);
  }
};
