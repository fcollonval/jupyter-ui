/*
 * Copyright (c) 2022-2023 Datalayer Inc. All rights reserved.
 *
 * MIT License
 */

const func = require('@jupyterlab/testutils/lib/jest-config');
const upstream = func(__dirname);

let local = {
  preset: 'ts-jest/presets/js-with-babel',
  transformIgnorePatterns: ['/node_modules/(?!(@jupyterlab/.*)/)'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json',
    },
  },
  transform: {
    '\\.(ts|tsx)?$': 'ts-jest',
    '\\.svg$': 'jest-raw-loader',
  },
};

Object.keys(local).forEach((option) => {
  upstream[option] = local[option];
});

module.exports = upstream;
