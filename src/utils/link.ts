import RNBrowser from "react-native-inappbrowser-reborn";
import secrets from "../secrets.json";
import URLParse from "url-parse";
import * as ExpoLinking from "expo-linking"
import { Linking } from "react-native";
import SimpleToast from "react-native-simple-toast";
import { navigate } from "../routes/rootNavigation";

class LinkUtils {
  isSaturnChatLink(url: string) {
    if (!url) return false;

    const { hostname } = new URLParse(url.replace("www.", ""), true);

    return secrets.SaturnChatDomains.includes(hostname);
  }

  getAllLinksFromText(text: string) {
    if (!text) {
      return [];
    }

    return (
      text.match(
        /\b((https?):\/\/|(www)\.)[-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/gi
      ) || []
    );
  }

  async openLink(url: string) {
    const isSaturnChatLink = this.isSaturnChatLink(url);

    if (isSaturnChatLink) {
      const { hostname, path, queryParams } = ExpoLinking.parse(url);
      const deepURL = ExpoLinking.createURL(path, {
        queryParams,
      })

      await ExpoLinking.openURL(deepURL)
      
      return
    }

    try {
      const isAvailable = await RNBrowser.isAvailable();

      if (!isAvailable) {
        if (await Linking.canOpenURL(url)) {
          return await Linking.openURL(url);
        } else {
          SimpleToast.show("Não é possível abrir o link");
          return;
        }
      }

      await RNBrowser.open(url, {
        toolbarColor: "#0088FF",
        secondaryToolbarColor: "#FF9D00",
        modalEnabled: true,
        showTitle: true,
      });
    } catch (error) {
      return await Linking.openURL(url);
    }
  }
}

export { LinkUtils };
