import {User} from '../auth/auth.types';

export interface Account {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  leader_details: {
    id: number;
    is_approved: boolean;
    about_me: string;
    facebook_profile: {
      link: string;
      photo: string;
    };
    votes_count: number;
  };
}

export interface SocialAccount {
  id: number;
  social_account: string;
  type_id: number;
}

export interface ConnectedProvider {
  display: string;
  provider: {
    client_id: string;
    flows: string[];
    id: string;
    name: string;
  };
  uid: string;
}

export interface ProfileInitialState {
  socialAccounts: SocialAccount[];
  loading: boolean;
  getConnectedProvidersLoading: boolean;
  account: Account | null;
  connectedProviders: ConnectedProvider[];
  removeSocialAccountLoading: boolean;
  socialAddModalProps: {
    visible: boolean;
    typeId: number;
  };
  error: string | null;
}

export interface UpdateAccountPayload {
  first_name: string;
  last_name: string;
}

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
  data: ConnectedProvider[];
}
