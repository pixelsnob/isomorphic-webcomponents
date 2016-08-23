
import HTMLElement from 'components/HTMLElement';

export default class extends HTMLElement {
  
  createdCallback() {
    this.innerHTML = '<em>oh wow, nice</em>';
  }
}


