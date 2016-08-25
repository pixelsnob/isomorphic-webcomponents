/**
 * DOM-based view engine
 * 
 * Creates a DOM window with client.js environment, allowing shared
 * scripts between client and server
 * 
 */
import path from 'path';
import fs from 'fs';
import getDomWindow from 'lib/get_dom_window';

let jsdom_src = [
  'public/dist/client.js'
].map(script => fs.readFileSync(path.resolve(script), 'utf8'));

export default (file_path, opts, cb) => {
  fs.readFile(file_path, 'utf8', (err, html) => {
    if (err) {
      return cb(err);
    }
    getDomWindow(html, jsdom_src).then(window => {
      cb(null, window.document.documentElement.outerHTML);
    }).catch(cb);
  });
};

