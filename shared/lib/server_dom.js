
import path from 'path';
import fs from 'fs';
import jsdom from 'jsdom';
  
let jsdom_src = [
  'public/dist/client.js'
].map(script => fs.readFileSync(path.resolve(script), 'utf8'));

export default () => new Promise((resolve, reject) => {
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
      window.addEventListener('error', (err) => {
        console.log(err);
      });
      resolve(window);
    }
  });
});


