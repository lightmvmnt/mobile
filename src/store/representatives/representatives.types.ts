export interface Representative {
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

export interface RepresentativeDetails {
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

export interface RepresentativesInitialState {
  rep_switch_loading: boolean;
  is_rep_details_updating: boolean;
  get_representatives_loading: boolean;
  get_representative_details_loading: boolean;
  chosen_representative_id: number;
  choose_representative_loading: boolean;
  pressed_representative_id: number;
  representatives: Representative[];
  representative_details: RepresentativeDetails | null;
  error: string | null;
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
