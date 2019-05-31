var chai = require('chai');
var expect = chai.expect;

var isDirEquals = require('../src/is-dir-equals');

var DEEP_EQ = './test/cases/deep-eq/';
var DEEP_HIDDEN_FILE = './test/cases/deep-hidden-file/';
var DIFFERENT_FILE_LIST = './test/cases/different-file-list/';
var DIFFERENT_FILE_NAME = './test/cases/different-file-name/';
var DIFFERENT_FILE_CONTENTS = './test/cases/different-file-contents/';
var IGNORE_HIDDEN_CASE = './test/cases/ignore-hidden/';

describe('isDirEquals', function() {
  describe('ignoreHidden', function() {
    it('should return true when configured and same files excluding hidden files', function() {
      var basePath = IGNORE_HIDDEN_CASE;
      expect(isDirEquals(basePath + 'dir1', basePath + 'dir2', { ignoreHidden: true })).to.be.true;
    });

    it('should return false when not configured same files excluding hidden files', function() {
      var basePath = IGNORE_HIDDEN_CASE;
      expect(isDirEquals(basePath + 'dir1', basePath + 'dir2', { ignoreHidden: false })).to.be.false;
    });

    it('should return true when configured and same deep files excluding hidden files', function() {
      var basePath = DEEP_HIDDEN_FILE;
      expect(isDirEquals(basePath + 'dir1', basePath + 'dir2', { ignoreHidden: true })).to.be.true;
    });

    it('should return false when configured and same deep files excluding hidden files', function() {
      var basePath = DEEP_HIDDEN_FILE;
      expect(isDirEquals(basePath + 'dir1', basePath + 'dir2', { ignoreHidden: false })).to.be.true;
    });
  });

  it('should return true when inner folders are the same', function() {
    var basePath = DEEP_EQ;
    expect(isDirEquals(basePath + 'dir1', basePath + 'dir2')).to.be.true;
  });

  it('should return false when the number of files differ', function() {
    var basePath = DIFFERENT_FILE_LIST;
    expect(isDirEquals(basePath + 'dir1', basePath + 'dir2')).to.be.false;
  });

  it('should return false when file name differs', function() {
    var basePath = DIFFERENT_FILE_NAME;
    expect(isDirEquals(basePath + 'dir1', basePath + 'dir2')).to.be.false;
  });

  it('should return false when the content of files differ', function() {
    var basePath = DIFFERENT_FILE_CONTENTS;
    expect(isDirEquals(basePath + 'dir1', basePath + 'dir2')).to.be.false;
  });
});
