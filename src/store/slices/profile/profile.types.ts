export interface ProfileInitialState {
  socialAccounts: SocialAccount[];
  loading: boolean;
  account: Account | null;
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
