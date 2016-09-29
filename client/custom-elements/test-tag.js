
import render from './render-iso';

export default class extends HTMLElement {
  
  constructor() {
    super();
    render(this, `
      <p>hi from test-tag</p>  
      <p><a href="/test2">go to test 2</a></p>
    `);

    this.iso_root.querySelector('a').addEventListener('click', (evt) => {
      evt.preventDefault();
      window.dispatchEvent(new CustomEvent('navigate', { detail: { url: '/test2' }}));
    });
  }

  disconnectedCallback() {
    //console.log('disconnectedCallback 1');
  }
}


