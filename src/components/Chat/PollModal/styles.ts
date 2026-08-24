import styled from "styled-components/native";
import fonts from "@styles/fonts";

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: flex-end;
`;

export const ModalContent = styled.View`
  background-color: ${({ theme }) => theme.colors.background || "#1F2937"};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  max-height: 85%;
  padding: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-family: ${fonts["text-bold"]};
  color: ${({ theme }) => theme.colors.light_heading || "#FFF"};
`;

export const CloseButton = styled.TouchableOpacity``;

export const Label = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.dark_heading || "#9CA3AF"};
  margin-bottom: 6px;
`;

export const Input = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.shape || "#374151"};
  color: ${({ theme }) => theme.colors.light_heading || "#FFF"};
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 15px;
  font-family: ${fonts.text || "sans-serif"};
  margin-bottom: 16px;
`;

export const OptionRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

export const OptionInput = styled.TextInput`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape || "#374151"};
  color: ${({ theme }) => theme.colors.light_heading || "#FFF"};
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 15px;
  font-family: ${fonts.text || "sans-serif"};
`;

export const RemoveOptionButton = styled.TouchableOpacity``;

export const AddOptionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
  margin-bottom: 16px;
`;

export const AddOptionText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${fonts["text-bold"]};
`;

export const MultipleChoiceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.light_gray || "#374151"};
  margin-bottom: 20px;
`;

export const MultipleChoiceText = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.light_heading || "#FFF"};
  font-family: ${fonts.text || "sans-serif"};
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 12px 0;
  border-radius: 12px;
  align-items: center;
  margin-bottom: 12px;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-family: ${fonts["text-bold"]};
  font-size: 16px;
`;
