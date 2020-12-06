export default debug('panvala:iframe', 'rgb(243, 132, 30)');

function debug(scope, color) {
  let enabled = 'localhost' === window.location.hostname;
  try {
    enabled ||
      (window.localStorage && window.localStorage.getItem('DEBUG')) === '1';
  } catch (e) {}

  if (!enabled) return function() {};

  return function(s, ...args) {
    console.log(`%c ${scope} ${s}`, `color: ${color}`, ...args);
  };
}
