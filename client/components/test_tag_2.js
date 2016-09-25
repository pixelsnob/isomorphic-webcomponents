
export default class extends HTMLElement {
  
  constructor() {
    console.log('ctor');
    super();
    let shadow_root = this.attachShadow({ mode: 'open' });
    shadow_root.innerHTML = `
      <p>yo this works</p>  
      <p><a href="/test">test</a></p>
    `;
    shadow_root.querySelector('a').addEventListener('click',
      this.linkOnclick.bind(this)); 
  }
  
  linkOnclick(evt) {
    evt.preventDefault();
    window.dispatchEvent(new CustomEvent('navigate', { detail: { url: '/test' }}));
  }

  connectedCallback() {
    console.log('connectedCallback');
  }

  disconnectedCallback() {
    console.log('disconnectedCallback');
  }
}


