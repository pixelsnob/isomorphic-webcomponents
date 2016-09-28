
export default class extends HTMLElement {
  
  static get observedAttributes() {
    return [ 'test' ];
  }
   
  constructor() {
    super();
    let shadow_root = this.attachShadow({ mode: 'open' });
    shadow_root.innerHTML = `
      <p>this is (nested) tag 3: <span class="value"></span></p>  
    `;
    //console.log(3);
  }
  
  attributeChangedCallback(name, old_val, new_val) {
    if (name == 'test') {
      let val_span = this.shadowRoot.querySelector('.value');
      if (val_span) {
        val_span.innerHTML = new_val;
      }
    }
  }

}


