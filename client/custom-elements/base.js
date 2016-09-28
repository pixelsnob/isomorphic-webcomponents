
export default class extends HTMLElement {
  
  constructor() {
    super();
  }
  
  /**
   * Isomorphic render()
   * 
   * Always uses the shadow dom on the server, and attaches one on the client only if one
   * isn't already attached. Handlers are attached to existing HTML (if any) on initial
   * render, and to the shadow dom on subsequent render() calls.
   * 
   */
  render(html) {
    if (this.isServer() || (this.getRootNode() === this)) {
      let shadow_root = this.attachShadow({ mode: 'open' });
      shadow_root.innerHTML = html;
      if (this.attachHandlers) {
        this.attachHandlers(shadow_root);
      }
      return shadow_root;
    } else {
      if (!window.server && this.attachHandlers) {
        this.attachHandlers(this);
      }
    }
  }
  
  isServer() {
    return window.is_server;
  }
  
  isClient() {
    return !window.is_server;
  }

  connectedCallback() {
    
  }
  
  disconnectedCallback() {
    
  }

}


