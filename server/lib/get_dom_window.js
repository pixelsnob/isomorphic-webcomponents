/**
 * Returns a Promise with access to a jsdom window object, with
 * optional html and js src
 * 
 */
import jsdom from 'jsdom';

export default (html, src) => {
  let promised_window = new Promise((resolve, reject) => {
    jsdom.env({
      html,
      src,
      virtualConsole: jsdom.createVirtualConsole().sendTo(console),
      done: (err, window) => {
        if (err) {
          reject(err);
        }
        // Add client scripts that will point to these on the client
        let client_js = window.document.createElement('script');
        client_js.src = '/dist/client.js';
        // Pass any window errors up to virtual console
        window.addEventListener('error', (err) => { // <<-- does this actually work?
          console.log(err);
        });
        resolve(window);
      }
    });
  });
  return promised_window;
};

