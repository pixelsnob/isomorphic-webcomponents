/**
 * DOM-based view engine
 * 
 */
import path from 'path';
import fs from 'fs';
import jsdom from 'jsdom';
  
let jsdom_src = [
  'public/dist/client.js'
].map(script => fs.readFileSync(path.resolve(script), 'utf8'));

let promised_window = new Promise((resolve, reject) => {
  jsdom.env({
    html: '',
    src: jsdom_src,
    virtualConsole: jsdom.createVirtualConsole().sendTo(console),
    done: (err, window) => {
      if (err) {
        reject(err);
      }
      // Add client scripts
      let client_js = window.document.createElement('script');
      client_js.src = '/dist/client.js';
      window.document.querySelector('head').appendChild(client_js);
      // Pass any window errors up to virtual console
      window.addEventListener('error', (err) => {
        console.log(err);
      });
      resolve(window);
    }
  });
});

export default (file_path, opts, cb) => {
  promised_window.then(window => {
    let { document } = window;
    document.body.innerHTML = '<p>Custom tag: <test-tag test="222">custom</test-tag></p>';
    cb(null, window.document.documentElement.outerHTML);
  }).catch(cb);
};


