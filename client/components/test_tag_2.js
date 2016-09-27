
import TestTag3 from './test_tag_3';

if (!window.customElements.get('test-tag-3')) {
  window.customElements.define('test-tag-3', TestTag3);
}

import * as diff from 'diffhtml';

export default class extends HTMLElement {
  
  constructor() {
    super();
    this._id = '#test-tag-2';
    if (window.is_server || !this.querySelector(this._id)) {
      let shadow_root = this.attachShadow({ mode: 'open' });
      shadow_root.innerHTML = `
        <div id="test-tag-2">
          <p>hi from 2</p>  
          <p><a href="/test">go to test</a></p>
        </div>
        <ul>
        </ul>
      `;
      let ul = shadow_root.querySelector('ul');
      for (let i = 0; i <= 100; i++) {
        let li = document.createElement('li');
        let test_tag_3 = document.createElement('test-tag-3');
        test_tag_3.setAttribute('test', i);
        li.appendChild(test_tag_3);
        ul.appendChild(li);
      }
      this.attach(shadow_root);
    } else {
      this.attach(this);
    }
  }
  
  attach(root_node) {
    root_node.querySelector('a').addEventListener('click',
      this.linkOnclick.bind(this)); 
  }

  linkOnclick(evt) {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { url: '/test' }}));
    evt.preventDefault();
  }
  
  connectedCallback() {
    //console.log('connectedCallback 2 (client only)');
  }
  
  disconnectedCallback() {
    //console.log(this.getRootNode());
    //console.log('disconnectedCallback 2 (client only)');
  }

}


