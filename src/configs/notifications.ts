import { OneSignal } from "react-native-onesignal";
import { NotificationsTypes } from "@type/enums";
import { getCurrentRoute, navigate, setParams } from "../routes/rootNavigation";
import { LinkUtils } from "@utils/link";

interface NotificationDataType {
  type: string;
  open_in_app?: boolean;
  open_url_on_click?: string;
  [key: string]: any;
}

const configureNotificationsHandlers = async (signed: boolean) => {
  OneSignal.Notifications.addEventListener(
    "click",
    async ({ notification }) => {
      if (signed && notification) {
        const { openLink } = new LinkUtils();
        const data = notification.additionalData as NotificationDataType;

        if (data.open_in_app) {
          if (data.open_url_on_click) {
            await openLink(data.open_url_on_click);
          }
          if (data.type === NotificationsTypes.CHAT_MESSAGE) {
            const isDM = data.group_type === "DIRECT";
            const name = data.friend_name;
            const currentScreenName = getCurrentRoute().name;

            if (currentScreenName === "Chat") {
              setParams({
                id: data.group_id,
                name: isDM ? name : undefined,
                friendId: isDM ? data.friend_id : undefined,
              });
            } else {
              navigate("Chat", {
                id: data.group_id,
                name: isDM ? name : undefined,
                friendId: isDM ? data.friend_id : undefined,
              });
            }
          }
        }
      }
    }
  );
};

export { configureNotificationsHandlers, OneSignal };
