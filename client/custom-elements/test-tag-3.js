
export default class extends HTMLElement {
  
  static get observedAttributes() {
    return [ 'test' ];
  }
   
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <p>this is (nested) tag 3: <slot name="value"></slot></p>  
    `;
  }
  
  attributeChangedCallback(name, old_val, new_val) {
    if (name == 'test') {
      this.innerHTML = `<span slot="value">${new_val}</span>`;
      this.shadowRoot.render();
    }
  }

}


