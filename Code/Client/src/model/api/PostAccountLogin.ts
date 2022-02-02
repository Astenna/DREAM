export interface PostAccountLoginRequest {
  email: string,
  password: string,
}

export interface PostAccountLoginResponse {
  accessToken: string,
  refreshToken: string | null | undefined,
}

