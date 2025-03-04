import axios, {AxiosError} from 'axios';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {useAppDispatch} from '../../store/store';
import {Logout} from '../../store/thunks/auth/auth.thunk';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../services/navigation/Base.navigation';
import {GetStorageObject} from '../../utils/asyncStore.util';

function BaseInterceptor() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      async request => {
        const token = await GetStorageObject('access_token');
        if (token) {
          request.headers.Authorization = `Bearer ${token}`;
        }

        return request;
      },
      error => Promise.reject(error),
    );

    const responseInterceptor = axios.interceptors.response.use(
      next => Promise.resolve(next),
      error => {
        const res = error.response || {};
        const status = res.status as number;

        // ignore requst cancel error
        if (error.code === 'ERR_CANCELED') {
          return Promise.reject(error);
        }

        console.log((error as AxiosError).response);

        switch (status) {
          case 401: {
            dispatch(Logout(navigation));
            break;
          }
          default: {
            Toast.show({
              type: 'error',
              text1: 'შეფერხება !',
              text2:
                'აპლიკაცია შეფერხებით მუშაობს, ბოდიშს გიხდით დისკომფორტისთვის',
            });
            break;
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch, navigation]);

  return null;
}

export default BaseInterceptor;
