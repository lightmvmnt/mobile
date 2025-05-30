export interface ProfileInitialState {
  socialAccounts: SocialAccount[];
  loading: boolean;
  account: Account | null;
}

export interface Account {
  first_name: string;
  last_name: string;
  email: string;
}

export interface SocialAccount {
  id: number;
  social_account: string;
  type_id: number;
}
