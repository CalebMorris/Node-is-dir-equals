var fs = require('fs');
var isHiddenFile = require('./is-hidden');

/**
 * @param {string} dir1   The first director to compare against another
 * @param {string} dir2   The second director to compare against another
 * @param {Object} config The configuration for how to compare the directories
 * @param {boolean} config.ignoreHidden Ignore hidden files when comparing
 * @param {boolean} config.verbose      Print an error message when directories differ
 * @return {boolean} If the directories are equal
 */
function isDirEquals(dir1, dir2, config) {
  return walk(dir1, dir2, config || {});
}

/**
 * @param {boolean} ignoreHidden Should hidden files be filtered?
 * @param {string}  path         The file path to check if should be filtered
 * @return {boolean} Should the file be filtered?
 */
function filterHiddenFileBase(ignoreHidden, path) {
  if (ignoreHidden) {
    return !isHiddenFile(path);
  }
  return true;
}

function walk(dir1, dir2, config) {
  var logError = logErrorBase.bind(this, config.verbose);
  var filterHiddenFile = filterHiddenFileBase.bind(this, config.ignoreHidden);
  var list1 = fs.readdirSync(dir1).filter(filterHiddenFile);
  var list2 = fs.readdirSync(dir2).filter(filterHiddenFile);

  var list1Length = list1.length;
  var list2Length = list2.length;

  if (list1Length !== list2Length) {
    logError(`[${dir1}]#${list1Length} and [${dir2}]#${list2Length} has different number of files`);
    return false;
  }

  for(var i = 0; i < list2Length; i++) {
    file1 = dir1 + '/' + list1[i];
    file2 = dir2 + '/' + list2[i];

    if (list1[i] !== list2[i]) {
      logError(`Name mismatch [${file1}],[${file2}]`);
      return false;
    }

    var stat1 = fs.statSync(file1);
    var stat2 = fs.statSync(file2);
    if (stat1 && stat1.isDirectory()) {
      return walk(file1, file2, config);
    } else {
      return areFilesEquivalent(file1, file2, config);
    }
  }

  return true;
}

var CHUNK_SIZE = 1024;
function areFilesEquivalent(file1, file2, config) {
  var logError = logErrorBase.bind(this, config.verbose);
  var fileDescriptor1 = fs.openSync(file1, 'r');
  var fileDescriptor2 = fs.openSync(file2, 'r');
  var buffer1 = Buffer.alloc(CHUNK_SIZE);
  var buffer2 = Buffer.alloc(CHUNK_SIZE);
  var offset = 0;
  var length = CHUNK_SIZE;
  var position = 0;
  var resultCount1 = fs.readSync(fileDescriptor1, buffer1, offset, length, position);
  var resultCount2 = fs.readSync(fileDescriptor2, buffer2, offset, length, position);
  while (resultCount1 > 0) {
    if (resultCount1 !== resultCount2) {
      logError(`[${file1}]#${position + resultCount1} != [${file2}]#${position + resultCount2}`);
      return false;
    }
    position += resultCount1;
    resultCount1 = fs.readSync(fileDescriptor1, buffer1, offset, length, position);
    resultCount2 = fs.readSync(fileDescriptor2, buffer2, offset, length, position);
  }
  return true;
}

function logErrorBase(verbose, message) {
  if (verbose) {
    console.error(message);
  }
}

module.exports = isDirEquals;
