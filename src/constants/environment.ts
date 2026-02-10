const DEV_API_URL = 'http://192.168.0.101:3000';
const PROD_API_URL = 'https://solar-bolt-445009-p8.lm.r.appspot.com';

export const environment = {
  API_BASE_URL: __DEV__ ? DEV_API_URL : PROD_API_URL,
  CLIENT_ID:
    '743627465538-m9uinntc27sgfcj3p0ejcv0odb2978f4.apps.googleusercontent.com',
  IOS_CLIENT_ID:
    '743627465538-funthodvboog060n0c48pofk33vv42c6.apps.googleusercontent.com',
  APPLE_SIGNIN_CLIENT_ID: 'org.solvio.dzala',
  FACEBOOK_CLIENT_ID: '1615036889157754',
};
