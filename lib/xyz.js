module.exports = Xyz;

var Component = require('./component');

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
 * @return {Xyz}
 */
Xyz.prototype.toXyz = function () {
  return new Xyz(this._x.get(), this._y.get(), this._z.get());
}

/**
 * @return {Lab}
 */
Xyz.prototype.toLab = function () {
  return {};
}
