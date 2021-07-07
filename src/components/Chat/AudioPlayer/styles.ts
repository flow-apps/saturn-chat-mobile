import styled from "styled-components/native";
import fonts from "../../../styles/fonts";

interface PlayerProps {
  loading?: boolean;
}

export const Container = styled.View<PlayerProps>`
  min-width: 100%;
  padding: 8px 15px;
  background-color: ${(props) => props.theme.colors.shape};
  border: 1px solid ${(props) => props.theme.colors.secondary};
  border-radius: 12px;
`;

export const AudioContainerWrapper = styled.View`
  align-items: center;
  justify-content: space-around;
`;

export const AudioControllerContainer = styled.View`
  flex-direction: row;
`;

export const AudioController = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const SeekBarContainer = styled.View`
  flex: 1;
`;

export const SeekBar = styled.Slider`
  flex: 1;
`;

export const AudioInfosContainer = styled.View``;

export const AudioDurationContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 3px;
`;

export const AudioDuration = styled.Text`
  font-family: ${fonts.code};
  font-size: 16px;
  color: ${(props) => props.theme.colors.black};
`;
