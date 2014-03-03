module.exports = AbstractModel;

var Component = require('./component');

/**
 * Abstract color model
 */
function AbstractModel() {
  this._name       = null;
  this._components = [];
}

/**
 * @return {String}
 */
AbstractModel.prototype.toString = function () {
  var v = [];
  for (var i = 0, iMax = this._components.length; i < iMax; i++) {
    v.push(this['_' + this._components[i]].get());
  }
  return this._name + '(' + v.join(', ') + ')';
}

/**
 * @param {AbstractModel} that
 * @return {Boolean}
 */
AbstractModel.prototype.equals = function (that) {
  if (!(that instanceof AbstractModel) || this._name !== that._name) {
    return false;
  }
  for (var i = 0, cs = this._components, iMax = cs.length; i < iMax; i++) {
    var key = '_' + cs[i];
    if (!this[key].equals(that[key])) {
      return false;
    }
  }
  return true;
}

/**
 * @return {Xyz}
 */
AbstractModel.prototype.toXyz = function () {
  throw new Error('Model ' + this._name + ' has not implemented Xyz conversion!');
}

/**
 * @return {Lab}
 */
AbstractModel.prototype.toLab = function () {
  return this.toXyz().toLab();
}

/**
 * Getter/chainable setter in one place
 *
 * @param {String} name
 * @param {Float} value
 * @return {AbstractModel|Float}
 */
AbstractModel.prototype.component = function (name, value) {
  var component = this['_' + name];
  if (undefined === component || !(component instanceof Component)) {
    throw new Error('Component "' + name + '" is not exists');
  }

  if (1 == arguments.length) {
    return component.get();
  }

  component.set(value);
  return this;
}

AbstractModel.prototype._component = function (name, args) {
  var component = this['_' + name];

  if (0 == args.length) {
    return component.get();
  }

  component.set(args[0]);
  return this;
}