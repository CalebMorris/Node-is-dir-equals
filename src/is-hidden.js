
/**
 * Checks whether a path starts with or contains a hidden file or a folder.
 * @param {string} source - The path of the file that needs to be validated.
 * returns {boolean} - `true` if the source is blacklisted and otherwise `false`.
 */
function isHiddenFile(path) {
  return /(?:^|\/|\.)\.[^\/]*/.test(path);
};

module.exports = isHiddenFile;
