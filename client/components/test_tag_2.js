
export default class extends HTMLElement {

  constructor() {
    super();
    this.test = 'test!';
    this.innerHTML = `<em>go back please <a href="/test">${this.test}</a></em>`;
    this.querySelector('a').addEventListener('click', (evt) => {
      evt.preventDefault();
      let navigate_event = new CustomEvent('navigate', { detail: { url: '/test' }});
      window.dispatchEvent(navigate_event);
    });
  }

  connectedCallback() {
    this.style = 'border: 1px solid red;';
  }
}


