
export default class extends HTMLElement {

  constructor() {
    super();
    this.innerHTML = '<em>oh wow nice <a href="/test2">test2</a></em>';
    //let shadowRoot = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this.style = 'border: 1px solid green;';
    this.querySelector('a').addEventListener('click', (evt) => {
      evt.preventDefault();
      let navigate_event = new CustomEvent('navigate', { detail: { url: '/test2' }});
      window.dispatchEvent(navigate_event);
    });
  }
}


