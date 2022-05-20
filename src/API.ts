import { FunctionComponent } from 'react';
import { toast, ToastOptions } from 'react-toastify';
import config from './config';
import { AppDispatch } from './store';
import { apiResponse } from './types/api';

class API {
  apiEndpoint: string | undefined;
  dispatch: AppDispatch
  requestOpts: {}
  authRequestOpts: {}

  constructor(dispatch: AppDispatch) {
    this.apiEndpoint = config.apiEndpoint;
    this.dispatch = dispatch;
    this.requestOpts = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Expose-Headers': 'Authorization'
      }
    }

    this.authRequestOpts = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }
  }

  handleResponse(body: apiResponse<any>, cb: Function) {
    try {
      if (body.meta.error) {
        throw body.meta.error
      } else {
        cb(body)
      }
    } catch (e) {
      switch (e) {
        case 'unauthorized':
          this.notify('Token is invalid or expired. Please re-login!', () => {
            this.dispatch({ type: 'auth/logout' })
          })
          return
        default:
          throw e
      }
    }
  }

  handleLoginResponse(headers: Headers, body: apiResponse<any>, cb: ({ data: { }, meta: { } }: apiResponse<any>) => void) {
    try {
      if (body.meta.error) {
        throw body.meta.error
      } else {
        cb({ data: { token: headers.get("Authorization") }, meta: body.meta })
      }
    } catch (e) {
      switch (e) {
        case 'unauthorized':
          this.notify('Token is invalid or expired. Please re-login!', () => {
            this.dispatch({ type: 'auth/logout' })
          })
          return
        default:
          throw e
      }
    }
  }

  notify(message: string | string[], cb?: () => void) {
    let opts: ToastOptions<{}> = {
      autoClose: 3000
    }

    if (cb) opts['onClose'] = cb

    toast(message, opts);
  }

  callApi(url: string, method: string, options: {}, cb?: (data: apiResponse<any>) => void) {
    fetch(
      `${this.apiEndpoint}/${url}`,
      { method: method, ...options }
    ).then(response => {
      response.json().then(body => {
        this.handleResponse(body, (data: apiResponse<any>) => {
          if (cb) cb(data);
        })
      })
    }).catch(err => {
      console.log('err', err)
    })
  }

  callAuthApi(url: string, method: string, options: {}, cb?: (data: apiResponse<any>) => void) {
    fetch(
      `${this.apiEndpoint}/${url}`,
      { method: method, ...options }
    ).then(response => {
      response.json().then(body => {
        this.handleResponse(body, (data: apiResponse<any>) => {
          if (cb) cb(data);
        })
      })
    }).catch(err => {
      console.log('err', err)
    })
  }

  callLoginApi(url: string, method: string, options: {}, cb: (body: apiResponse<any>) => void) {
    fetch(
      `${this.apiEndpoint}/${url}`,
      { method: method, ...options }
    ).then(response => {
      response.json().then((body: apiResponse<any>) => {
        this.handleLoginResponse(response.headers, body, (data) => {
          if (cb) cb(data);
        })
      })
    }).catch(err => {
      console.log('err', err)
    })
  }
};

export default API;
