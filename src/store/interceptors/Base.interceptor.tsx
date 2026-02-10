import axios, {AxiosError} from 'axios';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {useAppDispatch} from '../../store/store';
import {Logout} from '@store/auth/auth.thunk';
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
        const sessionToken = await GetStorageObject('session_token');

        if (token) {
          request.headers.Authorization = `Bearer ${token}`;
        }

        if (sessionToken) {
          request.headers['X-Session-Token'] = sessionToken;
        }

        if (!request.headers['Content-Type']) {
          request.headers['Content-Type'] = 'application/json';
        }

        return request;
      },
      error => Promise.reject(error),
    );

    const responseInterceptor = axios.interceptors.response.use(
      next => next,
      (error: AxiosError) => {
        const status = error.response?.status;

        if (error.code === 'ERR_CANCELED') {
          return Promise.reject(error);
        }

        switch (status) {
          case 401: {
            dispatch(Logout(navigation));
            break;
          }
          default: {
            console.log('Axios Error:', {
              url: error.config?.url,
              method: error.config?.method,
              status: error.response?.status,
              data: error.response?.data,
              message: error.message,
            });
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
