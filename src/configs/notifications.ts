import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { MessageData } from "../../@types/interfaces";
import { navigate } from "../routes/rootNavigation";
import { getWebsocket } from "../services/websocket";


interface IConfigureNotifications {
  signed: boolean
}

const configureNotificationsListener = async (signed: boolean) => {

  await Notifications.setNotificationCategoryAsync("message", [
    {
      identifier: "markAsRead",
      buttonTitle: "Marcar como lido",
    },
    {
      identifier: "replyMessage",
      buttonTitle: "Responder",
      textInput: {
        placeholder: "Sua mensagem...",
        submitButtonTitle: "enviar",
      },
    },
  ]);

  Notifications.addNotificationResponseReceivedListener(async (res) => {
    await Notifications.dismissNotificationAsync(res.notification.request.identifier)
    const notificationData = res.notification.request.content
      .data as any as MessageData;
    const groupID = notificationData.group.id;

    if (res.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER) {
      return navigate("Chat", { id: groupID });
    }

    if (!signed) return;

    const socket = getWebsocket();
    socket.emit("connect_in_chat", groupID);

    if (res.actionIdentifier === "replyMessage") {
      const msg = res.userText;
      const notification = res.notification.request.identifier;

      socket?.emit("new_user_message", { message: msg });
      await Notifications.dismissNotificationAsync(notification);
    } else if (res.actionIdentifier === "markAsRead") {
      const messageID = res.notification.request.content.data.id as string;

      await Notifications.dismissNotificationAsync(
        res.notification.request.identifier
      );
      socket?.emit("set_read_message", messageID);
    }
  });
}

const configureNotifications = async (options: IConfigureNotifications) => {

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    }),
  });

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Geral",
      importance: Notifications.AndroidImportance.DEFAULT,
      lightColor: "#0088FF",
      groupId: "default",
    });

    await Notifications.setNotificationChannelAsync("messages", {
      name: "Mensagens",
      enableVibrate: true,
      enableLights: true,
      importance: Notifications.AndroidImportance.MAX,
      lightColor: "#0088FF",
      groupId: "messages",
    });
  }

  await configureNotificationsListener(options.signed)
}

export { configureNotifications }

