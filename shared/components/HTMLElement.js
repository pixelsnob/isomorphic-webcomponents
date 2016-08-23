
if (typeof HTMLElement != 'function') {
  let _HTMLElement = function() {};
  _HTMLElement.prototype = HTMLElement.prototype;
  HTMLElement = _HTMLElement;
}

export default HTMLElement;
