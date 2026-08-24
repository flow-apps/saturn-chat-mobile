import fonts from "@styles/fonts";
import styled from "styled-components/native";

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

export const FormContainer = styled.View`
  margin-bottom: 10px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background: ${(props) => props.theme.colors.shape};
  border: 1px solid ${(props) => props.theme.colors.dark_gray};
  padding: 15px;
  border-radius: 50px;
  margin-top: 10px;
`;

export const OptionsContainer = styled.View`
  flex-direction: row;
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

export const AdBannerWrapper = styled.View`
  padding: 10px;
`;

export const NoSendMessageContainer = styled.View`
  background-color: ${(props) => props.theme.colors.shape};
  width: 100%;
  padding: 20px 10px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

export const NoSendMessageText = styled.Text`
  text-align: center;
  font-family: ${fonts.quote};
  color: ${(props) => props.theme.colors.black};
`;

export const NoSendMessageTextFeature = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
`;

export const AudioRecordingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.shape || "#1E1E1E"};
  border-radius: 24px;
  padding: 8px 16px;
  min-height: 48px;
`;

export const CancelAudioButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const SendAudioButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  padding: 8px;
  align-items: center;
  justify-content: center;
`;

export const PlusButton = styled.TouchableOpacity`
  padding-horizontal: 8px;
  justify-content: center;
  align-items: center;
`;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

export const ModalContent = styled.View`
  background-color: ${({ theme }) => theme.colors.background || "#1F2937"};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  gap: 16px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

export const DragIndicator = styled.View`
  width: 40px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.dark_heading || "#4B5563"};
  border-radius: 2px;
`;

export const ActionItemButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
`;

export const ActionIconContainer = styled.View<{ bgColor?: string }>`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${({ bgColor }) => bgColor || "#ffffff1a"};
  align-items: center;
  justify-content: center;
`;

export const ActionText = styled.Text`
  font-size: 16px;
  font-family: ${fonts["text-bold"]};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black || "#FFF"};
`;