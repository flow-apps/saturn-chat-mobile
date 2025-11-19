import styled from "styled-components/native"
import { FlatList } from "react-native"
import { MotiView } from "moti";

export const FilesContainer = styled(MotiView)`
position: relative;
  height: 100px;
  background-color: ${(props) => props.theme.colors.shape};
  padding: 5px;
  border-radius: 10px;
  margin-top: 5px;
`;

export const Files = styled.FlatList.attrs({
  horizontal: true,
  contentContainerStyle: { alignItems: "center" }
})`` as unknown as typeof FlatList;