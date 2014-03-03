module.exports = Xyz;

var Component = require('./component');
var Rgb       = require('./rgb');
var Lab       = require('./lab');

/**
 * XYZ color model - base color model for others
 *
 * CIE 1931 color space
 */
function Xyz(x, y, z) {
  this._name       = 'xyz';
  this._components = ['x', 'y', 'z'];
  this._x          = new Component('x', 0, 95.05).set(x);
  this._y          = new Component('y', 0, 100)  .set(y);
  this._z          = new Component('z', 0, 108.9).set(z);
}

require('util').inherits(Xyz, require('./abstract-model'));

/**
 * @param {Float} value
 * @return {Xyz|float}
 */
Xyz.prototype.x = function (value) {
  return this._component('x', arguments);
}

/**
 * @param {Float} value
 * @return {Xyz|float}
 */
Xyz.prototype.y = function (value) {
  return this._component('y', arguments);
}

/**
 * @param {Float} value
 * @return {Xyz|float}
 */
Xyz.prototype.z = function (value) {
  return this._component('z', arguments);
}

/**
 * @return {Xyz}
 */
Xyz.prototype.toXyz = function () {
  return new Xyz(this._x.get(), this._y.get(), this._z.get());
}

/**
 * @return {Lab}
 */
Xyz.prototype.toLab = function () {
  var x = this._preparePreLabValue(this._x.get() /  95.047),
      y = this._preparePreLabValue(this._y.get() / 100.000),
      z = this._preparePreLabValue(this._z.get() / 108.883);

  return new Lab(
    this._finalizeLabValue((116 * y) - 16),
    this._finalizeLabValue(500 * (x - y)),
    this._finalizeLabValue(200 * (y - z))
  );
}

/**
 * @param {Float} preLabValue
 * @returns {Float}
 */
Xyz.prototype._preparePreLabValue = function (preLabValue) {
  if (preLabValue > 0.008856) {
    return Math.pow(preLabValue, 1/3);
  }
  return (7.787 * preLabValue) + (16 / 116);
}

/**
 * @param {Float} preLabValue
 * @returns {Float}
 */
Xyz.prototype._finalizeLabValue = function (preLabValue) {
  return Math.round(preLabValue * 10000) / 10000;
}

/**
 * @return {Rgb}
 */
Xyz.prototype.toRgb = function () {
  var x = this._x.get() / 100,
      y = this._y.get() / 100,
      z = this._z.get() / 100,
      r = x *  3.2406 + y * -1.5372 + z * -0.4986,
      g = x * -0.9689 + y *  1.8758 + z *  0.0415,
      b = x *  0.0557 + y * -0.2040 + z *  1.0570;

  return new Rgb(this._finalizeRgbValue(r), this._finalizeRgbValue(g), this._finalizeRgbValue(b));
}

/**
 * @param {Float} preRgbValue
 * @returns {Float}
 */
Xyz.prototype._finalizeRgbValue = function (preRgbValue) {
  if (preRgbValue > 0.0031308 ) {
    preRgbValue = 1.055 * Math.pow(preRgbValue,  1/2.4) - 0.055;
  } else {
    preRgbValue = 12.92 * preRgbValue;
  }

  return Math.round(255 * preRgbValue);
}
