import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {SimpleModal} from './src/globalComponents';
import Toast, {ErrorToast, ToastConfig} from 'react-native-toast-message';
import {configureNativeComponents} from './src/utils/configureNativeComponents.util';
import {PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import appsFlyer, {InitSDKOptions} from 'react-native-appsflyer';
import {TaskSuggestionModal} from './src/modules/tasks/components';
import {SetStorageObjectValue} from './src/utils/asyncStore.util';
import { useEffect } from 'react';
import BaseInterceptor from 'store/interceptors';
import NavigationWrapper from 'services/navigation/NavigationWrapper';

const toastConfig: ToastConfig = {
  error: props => <ErrorToast {...props} text2NumberOfLines={10} />,
};

const appsFlyerOptions: InitSDKOptions = {
  devKey: 'XjAJxzVUJT3hPaufeUUK5K',
  appId: '111157983',
  isDebug: true,
  onInstallConversionDataListener: true,
  onDeepLinkListener: true,
  timeToWaitForATTUserAuthorization: 1,
};

configureNativeComponents();

function App() {
  useEffect(() => {
    appsFlyer.initSdk(
      appsFlyerOptions,
      () => {},
      error => console.log(error),
    );

    appsFlyer.setAppInviteOneLinkID('x8gn');

    appsFlyer.onInstallConversionData(data => {
      if (data.data.af_status === 'Non-organic') {
        SetStorageObjectValue('refferer_id', data.data.af_referrer_customer_id);
      }
    });
  }, []);

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
              <TaskSuggestionModal />
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
