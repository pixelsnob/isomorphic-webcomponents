
import TestTag3 from './test_tag_3';

if (!window.customElements.get('test-tag-3')) {
  window.customElements.define('test-tag-3', TestTag3);
}

export default class extends HTMLElement {
  
  constructor() {
    super();
    this.shadow_root = this.attachShadow({ mode: 'open' });
    this.shadow_root.innerHTML = `
      <div id="test-tag-2">
        <p>hi from 2</p>  
        <p><a href="/test">go to test</a></p>
      </div>
      <ul>
      </ul>
    `;
    let ul = this.shadow_root.querySelector('ul');
    for (let i = 0; i < 500; i++) {
      let li = document.createElement('li');
      let test_tag_3 = document.createElement('test-tag-3');
      test_tag_3.setAttribute('test', i);
      li.appendChild(test_tag_3);
      ul.appendChild(li);
    }
  }
  
  linkOnclick(evt) {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { url: '/test' }}));
    evt.preventDefault();
  }
  
  connectedCallback() {
    this.shadow_root.querySelector('a').addEventListener('click',
      this.linkOnclick.bind(this)); 
    //console.log('connectedCallback 2 (client only)');
  }

  disconnectedCallback() {
    //console.log('disconnectedCallback 2 (client only)');
  }
}


