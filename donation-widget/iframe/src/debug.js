import Debug from 'debug';

const debug = Debug('panvala:iframe');
debug.enabled = 'localhost' === window.location.hostname;
try {
  debug.enabled =
    debug.enabled ||
    (window.localStorage && window.localStorage.getItem('DEBUG')) === '1';
} catch (e) {}

export default debug;
