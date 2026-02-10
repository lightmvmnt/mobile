export interface Props {
  socialAccounts: SocialAccounts[];
}

export interface SocialAccounts {
  type: 'FB' | 'TT' | 'YT' | 'LDIN';
  link: string;
}
