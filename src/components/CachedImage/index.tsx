import React, { memo } from "react";

import { Image, Cache } from "./styles";
import { ImageProps, ImageSourcePropType, StyleProp } from "react-native";
import { SvgCssUri } from "react-native-svg/src/css";

interface CachedImageProps {
  uri: string | null | undefined;
  width?: number;
  height?: number;
  style?: StyleProp<ImageProps>;
  placeholder?: ImageSourcePropType;
}

const CachedImage: React.FC<CachedImageProps> = ({
  uri,
  width,
  height,
  placeholder,
  style,
}) => {
  if (uri && uri.includes(".svg")) {
    return (
      <SvgCssUri
        uri={uri}
        style={style}
        width={width || 0}
        height={height || 0}
      />
    );
  }
  

  return uri ? (
    <Cache
      source={{ uri, cache: "immutable", priority: "high" }}
      style={style}
    />
  ) : (
    <Image
      source={placeholder || require("@assets/avatar-placeholder.png")}
      style={style}
      width={width || 0}
      height={height || 0}
    />
  );
};

export default memo(CachedImage);
