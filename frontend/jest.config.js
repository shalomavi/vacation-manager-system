export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
