
import Base from './base';
import TestTag3 from './test-tag-3';

if (!window.customElements.get('test-tag-3')) {
  window.customElements.define('test-tag-3', TestTag3);
}

export default class extends Base {
  
  constructor() {
    super();
    let root_node = this.render(`
      <p>hi from 2</p>  
      <p><a href="/test">go to test</a></p>
      <ul></ul>
    `);
    if (root_node) {
      let ul = root_node.querySelector('ul');
      for (let i = 0; i <= 50; i++) {
        let li = document.createElement('li'),
          tt3 = document.createElement('test-tag-3');
        tt3.setAttribute('test', i);
        li.appendChild(tt3);
        ul.appendChild(li);
      }
    }
  }
  
  attachHandlers(root_node) {
    root_node.querySelector('a').addEventListener('click', this.linkOnclick); 
  }
  
  linkOnclick(evt) {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { url: '/test' }}));
    evt.preventDefault();
  }

}


