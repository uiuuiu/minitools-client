import { NotificationData } from "../types/data/NotificationData";
import Actions from "./actionsBase";

export const actions = {
  ACTIONS_COMMON_APPS_SELECTED: 'actions/common/apps_selected',
  ACTIONS_COMMON_ADD_NOTIFICATION: 'actions/common/add_notification'
}

class commonActions extends Actions {
  selectApp(appName: string) {
    this.dispatch({ type: actions.ACTIONS_COMMON_APPS_SELECTED, data: appName })
  }

  addNotification({ data }: { data: NotificationData }) {
    this.dispatch({ type: actions.ACTIONS_COMMON_ADD_NOTIFICATION, data: data })
  }
};

export default commonActions;
