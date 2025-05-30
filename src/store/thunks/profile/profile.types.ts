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
