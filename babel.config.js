module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin'
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          '@assets': './src/assets',
          '@globalComponents': './src/globalComponents',
          '@constants': './src/constants',
          '@modules': './src/modules',
          '@store': './src/store',
          '@services': './src/services',
          '@types': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
