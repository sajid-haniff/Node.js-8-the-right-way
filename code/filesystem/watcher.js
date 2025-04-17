// watcher.js
import { watch } from 'fs';

/**
 * Creates a file watcher.
 * @param {string} path – file or directory to watch
 * @param {object} [options] – fs.watch options
 * @param {Function} onChange – callback when a change is detected
 * @returns {{ close: () => void }} – handle with `.close()` to stop watching
 */
export const createWatcher = (path, options = { persistent: true, encoding: 'utf8' }, onChange) => {
    const watcher = watch(path, options, onChange);
    return { close: () => watcher.close() };
};

// Usage example
const { close } = createWatcher(
    'target.txt',
    undefined,
    () => console.log(`📝 ${new Date().toLocaleTimeString()}: target.txt changed!`)
);

console.log('👁️ Now watching target.txt for changes…');

// later, if you need to stop watching:
// close();
