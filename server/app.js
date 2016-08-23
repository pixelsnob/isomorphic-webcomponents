
import { install } from 'source-map-support';
install();

import config from '../config';
import path from 'path';
import fs from 'fs';
import express from 'express';
import jsdom from 'jsdom';
import getWindow from 'lib/server_dom';

const port = config.port || 3004,
      app  = express(),
      env  = process.env.NODE_ENV || 'development';

app.set('view engine', 'pug');
app.set('view cache', (env == 'production'));

if (env == 'development') {
  app.use(express.static('public'));
}

const promised_window = getWindow();

app.route('/*').get((req, res, next) => {
  promised_window.then(window => {
    let oh = window.document.querySelector('em');
    if (oh) {
      oh.style = 'border: 1px solid red;';
    }
    window.document.body.innerHTML = '<p>Custom tag: <test-tag test="222">custom</test-tag></p>';
    res.send(window.document.documentElement.outerHTML);
  }).catch(next);
});

app.listen(port);
console.log('Listening on port ' + port);


