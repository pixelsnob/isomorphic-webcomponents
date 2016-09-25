

import 'webcomponents.js/src/MutationObserver/MutationObserver';
import '@webcomponents/custom-elements/src/custom-elements';

import '@webcomponents/shadydom/src/env';

import TestTag from './components/test_tag';
import TestTag2 from './components/test_tag_2';

import Router from 'navigo';

let router = window.router = new Router,
  document = window.document;

window.customElements.define('test-tag', TestTag);
window.customElements.define('test-tag-2', TestTag2);

let render = (tag_name) => {
  let body = document.querySelector('body');
  if (!body.querySelector(tag_name)) {
    body.innerHTML = '';
    let shadow_root = body.attachShadow({ mode: 'open' });
    shadow_root.appendChild(document.createElement(tag_name));
  }
};

router.on('/test', () => {
  render('test-tag');
}).on('/test2', () => {
  render('test-tag-2');
});

window.addEventListener('load', () => {
  router.resolve();
});

window.addEventListener('navigate', (evt) => {
  router.navigate(evt.detail.url);
});

