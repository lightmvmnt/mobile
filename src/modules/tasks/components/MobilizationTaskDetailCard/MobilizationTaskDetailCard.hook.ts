import {useEffect, useState} from 'react';
import {useAppDispatch} from '../../../../store/store';
import {getTaskComplitionCount} from '../../../../services/tasks/getTaskComplitionCount';
import {Task} from '../../../../store/slices/tasks/tasks.types';
import {Linking, Platform} from 'react-native';
import {
  checkLocationPermission,
  requestLocationPermission,
} from '../../../../services/location/location';
import {changeModalState} from '../../../../store/slices/app/app.slice';
import Geolocation from '@react-native-community/geolocation';

export const useMobilizationTaskDetailCard = (task: Task | null) => {
  const [completedCount, setCompletedCount] = useState(0);
  const [countLoading, setCountLoading] = useState(true);
  const [isAndroidPermissionBlocked, setIsAndroidPermissionBlocked] =
    useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setCountLoading(true);
    const getCount = async () => {
      const {count} = await getTaskComplitionCount(task ? task.mission.id : 0);

      setCountLoading(false);
      setCompletedCount(count);
    };

    getCount();
  }, [task]);

  const onLinkButtonPress = () => {
    if (!task) {
      return;
    }

    Linking.openURL(task.mission.target_url);
  };

  const openModalForSettings = () => {
    dispatch(
      changeModalState({
        isModalOpen: true,
        modalTitle: 'ლოკაციის უფლება',
        modalDescription:
          'უფლება შეზღუდულია, გსურთ გადახვიდეთ პარამეტრებში და შეცვალოთ ?',
        modalButtonHandler: () => {
          Linking.openSettings();
          setIsAndroidPermissionBlocked(false);
        },
        mainButtonTitle: 'დიახ',
        secondaryButtonTitle: 'არა',
      }),
    );
  };

  const currentLocationHandler = () => {
    Geolocation.getCurrentPosition(postion => {
      let coords = {
        longitude: postion.coords.longitude,
        latitude: postion.coords.latitude,
      };
      console.log(coords);
    });
    setIsAndroidPermissionBlocked(false);
  };

  const locationPermissionHandler = async () => {
    const {permissionsStatus} = await requestLocationPermission();

    if (permissionsStatus === 'granted') {
      currentLocationHandler();
    }

    if (permissionsStatus === 'blocked' && Platform.OS === 'android') {
      setIsAndroidPermissionBlocked(true);
    }
  };

  const onDoneButtonPress = async () => {
    if (!task) {
      return;
    }

    const {checkStatus} = await checkLocationPermission();

    if (checkStatus === 'blocked' || isAndroidPermissionBlocked) {
      openModalForSettings();
    }

    if (checkStatus === 'granted') {
      currentLocationHandler();
    }

    if (checkStatus !== 'granted') {
      locationPermissionHandler();
    }
  };

  return {
    completedCount,
    countLoading,
    onLinkButtonPress,
    onDoneButtonPress,
  };
};
