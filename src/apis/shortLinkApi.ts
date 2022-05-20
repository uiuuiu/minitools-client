import API from "../API";
import { apiResponse, PaginationData } from "../types/api";
import { RedirectLinkData, ShortLinkUpdateFormData, ShortLinkData } from "../types/data/ShortLinkData";
import { ShortLinkFormData } from "../types/data/ShortLinkData";
const queryString = require('query-string');

export const actions = {
  SHORTLINK_LIST: 'shortLink/list',
  SHORTLINK_REDIRECT: 'shortLink/redirect',
  SHORTLINK_CREATE: 'shortLink/create',
  SHORTLINK_ACTIVE: 'shortLink/active',
}

class shortLinkApi extends API {

  getShortLinks({ page, limit, search, extraOpts = {} }: PaginationData) {
    let query: PaginationData = { page: page, limit: limit }
    if (search) {
      query['search'] = search
    }
    const url = queryString.stringifyUrl({ url: 'api/v1/shorted_links', query: query });

    this.callAuthApi(url, 'GET', { ...this.authRequestOpts, ...extraOpts }, (body: apiResponse<ShortLinkData[]>) => {
      if (body.meta.status == 200) {
        this.dispatch({ type: actions.SHORTLINK_LIST, data: body["data"], meta: body["meta"] })
      } else {
        this.notify("Cannot get items now")
      }
    })
  }

  getRedirectLink(urlKey: string) {
    const url = queryString.stringifyUrl({ url: `r/${urlKey}` });
    this.callAuthApi(url, 'GET', { ...this.authRequestOpts }, (body: apiResponse<RedirectLinkData>) => {
      if (body.meta.status == 200) {
        this.dispatch({ type: actions.SHORTLINK_REDIRECT, data: body["data"] })
      } else {
        this.notify("Cannot get item now")
      }
    })
  }

  createShortLink({ data, extraOpts = {} }: { data: ShortLinkFormData, extraOpts?: {} }) {
    const body = data;
    const url = 'api/v1/shorted_links';

    this.callAuthApi(url, 'POST', { body: JSON.stringify(body), ...this.authRequestOpts, ...extraOpts }, (body: apiResponse<ShortLinkData>) => {
      if (body.meta.status == 200) {
        this.dispatch({ type: actions.SHORTLINK_CREATE, data: body.data })
        this.notify("Url was shortern")
      } else {
        this.notify((body.meta.message as Array<string>).join("\n"))
      }
    })
  }

  createPublicShortLink({ data, extraOpts = {}, cb }: { data: ShortLinkFormData, extraOpts?: {}, cb: (data: ShortLinkData) => void }) {
    const body = data;
    const url = 'api/v1/public_shorted_links';

    this.callAuthApi(url, 'POST', { body: JSON.stringify(body), ...this.authRequestOpts, ...extraOpts }, (body: apiResponse<ShortLinkData>) => {
      if (body.meta.status == 200) {
        this.dispatch({ type: actions.SHORTLINK_CREATE, data: body.data })
        this.notify("Url was shortern")
        if (cb) cb(body.data);
      } else {
        this.notify((body.meta.message as Array<string>).join("\n"))
      }
    })
  }

  updateShortLink({ id, data, extraOpts = {} }: { id: number, data: ShortLinkUpdateFormData, extraOpts?: {} }) {
    const body = data;
    const url = `api/v1/shorted_links/${id}`;

    this.callAuthApi(url, 'PUT', { body: JSON.stringify(body), ...this.authRequestOpts, ...extraOpts }, (body: apiResponse<ShortLinkData>) => {
      if (body.meta.status == 200) {
        this.dispatch({ type: actions.SHORTLINK_ACTIVE, data: body.data })
        this.notify(`Url was set to ${body.data.active ? 'active' : 'deactive'}`)
      } else {
        this.notify((body.meta.message as Array<string>).join("\n"))
      }
    })
  }
};

export default shortLinkApi;
