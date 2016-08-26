
export default class extends HTMLElement {

  constructor() {
    super();
    this.style = 'border: 1px solid green;';
  }

  connectedCallback() {
    this.innerHTML = '<em>oh wow nice</em>';
  }
}


