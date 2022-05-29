import { AppDispatch } from "../store";

export default class Actions {
  dispatch: AppDispatch

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }
};
