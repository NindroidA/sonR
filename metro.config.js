/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
// Learn more https://docs.expo.io/guides/customizing-metro
const { mergeConfig } = require('metro-config');
const { getDefaultConfig } = require('@react-native/metro-config');

const config = {
  // Make Metro able to resolve required packages that might be imported from /packages/react-native
  resolver: {
    blockList: [/buck-out/, /sdks\/hermes/],
    extraNodeModules: {
      'react-native': __dirname,
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
