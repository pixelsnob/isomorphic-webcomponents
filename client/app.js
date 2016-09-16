
import MutationObserver from 'webcomponents.js/src/MutationObserver/MutationObserver';
import custom_elements from '@webcomponents/custom-elements/src/custom-elements';

import TestTag from 'components/test_tag';
import Router from 'navigo';

let router = window.router = new Router;
let document = window.document;

window.customElements.define('test-tag', TestTag);

console.log(shady_dom);

let render = (tag_name) => {
  if (window.is_server) {
    document.querySelector('body').appendChild(document.createElement(tag_name));
  }
};

router.on('/test', () => {
  render('test-tag');
}).on('/test2', () => {
  console.log('this is /test2!');
});

window.addEventListener('load', () => {
  router.resolve();
});

window.addEventListener('navigate', (evt) => {
  router.navigate(evt.detail.url);
});


