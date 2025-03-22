import React from 'react';
import Routing from './src/services/navigation/Base.navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {SimpleModal} from './src/globalComponents';
import Toast, {ErrorToast, ToastConfig} from 'react-native-toast-message';
import {configureNativeComponents} from './src/utils/configureNativeComponents.util';
import {PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NavigationWrapper from '@services/navigation/NavigationWrapper';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabStackNavigator from '@src/services/navigation/BottomTabStack/BottomTabStackNavigator';
import BaseInterceptor from './src/store/interceptors/Base.interceptor';

const toastConfig: ToastConfig = {
  error: props => <ErrorToast {...props} text2NumberOfLines={10} />,
};

configureNativeComponents();

function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <PaperProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <NavigationWrapper />
              <SimpleModal />
              <Toast config={toastConfig} onPress={() => Toast.hide()} />
              <BaseInterceptor />
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
