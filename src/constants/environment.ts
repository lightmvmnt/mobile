const DEV_API_URL = 'https://dev-dot-solar-bolt-445009-p8.lm.r.appspot.com';
const PROD_API_URL = 'https://solar-bolt-445009-p8.lm.r.appspot.com';

export const environment = {
  API_BASE_URL: __DEV__ ? DEV_API_URL : PROD_API_URL,
  CLIENT_ID:
    '813935825552-gj60ssa1ar4kqnctdlmcldlotcdpholv.apps.googleusercontent.com',
  IOS_CLIENT_ID:
    '813935825552-vkh63lpbf942f9jtrlh9r12i15sda5us.apps.googleusercontent.com',
  APPLE_SIGNIN_CLIENT_ID: 'org.solvio.dzala',
  FACEBOOK_CLIENT_ID: '1615036889157754',
};
