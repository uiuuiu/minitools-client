import API from "../API";
const queryString = require('query-string');

class shortLinkApi extends API {

  getShortLinks({page, limit, search, extraOpts={}}) {
    let query = { page: page, limit: limit }
    if (search) {
      query['search'] = search
    }
    const url = queryString.stringifyUrl({url: 'api/v1/shorted_links', query: query});

    this.callAuthApi(url, 'GET', {...this.authRequestOpts, ...extraOpts}, (body) => {
      if (body.meta.status == 200) {
        this.dispatch({ type: 'shortLink/list', data: body["data"], meta: body["meta"] })
      } else {
        this.notify("Cannot get items now")
      }
    })
  }

  getRedirectLink(urlKey) {
    const url = queryString.stringifyUrl({url: `r/${urlKey}`});
    this.callAuthApi(url, 'GET', {...this.authRequestOpts}, (body) => {
      if (body.meta.status == 200) {
        this.dispatch({ type: 'shortLink/redirect', data: body["data"]})
      } else {
        this.notify("Cannot get item now")
      }
    })
  }

  createShortLink({data, extraOpts={}}) {
    const body = data;
    const url = 'api/v1/shorted_links';

    this.callAuthApi(url, 'POST', { body: JSON.stringify(body), ...this.authRequestOpts, ...extraOpts }, (body) => {
      if (body.meta.status == 200) {
        this.dispatch({ type: 'shortLink/create', data: body.data })
        this.notify("Url was shortern")
      } else {
        this.notify(body.meta.message.join("\n"))
      }
    })
  }

  updateShortLink({id, data, extraOpts={}}) {
    const body = data;
    const url = `api/v1/shorted_links/${id}`;

    this.callAuthApi(url, 'PUT', { body: JSON.stringify(body), ...this.authRequestOpts, ...extraOpts }, (body) => {
      if (body.meta.status == 200) {
        this.dispatch({ type: 'shortLink/active', data: body.data })
        this.notify(`Url was set to ${ body.data.active ? 'active' : 'deactive' }`)
      } else {
        this.notify(body.meta.message.join("\n"))
      }
    })
  }
};

export default shortLinkApi;
