
export default class extends HTMLElement {

  constructor() {
    super();
    this.test = 'test2';
    this.innerHTML = `<em>oh wow nice <a href="/test2">${this.test}</a></em>`;
    this.querySelector('a').addEventListener('click', (evt) => {
      evt.preventDefault();
      let navigate_event = new CustomEvent('navigate', { detail: { url: '/test2' }});
      window.dispatchEvent(navigate_event);
    });
  }

  connectedCallback() {
    this.style = 'border: 1px solid green;';
  }
}


