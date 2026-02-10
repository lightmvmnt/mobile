export interface ReferralInitialState {
  referralLink: string;
  generateReferralLinkLoading: boolean;
  referralCount: number;
  getReferralCountLoading: boolean;
}

export interface getUserReferralCountResponse {
  count: number;
}
