import styled from "styled-components/native";
import fonts from "../../styles/fonts";
import { FlatList } from "react-native";
import { FilesContainer } from "../../components/Chat/SelectedFiles/styles";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Messages = styled.FlatList.attrs({
  maxToRenderPerBatch: 20,
  initialNumToRender: 20,
})`` as unknown as typeof FlatList;

export const MessageContainer = styled.View`
  flex: 1;
  padding: 0px 5px 0px 5px;
`;

export const FileSendedProgressContainer = styled.View`
  background-color: ${(props) => props.theme.colors.shape};
  padding: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const FileSendedText = styled.Text`
  font-family: ${fonts.heading};
  font-size: 16px;
  color: ${(props) => props.theme.colors.secondary};
  margin-bottom: 10px;
`;

export const RecordingAudioContainer = styled(FilesContainer)`
  height: 40px;
  padding: 5px 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.red};
`;

export const RecordingAudioWrapper = styled.View`
  align-items: center;
`;

export const RecordingAudioText = styled.Text`
  color: ${(props) => props.theme.colors.black};
  font-size: 18px;
  font-family: ${fonts.heading};
`;

export const RecordingAudioDuration = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 18px;
  font-family: ${fonts.text};
  margin-top: 5px;
`;

export const ReplyingMessageContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.shape};
  padding: 10px;
  border-radius: 10px;
  margin-top: 5px;
`;

export const ReplyingMessageContentContainer = styled.View``;

export const ReplyingMessageRemoveContainer = styled.View`
  min-height: 50px;
  width: 50px;
  margin-left: auto;
  align-items: center;
  justify-content: center;
`;

export const ReplyingMessageRemoveButton = styled.TouchableOpacity``;

export const ReplyingMessageTitleWrapper = styled.View``;

export const ReplyingMessageTitle = styled.Text`
  font-family: ${fonts.heading};
  font-size: 12px;
  color: ${(props) => props.theme.colors.primary};
`;

export const ReplyingMessageAuthorNameWrapper = styled.View`
  margin-top: 3px;
`;

export const ReplyingMessageAuthorName = styled.Text`
  font-family: ${fonts["text-bold"]};
  font-size: 12px;
  color: ${(props) => props.theme.colors.secondary};
  margin: 0px 0px 5px 0px;
`;

export const ReplyingMessageWrapper = styled.View`
  width: 95%;
`;

export const ReplyingMessage = styled.Text`
  font-family: ${fonts.text};
  font-size: 12px;
  color: ${(props) => props.theme.colors.black};
`;

export const FormContainer = styled.View`
  padding: 0 12px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.dark_gray};
  padding: 12px;
  border-radius: 15px;
  margin: 10px 0 20px 0;
`;

export const OptionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const OptionsButton = styled.TouchableOpacity`
  margin-right: 10px;
`;

export const SendButton = styled.TouchableOpacity``;

export const MessageInput = styled.TextInput.attrs({
  multiline: true,
})`
  flex: 1;
  font-family: ${fonts.text};
  margin: 0px 10px;
  max-height: 120px;
  color: ${(props) => props.theme.colors.black};
`;

export const AudioContainer = styled.View``;

export const AudioButton = styled.Pressable``;
