import { useEffect, useState } from "react";
import { AudioModule, RecordingPresets, useAudioRecorder } from "expo-audio";
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

    await audioRecorder.stop();
    setAudioDuration(0);
    setIsRecording(false);
    clearInterval(recordingInterval);
    setRecordingInterval(undefined);

    if (duration > 1200 && audioRecorder.uri) {
      await onSendAudio(duration, audioRecorder.uri);
    }
  };

  const cancelRecordAudio = async () => {
    if (!isRecording) return;
    try {
      await audioRecorder.stop();
    } catch (error) {
      // Ignora erro caso já tenha parado
    } finally {
      setAudioDuration(0);
      setIsRecording(false);
      if (recordingInterval) clearInterval(recordingInterval);
      setRecordingInterval(undefined);
    }
  };

  useEffect(() => {
    return () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
      }
    };
  }, [recordingInterval]);

  return {
    isRecording,
    audioDuration,
    recordAudio,
    stopRecordAudioAndSubmit,
    cancelRecordAudio,
  };
};
