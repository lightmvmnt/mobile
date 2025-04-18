import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {getUniqueId} from 'react-native-device-info';
import {
  GetStorageObject,
  SetStorageObjectValue,
} from '../../../../utils/asyncStore.util';
import {
  GoogleSignIn,
  IosSignIn,
} from '../../../../store/thunks/auth/auth.thunk';
import BottomSheet from '@gorhom/bottom-sheet';
import { useAppNavigation } from 'services/navigation/NavigationUtils/UseAppNavigation';

export const useSignin = () => {
  const [localDeviceId, setLocalDeviceId] = useState('');
  const [signinMethod, setSigninMethod] = useState<'IOS' | 'ANDROID'>();

  const {deviceId, loading} = useAppSelector(state => state.auth);

  const navigation = useAppNavigation();

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '90%'], []);
  const dispatch = useAppDispatch();

  const handleSheetChange = useCallback(() => {}, []);

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
    handleSheetChange,
    signinButtonHandler,
  };
};
