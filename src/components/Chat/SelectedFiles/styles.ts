import styled from "styled-components/native"
import { FlatList } from "react-native"

export const FilesContainer = styled.View`
  height: 100px;
  background-color: ${(props) => props.theme.colors.shape};
  padding: 5px;
  border-radius: 10px;
`;

export const Files = styled.FlatList.attrs({
  horizontal: true,
  contentContainerStyle: { alignItems: "center" }
})`` as unknown as typeof FlatList;