import {NavigationProps} from '../../../services/navigation/Base.navigation';
import {User} from '../auth/auth.types';

export interface Account {
  first_name: string;
  last_name: string;
  email: string;
  leader_details: {
    is_approved: boolean;
    about_me: string;
    facebook_profile: {
      link: string;
      photo: string;
    };
  };
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
  navigation: NavigationProps;
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

export interface removeConnectedProviderPayload {
  provider: string;
  account: string;
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

export interface GetconnectedProvidersResponse {
  status: number;
  data: connectedProvidersData[];
}

interface connectedProvidersData {
  uid: string;
  display: string;
  provider: connectedProvider;
}

interface connectedProvider {
  id: string;
  name: string;
  client_id: string;
  flows: string[];
}
