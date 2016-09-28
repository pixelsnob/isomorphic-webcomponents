
export default function(el, html) {
  let iso_root = el,
    shadow_root = null;
  if (window.is_server || (el.getRootNode() === el)) {
    shadow_root = el.attachShadow({ mode: 'open' });
    shadow_root.innerHTML = html;
    iso_root = shadow_root;
  }
  return [ shadow_root, iso_root ];
  
}
