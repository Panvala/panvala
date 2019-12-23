module.exports = {
  globals: {
    // Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
    // Usually set by Gatsby, and which some components need.
    __PATH_PREFIX__: ``,
  },
  // Jest can’t handle static file imports, so mock em
  // (stylesheets & other assets)
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
  },
  // Used as a base for Jest's config
  preset: 'ts-jest',
  // Modules that setup/configure the testing environment,
  // each one is run once per test file.
  setupFiles: [`<rootDir>/loadershim.js`],
  // Modules that setup/configure the testing framework before each test.
  setupFilesAfterEnv: ['<rootDir>/setup-test-env.js'],
  // Browser-like env.
  testEnvironment: 'jsdom',
  // Default glob patterns Jest uses to detect test files.
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  // Matched against all test paths before executing the test, skips if match
  testPathIgnorePatterns: [`<rootDir>/node_modules/`, `<rootDir>/.cache/`, `<rootDir>/public/`],
  // Regex: transformer (module that provides a synchronous function for transforming source files)
  transform: {
    '^.+\\.[t|j]sx?$': '<rootDir>/jest-preprocess.js',
    // '^.+\\.[jt]sx?$': '<rootDir>/jest-preprocess.js',
  },
  // Required: gatsby includes un-transpiled ES6 code.
  // By default Jest doesn’t try to transform code inside node_modules
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
};

// If you need to make changes to Babel config, edit jest-preprocess.js
