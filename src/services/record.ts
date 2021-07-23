import { Audio } from "expo-av";
import { Platform } from "react-native";
import Toast from "react-native-simple-toast";
import * as FileSystem from "expo-file-system";

type StartRecordAudioProps = {
  onDurationUpdate: (duration: number) => any;
};

type FinishRecordAudioProps = {
  audio: Audio.Recording
  onRecordFinish: (data: OnRecordFinishProps) => any;
};

type OnRecordFinishProps = {
  audioURI: string;
  audioInfos: FileSystem.FileInfo;
  duration: number;
  extension: string;
};

class RecordService {
  private recording: Audio.Recording;

  constructor() {
    this.recording = new Audio.Recording();
  }

  async start({ onDurationUpdate }: StartRecordAudioProps) {
    try {
      const permission = await Audio.getPermissionsAsync();

      if (!permission.granted) {
        const { granted } = await Audio.requestPermissionsAsync();

        if (!granted) return;
      }

      this.recording
        .prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
        .then(async () => {
          await this.recording.startAsync();
          
          this.recording.setOnRecordingStatusUpdate(status => {
            onDurationUpdate(status.durationMillis)
          })
        })
      return {
        recording: this.recording,
      };
    } catch (error) {
      new Error(error);
    }
  }

  async finish({
    audio,
    onRecordFinish,
  }: FinishRecordAudioProps) {
    try {
      if (!audio) return;
      await audio.stopAndUnloadAsync();

      if (audio._finalDurationMillis < 1500) {
        return Toast.show("Aperte e segure para gravar");
      }

      const uri = audio.getURI();
      if (!uri) return;

      const extension = Platform.select({
        android: Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY.android.extension,
        ios: Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY.ios.extension,
      });
      const duration = audio._finalDurationMillis;
      const audioInfos = await FileSystem.getInfoAsync(uri);      

      return await onRecordFinish({
        audioInfos,
        duration,
        audioURI: uri,
        extension: extension || "unknown",
      })
    } catch (error) {
      new Error(error);
    }
  }
}

export { RecordService };