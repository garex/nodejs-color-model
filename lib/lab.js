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

/**
 * @param {Float} value
 * @return {Lab|float}
 */
Lab.prototype.lightness = function (value) {
  return this._component('lightness', arguments);
}

/**
 * @param {Float} value
 * @return {Lab|float}
 */
Lab.prototype.a = function (value) {
  return this._component('a', arguments);
}

/**
 * @param {Float} value
 * @return {Lab|float}
 */
Lab.prototype.b = function (value) {
  return this._component('b', arguments);
}
