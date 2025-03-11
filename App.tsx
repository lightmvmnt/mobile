import React, {useEffect} from 'react';
import Routing from './src/services/navigation/Base.navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {SimpleModal} from './src/globalComponents';
import Toast, {ErrorToast, ToastConfig} from 'react-native-toast-message';
import {configureNativeComponents} from './src/utils/configureNativeComponents.util';
import {PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import appsFlyer, {InitSDKOptions} from 'react-native-appsflyer';

const toastConfig: ToastConfig = {
  error: props => <ErrorToast {...props} text2NumberOfLines={10} />,
};

const appsFlyerOptions: InitSDKOptions = {
  devKey: 'XjAJxzVUJT3hPaufeUUK5K',
  appId: '111157983',
  isDebug: true,
  onInstallConversionDataListener: true,
  onDeepLinkListener: true,
  timeToWaitForATTUserAuthorization: 10,
};

configureNativeComponents();

function App() {
  useEffect(() => {
    appsFlyer.initSdk(
      appsFlyerOptions,
      result => console.log(result),
      error => console.log(error),
    );

    appsFlyer.setAppInviteOneLinkID('x8gn', res => console.log(res));

    appsFlyer.onInstallConversionData(data => console.log(data));

    appsFlyer.onAppOpenAttribution(data => console.log(data));
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <PaperProvider>
          <SafeAreaProvider>
            <Routing />
            <SimpleModal />
            <Toast config={toastConfig} onPress={() => Toast.hide()} />
          </SafeAreaProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
