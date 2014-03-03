var Rgb = require('..').Rgb;

describe('Rgb', function(){

  describe('Rgb', function(){
    it('should allow to create empty color')
    it('by default create black color')
    it('should allow only color values between 0 and 255')
  })

  describe('toHex', function(){
    it('should clone from self HexRgb')
  })

  describe('toHexString', function(){
    it('should directly return own hex representation')
  })

  describe('toXyz', function(){
    it('should convert to correct color in Xyz model')
  })

  describe('toHsl', function(){
    it('should convert to correct color in Hsl model')
  })

  describe('toLab', function(){
    it('should convert to correct color in Lab model')
  })

  describe('component aliases (red, green, blue)', function(){
    it('should set component`s value where passed and return it if nothing passed', function() {
      new Rgb(10, 20, 30).red(15).red().should.be.equal(15);
      new Rgb(10, 20, 30).green('30').green().should.be.equal(30);
      new Rgb(10, 20, 30).blue('44').blue().should.be.equal(44);
    })
  })

});
