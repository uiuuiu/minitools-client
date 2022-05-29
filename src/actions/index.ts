import commonActions from "./commonActions";

import { AppDispatch } from '../store';

export default (dispatch: AppDispatch) => ({
  commonActions: new commonActions(dispatch),
});
