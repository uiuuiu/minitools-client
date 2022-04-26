import { toast } from 'react-toastify';
class API {  
  constructor(dispatch) {
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

  handleResponse(body, cb) {
    try {
      if (body.meta.error) {
        throw body.meta.error
      } else {
        cb(body)
      }
    } catch (e) {
      switch(e) {
        case 'unauthorized':
          this.notify('Token is invalid or expired. Please re-login!', () => {
            this.dispatch({type: 'auth/logout'}) && this.navigate('/login')
          })
          return
        default:
          throw e
      }
    }
  }

  handleLoginResponse(headers, body, cb) {
    try {
      if (body.meta.error) {
        throw body.meta.error
      } else {
        cb({data: {token: headers.get("Authorization")}, meta: body.meta})
      }
    } catch (e) {
      switch(e) {
        case 'unauthorized':
          this.notify('Token is invalid or expired. Please re-login!', () => {
            this.dispatch({type: 'auth/logout'}) && this.navigate('/login')
          })
          return
        default:
          throw e
      }
    }
  }

  notify(message, cb) {
    let opts = {
      autoClose: 3000
    }

    if (cb) opts['onClose'] = cb

    toast(message, opts);
  }

  callApi(url, method, options, cb) {
    fetch(
      url,
      { method: method, ...options }
    ).then( response => {
        response.json().then(body => {
          this.handleResponse(body, (data) => {
            if(cb) cb(data);
          })
        })
    }).catch( err => {
      console.log('err', err)
    })
  }

  callAuthApi(url, method, options, cb) {
    fetch(
      url,
      { method: method, ...options }
    ).then( response => {
        response.json().then(body => {
          this.handleResponse(body, (data) => {
            if(cb) cb(data);
          })
        })
    }).catch( err => {
      console.log('err', err)
    })
  }

  callLoginApi(url, method, options, cb) {
    fetch(
      url,
      { method: method, ...options }
    ).then( response => {
        response.json().then(body => {
          this.handleLoginResponse(response.headers, body, (data) => {
            if(cb) cb(data);
          })
        })
    }).catch( err => {
      console.log('err', err)
    })
  }
};

export default API;
