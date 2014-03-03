var Lab = require('..').Lab;

describe('Lab', function(){

  describe('toXyz', function(){
    it('should convert to correct color in Xyz model')
  })

  describe('component aliases (L, a, b)', function(){
    it('should set component`s value where passed and return it if nothing passed', function() {
      new Lab(10, 20, 30).lightness(15).lightness().should.be.equal(15);
      new Lab(10, 20, 30).a('30').a().should.be.equal(30);
      new Lab(10, 20, 30).b('44').b().should.be.equal(44);
    })
  })

});
