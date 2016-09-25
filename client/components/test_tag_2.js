
export default class extends HTMLElement {
  
  constructor() {
    super();
    this.shadow_root = this.attachShadow({ mode: 'open' });
    this.shadow_root.innerHTML = `
      <p>hi from 2</p>  
      <p><a href="/test">go to test</a></p>
    `;
    console.log('ctor 2');
  }
  
  linkOnclick(evt) {
    evt.preventDefault();
    this.dispatchEvent(new CustomEvent('navigate', { detail: { url: '/test' }, bubbles: true }));
  }

  connectedCallback() {
    this.shadow_root.querySelector('a').addEventListener('click',
      this.linkOnclick.bind(this)); 
    console.log('connectedCallback 2');
  }

  disconnectedCallback() {
    console.log('disconnectedCallback 2');
  }
}


