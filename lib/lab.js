module.exports = Lab;

var Component = require('./component');

/**
 * Lab color space
 *
 * CIE 1976 (L*, a*, b*) color space
 */
function Lab(l, a, b) {
  this._name       = 'lab';
  this._components = ['lightness', 'a', 'b'];
  this._lightness  = new Component('lightness', 0,    100).set(l);
  this._a          = new Component('a',         -52,  100).set(a);
  this._b          = new Component('b',         -108, 100).set(b);
}

require('util').inherits(Lab, require('./abstract-model'));
