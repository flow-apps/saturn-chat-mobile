import React, { memo, useState } from "react";

import { Image, Cache } from "./styles";
import { ImageProps, ImageSourcePropType, StyleProp } from "react-native";
import { SvgCssUri } from "react-native-svg/src/css";
import { useAuth } from "@contexts/auth";
import FastImage from "react-native-fast-image";

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
  const { getHeadersForAuthFiles } = useAuth();

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

  const placeholderImage = placeholder || require("@assets/placeholder.jpg");

  if (hasError || !uri) {
    return (
      <Image source={placeholderImage} style={[{ width, height }, style]} />
    );
  }

  return (
    <Cache
      source={{
        uri,
        headers: getHeadersForAuthFiles(uri),
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.immutable,
      }}
      style={[{ width, height }, style]}
      fallback
      onError={() => setHasError(true)}
      resizeMode="center"
    />
  );
};

export default memo(CachedImage);
