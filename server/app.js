/* eslint no-console: 0 */

import { install } from 'source-map-support';
install();

import config from '../config';
import { getWindow } from './lib/server_dom';
import express from 'express';
import pug from 'pug';

const port = config.port || 3004,
  app = express(),
  env = process.env.NODE_ENV || 'development',
  base_url = 'https://staging.pixelsnob.com';

app.engine('pug', pug.__express);
app.set('view engine', 'pug');
app.set('view cache', (env == 'production'));

if (env == 'development') {
  app.use(express.static('public'));
}

app.get('/*', (req, res, next) => {
  let url = base_url + req.url;
  getWindow(url, [ 'dist/client.js' ], (err, window) => {
    if (err) {
      return next(err);
    }
    res.send(window.document.documentElement.outerHTML);
  });
});

app.use((req, res, next) => {
  res.status(404).send('404');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.format({
    html: () => {
      res.render('error', { error: err.message });
    },
    json: () => {
      res.status(500);
      res.json({ ok: 0 });
    }
  });
});

app.listen(port);
console.log('Listening on port ' + port);


