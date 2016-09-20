/* global window */

require('webcomponents.js/dist/MutationObserver');
//require('webcomponents.js/dist/ShadowDOM');
require('webcomponents.js/dist/webcomponents-lite');
require('webcomponents.js/dist/CustomElementsV1.min');

import TestTag from 'components/test_tag';

window.addEventListener('load', () => {
  window.customElements.define('test-tag', TestTag);
  if (window.is_server) {
    window.document.body.appendChild(window.document.createElement('hr'));
  }
});

/*
import mutation_observer from 'webcomponents.js/dist/MutationObserver';
import custom_elements from 'webcomponents.js/dist/CustomElementsV1.min';
import * as skate from 'skatejs';

const sym = Symbol();

skate.define('x-counter', {
  props: {
    // By declaring the property an attribute, we can now pass an initial value
    // for the count as part of the HTML.
    count: skate.prop.number({ attribute: true })
  },
  attached(elem) {
    console.log(elem);
    // We use a symbol so we don't pollute the element's namespace.
    elem[sym] = setInterval(() => ++elem.count, 1000);
  },
  detached(elem) {
    // If we didn't clean up after ourselves, we'd continue to render
    // unnecessarily.
    clearInterval(elem[sym]);
  },
  render(elem) {
    // This first call to text() will not re-render because it does not change.
    skate.vdom.text('Count: ');
    // This will re-render when the count changes.
    skate.vdom.text(elem.count);
  }
});

skate.define('test-tag', {
  render (el) {
    skate.vdom.element('x-counter');
  }
});
*/
//console.log(window.is_server);

