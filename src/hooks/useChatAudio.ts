import { useState } from "react";
import { AudioModule, RecordingPresets, useAudioRecorder } from "expo-audio";
import SimpleToast from "react-native-simple-toast";
import crashlytics from "@react-native-firebase/crashlytics";

export const useChatAudio = (
  onSendAudio: (duration: number, uri: string) => Promise<void>,
) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout>();

  const audioRecorder = useAudioRecorder({
    ...RecordingPresets.HIGH_QUALITY,
    isMeteringEnabled: true,
  });

  const recordAudio = async (hasMessage: boolean) => {
    if (hasMessage || isRecording) return;
    try {
      const permission = await AudioModule.getRecordingPermissionsAsync();
      if (!permission.granted) {
        await AudioModule.requestRecordingPermissionsAsync();
        return;
      }

      await audioRecorder.prepareToRecordAsync({
        ...RecordingPresets.HIGH_QUALITY,
        isMeteringEnabled: true,
      });
      audioRecorder.record();

      const timer = setInterval(() => {
        setAudioDuration(audioRecorder.getStatus().durationMillis);
      }, 500);

      setRecordingInterval(timer);
      setIsRecording(true);
    } catch (error) {
      crashlytics().recordError(error as Error, "Record Audio Error");
    }
  };

  const stopRecordAudioAndSubmit = async () => {
    if (!isRecording) return;
    const duration = audioRecorder.getStatus().durationMillis;

    if (duration <= 1200) {
      return SimpleToast.show(
        "Grave uma mensagem maior que 1 segundo",
        SimpleToast.SHORT,
      );
    }

    await audioRecorder.stop();
    setAudioDuration(0);
    setIsRecording(false);
    clearInterval(recordingInterval);
    setRecordingInterval(undefined);

    if (audioRecorder.uri) {
      await onSendAudio(duration, audioRecorder.uri);
    }
  };

  return { isRecording, audioDuration, recordAudio, stopRecordAudioAndSubmit };
};
