import {Account, User} from '../../thunks/auth/auth.types';

export interface AuthInitialState {
  sessionToken: string;
  accessToken: string;
  loading: boolean;
  isAuth: boolean;
  user: User | null;
  deviceId: string;
  account: Account | null;
}
