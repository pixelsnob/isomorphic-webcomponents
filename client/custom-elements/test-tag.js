
import render from './render-iso';

export default class extends HTMLElement {
  
  constructor() {
    super();
    let shadow_root = render(this, `
      <p>hi from test-tag</p>  
      <p><a href="/test2">go to test 2</a></p>
    `);
    if (shadow_root) {
      this.attachHandlers(shadow_root);
    } else {
      this.attachHandlers(this);
    }
    //console.log('ctor 1');
  }
  
  attachHandlers(root_node) {
    root_node.querySelector('a').addEventListener('click', (evt) => {
      evt.preventDefault();
      window.dispatchEvent(new CustomEvent('navigate', { detail: { url: '/test2' }}));
    });
  }

  disconnectedCallback() {
    //console.log('disconnectedCallback 1');
  }
}


