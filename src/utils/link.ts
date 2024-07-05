import * as ExpoLinking from "expo-linking";
import { Linking } from "react-native";
import { ArrayUtils } from "./array";
import URLParse from "url-parse";
import SimpleToast from "react-native-simple-toast";
import RNBrowser from "react-native-inappbrowser-reborn";
import config from "@config";

class LinkUtils {
  isSaturnChatLink(url: string) {
    if (!url) return false;

    const { hostname } = new URLParse(url.replace("www.", ""), true);

    return config.SATURN_CHAT_DOMAINS.includes(hostname);
  }

  hasSaturnChatDeepLinkInApp(path: string) {
    const arrayUtils = new ArrayUtils();
    const paths = ["invite"];
    const separatedPath = path.split("/").filter(Boolean).shift().toLowerCase();

    return arrayUtils.has(paths, (p) => separatedPath === p);
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
      const { path, queryParams } = ExpoLinking.parse(url);

      if (this.hasSaturnChatDeepLinkInApp(path)) {
        const deepURL = ExpoLinking.createURL(path, {
          queryParams,
        });

        if (await ExpoLinking.canOpenURL(deepURL)) {
          await ExpoLinking.openURL(deepURL);
          return;
        }
      }
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
