
import TestTag from './custom-elements/test-tag';
import TestTag2 from './custom-elements/test-tag-2';

import Router from 'navigo';

let router = window.router = new Router,
  document = window.document;

window.customElements.define('test-tag', TestTag);
window.customElements.define('test-tag-2', TestTag2);

let render = (tag_name) => {
  let body = document.body;
  if (!body.querySelector(tag_name)) {
    body.innerHTML = '';
    let slot = document.createElement('slot');
    slot.setAttribute('name', 'test');
    body.attachShadow({ mode: 'open' });
    body.shadowRoot.appendChild(slot);
    let tt = document.createElement(tag_name);
    let tt_container = document.createElement('div');
    tt_container.setAttribute('slot', 'test');
    tt_container.appendChild(tt);
    body.appendChild(tt_container);
    body.shadowRoot.render();
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

