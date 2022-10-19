import OneSignal from "react-native-onesignal";
import { NotificationsTypes } from "../../@types/enums";
import { navigate } from "../routes/rootNavigation";
import { LinkUtils } from "../utils/link";

interface NotificationDataType {
  type: string;
  open_in_app?: boolean;
  open_url_on_click?: string;
  [key: string]: any;
}

const configureNotificationsHandlers = async (signed: boolean) => {
  OneSignal.setNotificationOpenedHandler(async ({ action, notification }) => {
    if (action && signed) {
      const { openLink } = new LinkUtils();
      const data = notification.additionalData as NotificationDataType;

      if (data.open_in_app) {
        if (data.open_url_on_click) {
          await openLink(data.open_url_on_click);
        }
        if (data.type === NotificationsTypes.CHAT_MESSAGE) {
          navigate("Chat", { id: data.group_id });
        }
      }
    }
  });
};

export { configureNotificationsHandlers, OneSignal };
