
export default function(el, html) {
  el.iso = el;
  if (window.is_server || (el.getRootNode() === el)) {
    el.attachShadow({ mode: 'open' });
    el.shadowRoot.innerHTML = html;
    el.iso = el.shadowRoot;
  }
  
}

