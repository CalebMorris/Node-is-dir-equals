# is-dir-equals

## What am I?

`is-dir-equals` is a simply utility that compares to directories and their
contents to determine if they are equivalent.

## How do I use this?

```javascript
var isDirEquals = require('is-dir-equals');

var dir1 = './path/to/my/dir';
var dir2 = './path/to/my/other-dir';

console.log(`are ${dir1} and ${dir2} equivalent?`);
console.log(`${isDirEquals(dir1, dir2) ? 'yes' : 'no'}`);
```
