import styled from "styled-components/native";
import fonts from "../../styles/fonts";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const KeyBoardAvoid = styled.KeyboardAvoidingView``;

export const ChatContainer = styled.FlatList`
  flex: 1;
  margin-bottom: -5px;
  padding: 20px 5px 0px 5px;
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
  margin: 10px 0 25px 0;
`;

export const OptionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const EmojiButton = styled.TouchableOpacity``;

export const OptionsButton = styled.TouchableOpacity`
  margin-right: 10px;
`;

export const SendButton = styled.TouchableOpacity``;

export const MessageInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  font-family: ${fonts.text};
  margin: 0px 10px;
  max-height: 120px;
  color: ${(props) => props.theme.colors.black};
`;

export const MessageContainer = styled.View`
  flex: 1;
  padding: 0px 5px 0px 5px;
`;

export const DateSeparatorContainer = styled.View`
  align-items: center;
  margin: 20px auto;
  background-color: ${(props) => props.theme.colors.light_secondary};
  padding: 5px 15px;
  border-radius: 30px;
`;

export const DateSeparator = styled.Text`
  font-size: 12px;
  font-family: ${fonts.code};
  color: #000;
`;
