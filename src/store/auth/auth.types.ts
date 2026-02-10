export interface CreateUser {
  provider: string;
  process: string;
  token: {
    client_id: string;
    id_token?: string;
    access_token?: string;
  };
}

export interface User {
  display: string;
  email: string;
  has_usable_password: boolean;
  id: number;
  username: string;
}

export interface SigninResponse {
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

export interface GetUserTotalPointsResponse {
  points: number;
}

export interface AuthInitialState {
  sessionToken: string;
  accessToken: string;
  loading: boolean;
  isAuth: boolean;
  user: User | null;
  deviceId: string;
  userTotalPoints: number;
  userTotalPointsLoading: boolean;
  error: string | null;
}
