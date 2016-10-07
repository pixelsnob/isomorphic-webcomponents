
import jsdom from 'jsdom';
import path from 'path';
import fs from 'fs';

// These will appear as <script> tags
let client_scripts = [
  'dist/client.js'
];

// Provide compiled client script to jsdom
let src_scripts = client_scripts.map(script_path =>
  fs.readFileSync(path.resolve('public', script_path), 'utf8'));

// Calls cb() with a window object or error
export function getWindow(url, cb) {
  jsdom.env({
    html: '',
    src: src_scripts,
    virtualConsole: jsdom.createVirtualConsole().sendTo(console),
    created: function(err, window) {
      if (err) {
        return cb(err);
      }
      window.is_server = true;
      if (url !== null) {
        jsdom.changeURL(window, url);
      }
    },
    done: function(err, window) {
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
      cb(null, window);
    }
  });
}


