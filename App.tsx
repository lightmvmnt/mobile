import React, {useEffect} from 'react';
import appsFlyer, {InitSDKOptions} from 'react-native-appsflyer';
import {Settings} from 'react-native-fbsdk-next';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast, {
  ErrorToast,
  InfoToast,
  ToastConfig,
} from 'react-native-toast-message';
import {Provider} from 'react-redux';

import {SimpleModal} from './src/globalComponents';
import {SocialAddModal} from './src/modules/profile/components';
import {TaskSuggestionModal} from './src/modules/tasks/components';
import Routing from './src/services/navigation/Base.navigation';
import {store} from './src/store/store';
import {SetStorageObjectValue} from './src/utils/asyncStore.util';
import {configureNativeComponents} from './src/utils/configureNativeComponents.util';
import {FontSizeGenerator} from './src/utils/fontSizeGenerator.util';

const toastConfig: ToastConfig = {
  error: props => <ErrorToast {...props} text2NumberOfLines={10} />,
  info: props => (
    <InfoToast
      {...props}
      text2NumberOfLines={10}
      text2Style={{fontSize: FontSizeGenerator(12)}}
    />
  ),
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
    Settings.initializeSDK();
  }, []);

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
            <Routing />
            <SimpleModal />
            <TaskSuggestionModal />
            <SocialAddModal />
            <Toast config={toastConfig} onPress={() => Toast.hide()} />
          </SafeAreaProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
