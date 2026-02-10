import BottomSheet from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@services/navigation/Base.navigation';
import {selectAuth} from '@store/auth/auth.selectors';
import {GoogleSignIn, IosSignIn} from '@store/auth/auth.thunk';
import {useAppDispatch, useAppSelector} from '@store/store';
import {GetStorageObject, SetStorageObjectValue} from '@utils/asyncStore.util';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {getUniqueId} from 'react-native-device-info';

export const useSignin = () => {
  const [localDeviceId, setLocalDeviceId] = useState('');
  const [signinMethod, setSigninMethod] = useState<'IOS' | 'ANDROID'>();

  const {deviceId, loading} = useAppSelector(selectAuth);

  const navigation = useNavigation<NavigationProps>();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '90%'], []);
  const dispatch = useAppDispatch();

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const acceptenceButtonHandler = () => {
    SetStorageObjectValue('HAS_ACCEPTED_TNC', 'YES');
    sheetRef.current?.close();

    if (signinMethod === 'IOS') {
      dispatch(IosSignIn({navigation, device_id: localDeviceId}));
    } else {
      dispatch(GoogleSignIn({navigation, device_id: localDeviceId}));
    }
  };

  const getTACAcceptence = async () => {
    const has_accepted_tac = await GetStorageObject('HAS_ACCEPTED_TNC');

    return has_accepted_tac ? true : false;
  };

  useEffect(() => {
    if (deviceId) {
      setLocalDeviceId(deviceId);
    } else {
      getUniqueId().then(id => {
        setLocalDeviceId(id);
      });
    }
  }, [deviceId]);

  const signinButtonHandler = async (platform: 'IOS' | 'ANDROID') => {
    const hasAcceptedTAC = await getTACAcceptence();

    if (hasAcceptedTAC) {
      platform === 'IOS'
        ? dispatch(IosSignIn({navigation, device_id: localDeviceId}))
        : dispatch(GoogleSignIn({navigation, device_id: localDeviceId}));
    } else {
      setSigninMethod(platform);
      handleSnapPress(0);
    }
  };

  return {
    loading,
    sheetRef,
    snapPoints,
    acceptenceButtonHandler,
    signinButtonHandler,
  };
};
