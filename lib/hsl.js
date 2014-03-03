module.exports = Hsl;

var Component = require('./component');
var Rgb       = require('./rgb');

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

/**
 * @return {Xyz}
 */
Hsl.prototype.toXyz = function () {
  return this.toRgb().toXyz();
}

/**
 * @returns {Rgb}
 */
Hsl.prototype.toRgb = function () {
  var lightness  = this._lightness.get(),
      saturation = this._saturation.get();
  if (saturation == 0) {
    var lightness = Math.round(lightness * 255);
    return new Rgb(lightness, lightness, lightness);
  }

  var hue = this._hue.get(),
      v2  = null;
  if (lightness < 0.5) {
    v2 = lightness * (1 + saturation);
  } else {
    v2 = (lightness + saturation) - (saturation * lightness);
  }

  var v1 = 2 * lightness - v2;

  return new Rgb(
      this._finalizeRgbValue(v1, v2, hue + (1/3)),
      this._finalizeRgbValue(v1, v2, hue),
      this._finalizeRgbValue(v1, v2, hue - (1/3))
  );
}

/**
 * @param {Float} preXyzValue
 * @returns {Float}
 */
Hsl.prototype._finalizeRgbValue = function (v1, v2, vHue) {
  if (vHue < 0) {
    vHue += 1;
  }
  if (vHue > 1) {
    vHue -= 1;
  }
  if ((6 * vHue) < 1) {
    res = v1 + (v2 - v1) * 6 * vHue;
  } else if ((2 * vHue) < 1) {
    res = v2;
  } else if ((3 * vHue) < 2) {
    res = v1 + (v2 - v1) * (2/3 - vHue) * 6;
  } else {
    res = v1;
  }
  return Math.round(255 * res);
}

