import OneSignal from "react-native-onesignal";
import { navigate } from "../routes/rootNavigation";

interface IConfigureNotifications {
  signed: boolean;
}

const configureNotificationsHandlers = async (signed: boolean) => {
  OneSignal.setNotificationOpenedHandler(({ action, notification }) => {});
};

export { configureNotificationsHandlers };
