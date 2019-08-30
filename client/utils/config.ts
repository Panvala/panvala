import getConfig from 'next/config';

// Defaults are a workaround for https://github.com/zeit/next.js/issues/4024
const { publicRuntimeConfig = {} } = getConfig() || {};

export function loadConfig() {
  return publicRuntimeConfig;
}
