import styled from "styled-components/native";
import fonts from "../../styles/fonts";
import { FlatList } from "react-native";
import { FilesContainer } from "../../components/Chat/SelectedFiles/styles";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Messages = styled.FlatList.attrs({
  inverted: true,
  maxToRenderPerBatch: 30,
  initialNumToRender: 30,
})`` as unknown as typeof FlatList;

export const MessageContainer = styled.View`
  flex: 1;
  padding: 0px 5px 0px 5px;
`;

export const FileSendedProgressContainer = styled.View`
  background-color: ${props => props.theme.colors.shape};
  padding: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const FileSendedText = styled.Text`
  font-family: ${fonts.heading};
  font-size: 16px;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 10px;
`

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

export const EmojiButton = styled.TouchableOpacity``;

export const OptionsButton = styled.TouchableOpacity`
  margin-right: 10px;
`;

export const SendButton = styled.TouchableOpacity`
`;

export const MessageInput = styled.TextInput.attrs({
  multiline: true,
  maxLength: 500,
  
})`
  flex: 1;
  font-family: ${fonts.text};
  margin: 0px 10px;
  max-height: 120px;
  color: ${(props) => props.theme.colors.black};
`;

export const EmojiBoardContainer = styled.View`
  margin-bottom: 10px;
`;

export const AudioContainer = styled.View``;

export const AudioButton = styled.TouchableOpacity`
`;
