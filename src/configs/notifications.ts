import OneSignal from "react-native-onesignal";

const configureNotificationsHandlers = async (signed: boolean) => {
  OneSignal.setNotificationOpenedHandler(({ action, notification }) => {});
};

export { configureNotificationsHandlers, OneSignal };
