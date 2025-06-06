export interface Props {
  socialAccounts: SocialAccounts[];
}

interface SocialAccounts {
  type: 'FB' | 'TT' | 'YT' | 'LDIN';
  link: string;
}
