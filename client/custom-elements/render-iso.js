
export default function(el, html) {

  if (window.is_server || (el.getRootNode() === el)) {
    let shadow_root = el.attachShadow({ mode: 'open' });
    shadow_root.innerHTML = html;
    return shadow_root;
  }
  
}


