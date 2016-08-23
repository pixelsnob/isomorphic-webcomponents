
'use strict';

window.TestTag = class extends window.HTMLElement {
  createdCallback() {
    this.innerHTML = '<em>oh wow</em>';
  }
}

