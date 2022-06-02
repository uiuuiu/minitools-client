import commonActions from "./commonActions";

import { AppDispatch } from '../store';

const actions = (dispatch: AppDispatch) => ({
  commonActions: new commonActions(dispatch),
});

export default actions;
