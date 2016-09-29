
export default function(el, html) {
  el.iso_root = el;
  if (window.is_server || (el.getRootNode() === el)) {
    let shadow_root = el.attachShadow({ mode: 'open' });
    shadow_root.innerHTML = html;
    el.iso_root = shadow_root;
  }
  
}

