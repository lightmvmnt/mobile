export interface GetRepresentativesResponse {
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

export interface ChooseRepresentativeResponse {
  leader_user_id: number;
}

export interface UpdateChosenRepresentativeResponse {
  leader_user_id: number;
}

export interface GetChosenRepresentativeIdResponse {
  leader_user_id: number;
}

export interface GetRepresentativeDetailsResponse {
  email: string;
  first_name: string;
  last_name: string;
  leader_details: {
    id: number;
    is_approved: boolean;
    about_me: string;
    facebook_profile: {
      link: string;
      photo: string;
    };
    social_accounts: {
      id: number;
      social_account: string;
      type_id: number;
    }[];
    votes_count: number;
  };
}
