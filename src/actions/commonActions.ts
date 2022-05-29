import Actions from "./actionsBase";

export const actions = {
  ACTONS_COMMON_APPS_SELECTED: 'actions/common/apps_selected'
}

class commonActions extends Actions {
  selectApp(appName: string) {
    this.dispatch({ type: actions.ACTONS_COMMON_APPS_SELECTED, data: appName })
  }
};

export default commonActions;
