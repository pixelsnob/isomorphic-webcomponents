
import jsdom from 'jsdom';
import path from 'path';
import fs from 'fs';

let getSrcFromScript = script_path =>
  fs.readFileSync(path.resolve('public', script_path), 'utf8');

// Calls cb() with a window object or error
export function getWindow(url, script_paths = [], cb) {
  jsdom.env({
    html: '',
    // Adds compiled JS source into jsdom environment
    // The same script(s) will be attached as script tags below, for the client
    src: script_paths.map(getSrcFromScript),
    virtualConsole: jsdom.createVirtualConsole().sendTo(console),
    created: (err, window) => {
      if (err) {
        return cb(err);
      }
      window.is_server = true;
      if (url !== null) {
        jsdom.changeURL(window, url);
      }
    },
    done: (err, window) => {
      if (err) {
        return cb(err);
      }
      let { document } = window;
      // Attach client scripts to rendered html
      let head_el = document.querySelector('head');
      script_paths.map(script => {
        let script_el = document.createElement('script');
        script_el.src = script;
        head_el.appendChild(script_el);
      });
      cb(null, window);
    }
  });
}


