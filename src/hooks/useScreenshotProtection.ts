import { useEffect, useState } from "react";
import * as ScreenCapture from "expo-screen-capture";

export type ConversationType = "GROUP" | "DIRECT";

interface ScreenshotBlockedParams {
  antiPrint: boolean;
  conversationType: ConversationType;
  settingsLoading: boolean;
}

export function isScreenshotBlocked({
  antiPrint,
  conversationType,
  settingsLoading,
}: ScreenshotBlockedParams) {
  if (settingsLoading) {
    return false;
  }

  if (conversationType !== "GROUP" && conversationType !== "DIRECT") {
    return false;
  }

  return antiPrint;
}

export function useScreenshotProtection(
  blocked: boolean,
  settingsLoading: boolean,
  key = "conversation",
) {
  const [screenshotAlertVisible, setScreenshotAlertVisible] = useState(false);

  useEffect(() => {
    if (settingsLoading) {
      return;
    }

    let mounted = true;
    let subscription: ScreenCapture.Subscription | undefined;

    const updateProtection = async () => {
      if (blocked) {
        await ScreenCapture.preventScreenCaptureAsync(key);
        subscription = ScreenCapture.addScreenshotListener(() => {
          if (mounted) {
            setScreenshotAlertVisible(true);
          }
        });
      } else {
        await ScreenCapture.allowScreenCaptureAsync(key);
      }
    };

    updateProtection();

    return () => {
      mounted = false;
      subscription?.remove();
      ScreenCapture.allowScreenCaptureAsync(key);
    };
  }, [blocked, key, settingsLoading]);

  return {
    screenshotAlertVisible,
    dismissScreenshotAlert: () => setScreenshotAlertVisible(false),
  };
}
