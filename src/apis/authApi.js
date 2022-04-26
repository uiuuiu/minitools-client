import API from "../API";

class authApi extends API {
  login({email, password, extraOpts={}}) {
    const body = { user: { email: email, password: password }};
    const url = 'http://localhost:3000/sign_in';

    this.callLoginApi(url, 'POST', { body: JSON.stringify(body), ...this.requestOpts, ...extraOpts }, (body) => {
      if (body.meta.status == 200) {
        this.dispatch({ type: 'auth/login', data: body["data"] })
      } else {
        this.notify(body.meta.message)
      }
    })
  }

  logout() {
    const url = 'http://localhost:3000/sign_out';
    this.callLoginApi(url, 'DELETE', {}, (body) => {
      if (body.meta.status == 200) {
        this.dispatch({ type: 'auth/logout' })
        this.notify("Logged out successfully!")
      }
    });
  }
};

export default authApi;
