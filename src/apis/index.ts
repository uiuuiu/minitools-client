import authApi from "./authApi";
import shortLinkApi from "./shortLinkApi";

import { AppDispatch } from '../store';

export default (dispatch: AppDispatch) => ({
  authApi: new authApi(dispatch),
  shortLinkApi: new shortLinkApi(dispatch)
});
