
import render from './render-iso';

export default class extends HTMLElement {
  
  static get observedAttributes() {
    return [ 'test' ];
  }
   
  constructor() {
    super();
    render(this, `
      <p>this is (nested) tag 3: <span class="value"></span></p>  
    `);
  }
  
  attributeChangedCallback(name, old_val, new_val) {
    if (name == 'test') {
      let val_span = this.iso_root.querySelector('.value');
      if (val_span) {
        val_span.innerHTML = new_val;
      }
    }
  }

}


