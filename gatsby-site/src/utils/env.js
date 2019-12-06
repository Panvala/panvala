export const Environment = {
  staging: 'staging',
  development: 'development',
  production: 'production',
};

/**
 * Determine the environment (production, staging, development) using the URL
 * TODO: use environment variables
 */
export function getEnvironment() {
  const urlRoute = window.location.href;

  const isStaging = urlRoute.includes('staging/donate') || urlRoute.includes('develop.panvala.com');

  const environment = isStaging
    ? Environment.staging
    : urlRoute.includes('localhost')
    ? Environment.development
    : Environment.production;

  return environment;
}
