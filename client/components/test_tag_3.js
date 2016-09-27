
let i = 0;

export default class extends HTMLElement {
  
  static get observedAttributes() {
    return [ 'test' ];
  }
 
  constructor() {
    super();
    this.shadow_root = this.attachShadow({ mode: 'open' });
    this.shadow_root.innerHTML = `
      <p>this is (nested) tag 3: <span class="value"></span></p>  
    `;
  }
  
  adoptedCallback() {
    //console.log('adopted 3');
  }
  
  connectedCallback() {
    //console.log('connectedCallback 3');
  }

  disconnectedCallback() {
    //console.log('disconnectedCallback 3');
  }

  attributeChangedCallback(name, old_val, new_val) {
    if (name == 'test') {
      let val_span = this.shadow_root.querySelector('p .value');
      if (val_span) {
        val_span.innerHTML = new_val;
      }
    }
    //console.log('attributeChangedCallback()', arguments);
  }

}


