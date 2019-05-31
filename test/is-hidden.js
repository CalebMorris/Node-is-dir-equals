var chai = require('chai');
var expect = chai.expect;

var isHiddenFile = require('../src/is-hidden');

describe('isHiddenFile', function() {
  it('.', function() {
    expect(isHiddenFile('.')).to.be.true;
  });

  it('..', function() {
    expect(isHiddenFile('..')).to.be.true;
  });

  it('.test', function() {
    expect(isHiddenFile('.test')).to.be.true;
  });

  it('foo.txt', function() {
    expect(isHiddenFile('foo.txt')).to.be.false;
  });

  it('blarg/.test', function() {
    expect(isHiddenFile('blarg/.test')).to.be.true;
  });
});
