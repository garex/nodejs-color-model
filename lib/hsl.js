module.exports = Hsl;

var Component = require('./component');

/**
 * Hue, saturation, lightness color space
 */
function Hsl(h, s, l) {
  this._name       = 'hsl';
  this._components = ['hue', 'saturation', 'lightness'];
  this._hue        = new Component('hue',        0, 360).set(h);
  this._saturation = new Component('saturation', 0, 1)  .set(s);
  this._lightness  = new Component('lightness',  0, 1)  .set(l);
}

require('util').inherits(Hsl, require('./abstract-model'));

/**
 * @param {Float} value
 * @return {Hsl|float}
 */
Hsl.prototype.hue = function (value) {
  return this._component('hue', arguments);
}

/**
 * @param {Float} value
 * @return {Hsl|float}
 */
Hsl.prototype.saturation = function (value) {
  return this._component('saturation', arguments);
}

/**
 * @param {Float} value
 * @return {Hsl|float}
 */
Hsl.prototype.lightness = function (value) {
  return this._component('lightness', arguments);
}

