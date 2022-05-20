export interface UserData {
  email: string
  password: string
  password_confirmation?: string
}

export interface GoogleUserData {
  provider: string,
  uid: string,
  id_token: string,
  info: {
    email: string
  }
}
