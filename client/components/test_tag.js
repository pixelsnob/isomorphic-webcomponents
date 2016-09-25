
export default class extends HTMLElement {
  
  constructor() {
    console.log('ctor');
    super();
    let shadow_root = this.attachShadow({ mode: 'open' });
    shadow_root.innerHTML = `
      <p>hi</p>  
      <p><a href="/test2">test 2</a></p>
    `;
    shadow_root.querySelector('a').addEventListener('click',
      this.linkOnclick.bind(this)); 
  }
  
  linkOnclick(evt) {
    evt.preventDefault();
    window.dispatchEvent(new CustomEvent('navigate', { detail: { url: '/test2' }}));
  }

  connectedCallback() {
    console.log('connectedCallback');
  }

  disconnectedCallback() {
    console.log('disconnectedCallback');
  }
}


