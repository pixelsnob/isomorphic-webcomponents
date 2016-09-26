
export default class extends HTMLElement {
  
  constructor() {
    super();
    this.shadow_root = this.attachShadow({ mode: 'open' });
    this.shadow_root.innerHTML = `
      <p>hi from test-tag</p>  
      <p><a href="/test2">go to test 2</a></p>
    `;
    console.log('ctor 1');
  }
  
  linkOnclick(evt) {
    evt.preventDefault();
    window.dispatchEvent(new CustomEvent('navigate', { detail: { url: '/test2' }}));
  }

  connectedCallback() {
    this.shadow_root.querySelector('a').addEventListener('click',
      this.linkOnclick.bind(this)); 
    console.log('connectedCallback 1');
  }

  disconnectedCallback() {
    console.log('disconnectedCallback 1');
  }
}


