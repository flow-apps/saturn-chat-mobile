import React, { memo, useState } from "react";

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
  const [hasError, setHasError] = useState(false);

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

  const placeholderImage =
    placeholder || require("@assets/avatar-placeholder.png");

  if (hasError || !uri) {
    return (
      <Image source={placeholderImage} style={[{ width, height }, style]} />
    );
  }

  return (
    <Cache
      source={{ uri, cache: "immutable", priority: "high" }}
      style={[{ width, height }, style]}
      fallback
      onError={() => setHasError(true)}

    />
  );
};

export default memo(CachedImage);
