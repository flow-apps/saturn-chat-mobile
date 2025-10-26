import { 
  createAudioPlayer,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorderState, 
  AudioRecorder,
  RecorderState
} from "expo-audio";
import { Platform } from "react-native";
import Toast from "react-native-simple-toast";
import * as FileSystem from "expo-file-system";

type StartRecordAudioProps = {
  onDurationUpdate: (duration: number) => any;
};

type FinishRecordAudioProps = {
  audio: AudioRecorder;
  onRecordFinish: (data: OnRecordFinishProps) => any;
};

type OnRecordFinishProps = {
  audioURI: string;
  audioInfos: FileSystem.FileInfo;
  duration: number;
  extension: string;
};

class RecordService {
  public audioRecorder: AudioRecorder;
  public recorderState: RecorderState;
  private recordInterval: number;

  constructor(audioRecorder: AudioRecorder, recorderState: RecorderState) {
    this.audioRecorder = audioRecorder
    this.recorderState = recorderState;
  }

  async start({ onDurationUpdate }: StartRecordAudioProps) {
    try {
      const permission = await AudioModule.getPermissionsAsync();

      if (!permission.granted) {
        const { granted } = await AudioModule.requestPermissionsAsync();
        return;
      }

      if (!this.audioRecorder || this.audioRecorder.getStatus().canRecord)
      this.audioRecorder
        .prepareToRecordAsync()
        .then(async () => {
          this.audioRecorder.record();

          this.recordInterval = setInterval(() => {
            onDurationUpdate(this.recorderState.durationMillis);
          }, 1000);

        });
      return {
        recording: this.audioRecorder,
      };
    } catch (error) {
      new Error(error);
    }
  }

  async finish({ audio, onRecordFinish }: FinishRecordAudioProps) {
    try {
      if (!audio) return;
      
      await audio.stop();
      clearInterval(this.recordInterval);

      if (audio.currentTime <= 1200) {
        return Toast.show("Grave uma mensagem maior que 1 segundo",Toast.SHORT);
      }

      const uri = audio.uri;
      if (!uri) return;

      const extension = Platform.select({
        android: RecordingPresets.LOW_QUALITY.android.extension,
        ios: RecordingPresets.LOW_QUALITY.ios.extension,
      });
      const duration = audio.currentTime;
      const audioInfos = await FileSystem.getInfoAsync(uri);

      if (!audioInfos.exists)
        return;
      
      return await onRecordFinish({
        duration,
        audioURI: uri,
        audioInfos,
        extension: extension || "unknown",
      });
    } catch (error) {
      new Error(error);
    }
  }
}

export { RecordService };
