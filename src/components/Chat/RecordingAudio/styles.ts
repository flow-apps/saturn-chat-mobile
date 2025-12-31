import styled from "styled-components/native"
import { FilesContainer } from "../../Chat/SelectedFiles/styles";
import fonts from "@styles/fonts";

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
  font-size: 14px;
  font-family: ${fonts["mono-regular"]};
`;