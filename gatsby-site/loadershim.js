// Runs before each test file
// Gatsby defines a global called ___loader to prevent its
// method calls from creating console errors you override it here
global.___loader = {
  enqueue: jest.fn(),
};
