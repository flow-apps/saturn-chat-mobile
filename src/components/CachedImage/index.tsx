import React, { memo } from "react";

import _ from "lodash";
import { Image, Cache } from "./styles";
import { ImageProps, StyleProp } from "react-native";

interface CachedImageProps {
  uri: string | null | undefined;
  width?: number | string;
  height?: number | string;
  style?: StyleProp<ImageProps>;
}

const CachedImage: React.FC<CachedImageProps> = ({ uri, style }) => {
  return uri ? (
    <Cache
      source={{ uri, cache: "immutable", priority: "high" }}
      style={style}
    />
  ) : (
    <Image
      source={require("../../assets/avatar-placeholder.png")}
      style={style}
    />
  );
};

export default memo(CachedImage);
