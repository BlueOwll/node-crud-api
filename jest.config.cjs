/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  verbose: true,
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  transform: {
    '^.+\\.(ts|tsx|js)$': [
      'ts-jest',
      {
        useESM: true,
      },
    ]
  },
  moduleNameMapper: {
    '^(.+)\\.js$': '$1',
    //'^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
