import RNBrowser from "react-native-inappbrowser-reborn";
import { Linking } from "react-native";

class LinkUtils {
  async openLink(url: string) {
    try {
      const isAvailable = await RNBrowser.isAvailable();

      if (!isAvailable) {
        if (await Linking.canOpenURL(url)) return await Linking.openURL(url);
      }

      await RNBrowser.open(url, {
        modalEnabled: true,
        toolbarColor: "#0088FF",
        secondaryToolbarColor: "#FF9D00",
      });
    } catch (error) {
      return await Linking.openURL(url);
    }
  }

  getAllLinksFromText(text: string) {
    if (!text) {
      return [];
    }

    return text.match(
      /\b((https?):\/\/|(www)\.)[-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/gi
    ) || [];
  }
}

export { LinkUtils };
