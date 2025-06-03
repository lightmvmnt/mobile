import {User} from '../auth/auth.types';

export interface Account {
  first_name: string;
  last_name: string;
  email: string;
}

export interface UpdateAccountPayload {
  first_name: string;
  last_name: string;
}

export type SocialTypes = 1 | 2 | 3 | 4;

export interface UserSocialsResponse {
  id: number;
  social_account: string;
  type_id: number;
}
export interface connectFacebookProfileParams {
  access_token?: string;
  id_token?: string;
}

export interface FacebookConnectPayload {
  provider: string;
  process: string;
  token: {
    client_id: string;
    access_token?: string;
    id_token?: string;
  };
}

export interface FacebookConnectResponse {
  data: {
    user: User;
    methods: {
      at: number;
      method: string;
      provider: string;
      uuid: string;
    }[];
  };
  meta: {
    is_authenticated: boolean;
    session_token: string;
    access_token: string;
  };
  status: number;
}
