import styled from "styled-components/native"

export const File = styled.View`
  position: relative;
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  background-color: ${(props) => props.theme.colors.dark_gray}44;
  border-radius: 8px;
`;

export const ImageFile = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

export const OtherFile = styled.View`
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
`;

export const RemoveFileButton = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  position: absolute;
  z-index: 5;
  top: 3px;
  right: 3px;
  background-color: #88888888;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;