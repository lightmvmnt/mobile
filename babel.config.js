module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@store': './src/store',
          '@modules': './src/modules',
          '@components': './src/globalComponents',
          '@utils': './src/utils',
          '@services': './src/services',
          '@constants': './src/constants',
          '@assets': './src/assets',
          '@hooks': './src/hooks',
          '@types': './src/types/types',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
