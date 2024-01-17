export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token_type: string;
  token: string;
  expires_at: Date;
}
