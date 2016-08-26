/**
 * Returns a promise which, when resolved, returns full html document
 * with optional html content, js src, and script tags
 * 
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
        let head_el = document.querySelector('head');
        client_scripts.map(script => {
          let script_el = document.createElement('script');
          script_el.src = script;
          head_el.appendChild(script_el);
        });
        resolve(window.document.documentElement.outerHTML);
      }
    });
  });
};

