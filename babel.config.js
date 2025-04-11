module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      'react-native-reanimated/plugin',
      [
         'module-resolver',
         {
           root: ['./src'],
           extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
           alias: {
            "@assets": "./src/assets",
            "@constants": "./src/constants",
            "@modules": "./src/modules",
            "@services": "./src/services",
            "@store": "./src/store",
            "@types": "./src/types",
            "@utils": "./src/utils",
            "@globalComponents": "./src/globalComponents",
            "@components": "./src/components", // already present
           }
         }
      ]
    ],
  };