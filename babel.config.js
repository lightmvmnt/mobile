module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          '@assets': './src/assets',
          '@constants': './src/constants',
          '@globalComponents': './src/globalComponents',
          '@modules': './src/modules',
          '@services': './src/services',
          '@store': './src/store',
          '@types': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
