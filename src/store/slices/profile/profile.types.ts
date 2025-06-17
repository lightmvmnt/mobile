export interface ProfileInitialState {
  socialAccounts: SocialAccount[];
  loading: boolean;
  getConnectedProvidersLoading: boolean;
  account: Account | null;
  connectedProviders: ConnectedProvider[];
}

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
