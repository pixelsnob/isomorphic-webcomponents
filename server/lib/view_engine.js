/**
 * DOM-based view engine
 * 
 * Creates a DOM window with client.js environment, allowing shared
 * scripts between client and server
 * 
 */
import jsdom from 'jsdom';
import path from 'path';
import fs from 'fs';

// These will appear as <script> tags
let client_scripts = [
  'dist/client.js'
];

// Provide client script to jsdom as raw (ES5) src
let src_scripts = client_scripts.map(script_path =>
  fs.readFileSync(path.resolve('public', script_path), 'utf8'));

export default (file_path, opts, cb) => {
  fs.readFile(file_path, 'utf8', (err, html) => {
    if (err) {
      return cb(err);
    }
    jsdom.env({
      html,
      src: src_scripts,
      virtualConsole: jsdom.createVirtualConsole().sendTo(console),
      done: (err, window) => {
        if (err) {
          return cb(err);
        }
        let { document } = window;
        // Attach client scripts
        let head_el = document.querySelector('head');
        client_scripts.map(script => {
          let script_el = document.createElement('script');
          script_el.src = script;
          head_el.appendChild(script_el);
        });
        cb(null, window.document.documentElement.outerHTML);
      }
    });
  });
};


