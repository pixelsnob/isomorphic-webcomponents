
export default class extends HTMLElement {
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <slot name="sidebar"></slot>
      <p><a href="/test2">go to test 2</a></p>
      <span>(from shadow dom)</span>
      <slot name="testing"></slot>
    `;
  }
  
  connectedCallback() {
    let t = document.createElement('div');
    t.innerHTML = '<div slot="testing">from client</div>';
    this.shadowRoot.appendChild(t);
    this.shadowRoot.querySelector('a').addEventListener('click', evt => {
      evt.preventDefault(); 
      let navigate_event = new CustomEvent('navigate', { detail: { url: '/test2' }});
      window.dispatchEvent(navigate_event);
    });
  }
  
  disconnectedCallback() {
    //console.log('disconnectedCallback 1');
  }
}


