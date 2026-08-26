import styled from "styled-components/native";
import fonts from "@styles/fonts";
import darken from "polished/lib/color/darken";

export const Container = styled.View`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 4px;
  gap: 10px;
`;

export const QuestionText = styled.Text`
  font-size: 15px;
  font-family: ${fonts["text-bold"]};
  color: ${({ theme }) => theme.colors.light_heading || "#FFF"};
`;

export const SubtitleText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.dark_heading || "#9CA3AF"};
  margin-top: -6px;
  font-family: ${fonts.text}
`;

export const OptionsContainer = styled.View`
  gap: 8px;
  margin-top: 4px;
`;

export const OptionButton = styled.TouchableOpacity`
  position: relative;
  background-color: ${({ theme }) => darken(0.03, theme.colors.shape) || "#374151"};
  border-radius: 10px;
  padding: 10px 12px;
  overflow: hidden;
`;

export const OptionContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

export const OptionInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex: 1;
  margin-right: 8px;
`;

export const OptionText = styled.Text<{ isSelected: boolean }>`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.light_heading || "#FFF"};
  font-family: ${({ isSelected }) =>
    isSelected ? fonts["text-bold"] : fonts.text || "sans-serif"};
  font-weight: ${({ isSelected }) => (isSelected ? "600" : "normal")};
`;

export const PercentageText = styled.Text`
  font-size: 12px;
  font-family: ${fonts["text-bold"]};
  color: ${({ theme }) => theme.colors.dark_heading || "#9CA3AF"};
`;

export const TotalVotesText = styled.Text`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.dark_heading || "#9CA3AF"};
  text-align: right;
  margin-top: 2px;
  font-family: ${fonts.text}
`;