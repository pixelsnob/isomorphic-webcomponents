
import { install } from 'source-map-support';
install();

import config from '../config';
import path from 'path';
import fs from 'fs';
import express from 'express';
import view_engine from './lib/view_engine';

const port = config.port || 3004,
      app  = express(),
      env  = process.env.NODE_ENV || 'development';

app.engine('html', view_engine);
app.set('view engine', 'html');
app.set('view cache', (env == 'production'));

if (env == 'development') {
  app.use(express.static('public'));
}

app.route('/test').get((req, res, next) => {
  res.render('test');
});

app.use((req, res, next) => {
  res.status(404).send('404');//.render('not_found');
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


