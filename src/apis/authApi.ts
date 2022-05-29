import API from "../API";
import { apiResponse } from "../types/api";
import { UserData, GoogleUserData } from "../types/data/UserData";

export const actions = {
  AUTH_LOGIN: 'auth/login',
  AUTH_LOGOUT: 'auth/logout',
  AUTH_SIGNUP: 'auth/signup',
}

class authApi extends API {
  login({ email, password, extraOpts = {} }: UserData & { extraOpts?: {} }) {
    const body = { user: { email: email, password: password } };
    const url = 'sign_in';

    this.callLoginApi(url, 'POST', { body: JSON.stringify(body), ...this.requestOpts, ...extraOpts }, (body: apiResponse<any>) => {
      if (body.meta.status === 200) {
        this.dispatch({ type: actions.AUTH_LOGIN, data: body["data"] })
      } else {
        this.notify(body.meta.message)
      }
    })
  }

  googleLogin(data: GoogleUserData, extraOpts = {}) {
    const body = data;
    const url = 'api/v1/social_auth/callback';

    this.callLoginApi(url, 'POST', { body: JSON.stringify(body), ...this.requestOpts, ...extraOpts }, (body: apiResponse<any>) => {
      if (body.meta.status === 200) {
        this.dispatch({ type: actions.AUTH_LOGIN, data: body["data"] })
      } else {
        this.notify(body.meta.message)
      }
    })
  }

  signUp({ email, password, passwordConfirmation }: UserData & { passwordConfirmation: string }) {
    const body = { user: { email: email, password: password, password_confirmation: passwordConfirmation } };
    const url = 'sign_up';

    this.callApi(url, 'POST', { body: JSON.stringify(body), ...this.requestOpts }, (body: apiResponse<any>) => {
      if (body.meta.status === 200) {
        this.dispatch({ type: actions.AUTH_SIGNUP, data: body["data"] })
        this.notify("Please check your registed email for verification")
      } else {
        this.notify(body.meta.message)
      }
    })
  }

  logout() {
    const url = 'sign_out';
    this.callLoginApi(url, 'DELETE', {}, (body: apiResponse<any>) => {
      if (body.meta.status === 200) {
        this.dispatch({ type: actions.AUTH_LOGOUT })
        this.notify("Logged out successfully!")
      }
    });
  }
};

export default authApi;
