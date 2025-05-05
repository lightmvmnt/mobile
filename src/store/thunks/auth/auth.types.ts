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

export interface Account {
  first_name: string;
  last_name: string;
  email: string;
}

export interface UpdateUserPayload {
  first_name: string;
  last_name: string;
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
