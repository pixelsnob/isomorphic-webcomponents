/**
 * Basic tests covering server-side dom, to make sure necessary objects are 
 * polyfilled correctly
 * 
 */
const assert = require('assert'),
  expect = require('expect.js'),
  server_dom = require('../server/lib/server_dom.js');

let window, document;

describe('window object', function() {

  before(function(done) {
    server_dom.getWindow(null, function(err, win) {
      if (err) {
        done(err);
        return;
      }
      window = win;
      document = window.document;
      done();
    });
  });

  it('should be an object', function() {
    expect(window).to.be.an('object');
  });
  
  it('should have a document property', function() {
    expect(document).to.be.an('object');
  });
  
  it('should have document.body defined', function() {
    expect(document.body).to.be.an('object');
  });
  
  it('should have customElements and ability to define them', function() {
    expect(window.customElements).to.be.an('object');
    expect(window.customElements.define).to.be.a('function');
  });
  
  it('should have shadow dom capabilities', function() {
    expect(document.body.attachShadow).to.be.a('function');
  });
  
  it('should have custom events capabilities', function() {
    expect(window.CustomEvent).to.be.a('function');
  });
  
  it('should render custom element contents using shadow dom and slots', function() {
    let body = document.body,
      slot = document.createElement('slot');
    slot.setAttribute('name', 'test');
    body.attachShadow({ mode: 'open' });
    body.shadowRoot.appendChild(slot);
    let tt = document.createElement('test-tag-2');
    let tt_container = document.createElement('div');
    tt_container.setAttribute('slot', 'test');
    tt_container.appendChild(tt);
    body.appendChild(document.importNode(tt_container, true));
    expect(tt).to.be.an('object');
    expect(body.innerHTML).to.be.ok();
    expect(body.querySelector('a[href="/test"]')).to.be.ok();
  });

});


