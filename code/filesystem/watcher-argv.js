#!/usr/bin/env node
// watcher.js
import { watch } from 'fs';


/**
 * Creates a file watcher.
 * @param {string} path – file or directory to watch
 * @param {object} [opts]
 * @param {boolean} [opts.persistent=true]
 * @param {boolean} [opts.recursive=false]
 * @param {BufferEncoding} [opts.encoding='utf8']
 * @param {Function} onChange – callback for change events
 * @returns {{ close(): void }}
 */
export const createWatcher = (
    path,
    { persistent = true, recursive = false, encoding = 'utf8' } = {},
    onChange
) => {
  const watcher = watch(path, { persistent, recursive, encoding }, onChange);
  return { close: () => watcher.close() };
};

const run = () => {
  const [, , filename] = process.argv;

  if (!filename) {
    console.error('⛔ Error: No file specified to watch.');
    console.error('Usage: node watcher.js <filename>');
    process.exit(1);
  }

  const { close } = createWatcher(
      filename,
      undefined,
      () => {
        const time = new Date().toLocaleTimeString();
        console.log(`📝 [${time}] File ${filename} changed!`);
      }
  );

  console.log(`👁️ Now watching ${filename} for changes…`);

  // Gracefully handle exit
  ['SIGINT', 'SIGTERM'].forEach(sig =>
      process.on(sig, () => {
        console.log(`\n✋ Stopping watcher on ${filename}…`);
        close();
        process.exit();
      })
  );
};

run();
