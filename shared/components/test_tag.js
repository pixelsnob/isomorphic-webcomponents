
import HTMLElement from 'components/HTMLElement';

export default class extends HTMLElement {
  
  constructor() {
    super();
    /*const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <em>oh wow, nice</em>
    `;*/
  }

  createdCallback() {
    this.style = 'border: 1px solid red;';
    this.innerHTML = 'nice';
  }
}


