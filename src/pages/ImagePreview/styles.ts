import styled from "styled-components/native";
import CachedImage from "../../components/CachedImage";

export const Container = styled.View`
  flex: 1;
  background-color: #111;
  z-index: -5;
`;

export const ImageContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Image = styled(CachedImage)`
  width: 100%;
  height: 100%;
`;

