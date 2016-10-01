
import 'webcomponents.js/src/MutationObserver/MutationObserver';
import '@webcomponents/custom-elements/src/custom-elements';

import '@webcomponents/shadydom/src/env';

import TestTag from './custom-elements/test-tag';
import TestTag2 from './custom-elements/test-tag-2';

import Router from 'navigo';

let router = window.router = new Router,
  document = window.document;

window.customElements.define('test-tag', TestTag);
window.customElements.define('test-tag-2', TestTag2);

let render = (tag_name) => {
  let body = document.querySelector('body');
  if (!body.querySelector(tag_name)) {
    body.innerHTML = '';
    let shadow_root = body.attachShadow({ mode: 'open' }),
      el = document.createElement(tag_name),
      sidebar = document.createElement('div');
    sidebar.setAttribute('slot', 'sidebar');
    sidebar.innerHTML = 'sidebar!';
    el.appendChild(sidebar);
    shadow_root.appendChild(el);
    el.shadowRoot.render();
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


