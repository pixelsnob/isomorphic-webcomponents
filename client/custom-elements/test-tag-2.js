
import TestTag3 from './test-tag-3';

if (!window.customElements.get('test-tag-3')) {
  window.customElements.define('test-tag-3', TestTag3);
}

export default class extends HTMLElement {
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <slot name="sidebar"></slot>
      <p><a href="/test">go to test 1</a></p>
      <span>(from shadow dom)</span>
      <ul></ul>
      <slot name="testing"></slot>
    `;
    let ul = this.shadowRoot.querySelector('ul');
    if (!ul.childNodes.length) {
      for (let i = 0; i <= 5; i++) {
        let li = document.createElement('li');
        let tt3 = document.createElement('test-tag-3');
        tt3.setAttribute('test', i);
        tt3.shadowRoot.render();
        li.appendChild(tt3);
        ul.appendChild(li);
      }
    }
    this.shadowRoot.querySelector('a').addEventListener('click', evt => {
      window.dispatchEvent(new CustomEvent('navigate', { detail: { url: '/test' }}));
      evt.preventDefault();
    });
  }
   
}


