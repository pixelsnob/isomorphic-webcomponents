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

// These will appear as <script> tags
let client_scripts = [
  'dist/client.js'
];

// These will be evaluated when the window is created -- not visible
// to client
let src_scripts = client_scripts.map(script_path =>
  fs.readFileSync(path.resolve('public', script_path), 'utf8'));

// Turn off client scripts for debugging
//client_scripts = [];

export default (file_path, opts, cb) => {
  fs.readFile(file_path, 'utf8', (err, html) => {
    if (err) {
      return cb(err);
    }
    getDomWindow(html, src_scripts, client_scripts).then(window => {
      window.addEventListener('WebComponentsReady', function(ev) {
        cb(null, window.document.documentElement.outerHTML);
      });
    }).catch(cb);
  });
};


