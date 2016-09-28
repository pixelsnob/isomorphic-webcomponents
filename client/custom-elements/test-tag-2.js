
import render from './render-iso';
import TestTag3 from './test-tag-3';

if (!window.customElements.get('test-tag-3')) {
  window.customElements.define('test-tag-3', TestTag3);
}

export default class extends HTMLElement {
  
  constructor() {
    super();
    let shadow_root = render(this, ` 
      <p>hi from 2</p>  
      <p><a href="/test">go to test</a></p>
      <ul></ul>
    `);

    if (shadow_root) {
      let ul = shadow_root.querySelector('ul');
      for (let i = 0; i <= 5; i++) {
        let li = document.createElement('li'),
          tt3 = document.createElement('test-tag-3');
        tt3.setAttribute('test', i);
        li.appendChild(tt3);
        ul.appendChild(li);
      }
      this.attachHandlers(shadow_root);
    } else {
      this.attachHandlers(this);
    }
  }
    
  attachHandlers(root_node) {
    root_node.querySelector('a').addEventListener('click', (evt) => {
      window.dispatchEvent(new CustomEvent('navigate', { detail: { url: '/test' }}));
      evt.preventDefault();
    });

  }
}


