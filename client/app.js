
import MutationObserver from 'webcomponents.js/src/MutationObserver/MutationObserver';
import custom_elements from '@webcomponents/custom-elements/src/custom-elements';

import TestTag from './components/test_tag';
import TestTag2 from './components/test_tag_2';
import Router from 'navigo';

let router = window.router = new Router,
  document = window.document;

window.customElements.define('test-tag', TestTag);
window.customElements.define('test-tag-2', TestTag2);

let render = (tag_name) => {
  let body_el = document.querySelector('body');
  // gross, temporary
  body_el.innerHTML = '';
  body_el.appendChild(document.createElement(tag_name));
};

router.on('/test', () => {
  render('test-tag');
}).on('/test2', () => {
  render('test-tag-2');
  console.log('this is /test2!');
});

window.addEventListener('load', () => {
  router.resolve();
});

window.addEventListener('navigate', (evt) => {
  router.navigate(evt.detail.url);
});

