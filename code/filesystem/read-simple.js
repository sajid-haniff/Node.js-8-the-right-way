
'use strict';
import fs from 'fs';
fs.readFile('target.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data.toString());
});
