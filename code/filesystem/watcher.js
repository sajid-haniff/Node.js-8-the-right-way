
'use strict';
import fs from 'fs';
fs.watch('target.txt', () => console.log('File changed!'));
console.log('Now watching target.txt for changes...');
