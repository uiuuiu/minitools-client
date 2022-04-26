import authApi from "./authApi";
import shortLinkApi from "./shortLinkApi";

export default (dispatch) => ({
  authApi: new authApi(dispatch),
  shortLinkApi: new shortLinkApi(dispatch)
})