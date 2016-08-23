
import { install } from 'source-map-support';
install();

import config from '../config';
import path from 'path';
import fs from 'fs';
import express from 'express';
import jsdom from 'jsdom';

const port = config.port || 3004,
      app  = express(),
      env  = process.env.NODE_ENV || 'development';

app.set('view engine', 'pug');
app.set('view cache', (env == 'production'));

let jsdom_src = [
  'node_modules/webcomponents.js/webcomponents-lite.js',
  'shared/components.js' // <<< make this point to another webpack file?
].map(script => fs.readFileSync(path.resolve(script), 'utf8'));

let base_window;

jsdom.env({
  html: '<test-tag test="222">custom</test-tag>',
  src: jsdom_src,
  virtualConsole: jsdom.createVirtualConsole().sendTo(console),
  done: (err, window) => {
    if (err) {
      console.error('Error: jsdom startup', err);
      process.exit(1);
    }
    let { document, location } = window;
    document.registerElement('test-tag', window.TestTag);
    base_window = window;
    console.log(window.TestTag);
  }
});

app.route('/test').get((req, res, next) => {
  let oh = base_window.document.querySelector('em');
  oh.style = 'border: 1px solid red;';
  res.send(base_window.document.documentElement.outerHTML);
});

app.listen(port);
console.log('Listening on port ' + port);


