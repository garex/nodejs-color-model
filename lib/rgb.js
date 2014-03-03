module.exports = Rgb;

var Component = require('./component');

/**
 * Rgb color model
 */
function Rgb(r, g, b) {
  this._name       = 'rgb';
  this._components = ['red', 'green', 'blue'];
  this._red        = new Component('red',   0, 255).set(r);
  this._green      = new Component('green', 0, 255).set(g);
  this._blue       = new Component('blue',  0, 255).set(b);
}

require('util').inherits(Rgb, require('./abstract-model'));

/**
 * @param {Float} value
 * @return {Rgb|float}
 */
Rgb.prototype.red = function (value) {
  return this._component('red', arguments);
}

/**
 * @param {Float} value
 * @return {Rgb|float}
 */
Rgb.prototype.green = function (value) {
  return this._component('green', arguments);
}

/**
 * @param {Float} value
 * @return {Rgb|float}
 */
Rgb.prototype.blue = function (value) {
  return this._component('blue', arguments);
}
