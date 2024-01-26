export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token_type: string;
  token: string;
  expires_at: Date;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  email_verified_at: null;
  created_at: Date;
  updated_at: Date;
}
