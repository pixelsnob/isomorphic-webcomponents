
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

app.listen(port);
console.log('Listening on port ' + port);


