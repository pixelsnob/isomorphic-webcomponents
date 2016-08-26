/**
 * Returns a Promise with access to a jsdom window object, with
 * optional html, JS src that has immedate access to the window object,
 * and client script tags
 * 
 */
import jsdom from 'jsdom';

export default (html = '', src_scripts = [], client_scripts = []) => {
  return new Promise((resolve, reject) => {
    jsdom.env({
      html,
      src: src_scripts,
      // Pass window's console() up 
      virtualConsole: jsdom.createVirtualConsole().sendTo(console),
      done: (err, window) => {
        if (err) {
          reject(new Error(err));
        }
        let { document } = window;
        // Attach client scripts
        let $head = document.querySelector('head');
        client_scripts.map(script => {
          let $script = document.createElement('script');
          $script.src = script;
          $head.appendChild($script);
        });
        resolve(window.document.documentElement.outerHTML);
      }
    });
  });
};

