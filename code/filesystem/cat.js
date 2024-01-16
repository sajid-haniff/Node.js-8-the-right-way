#!/usr/local/bin/node
'use strict';
import fs from 'fs';
fs.createReadStream(process.argv[2]).pipe(process.stdout);
