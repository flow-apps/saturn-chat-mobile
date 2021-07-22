import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Container, ImageContainer, Image } from "./styles";
import { Feather } from "@expo/vector-icons";

import {
  GestureEvent,
  PinchGestureHandler,
  PanGestureHandler,
  PinchGestureHandlerEventPayload,
  State,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import ReactNative, { Animated, Easing } from "react-native";
import { HeaderButton } from "../../components/Header/styles";
import { useCallback } from "react";
import { Linking } from "react-native";

const ImagePreview = () => {
  let _baseScale = new Animated.Value(1);
  let _pinchScale = new Animated.Value(1);
  let _scale = new Animated.Value(0.8);
  let _posX = new Animated.Value(0);
  let _posY = new Animated.Value(0);

  let _lastPosX = 0;
  let _lastPosY = 0;
  let _lastScale = 1;
  let _onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: _pinchScale } }],
    { useNativeDriver: false }
  );

  let _onPanGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: _posX, translationY: _posY } }],
    { useNativeDriver: false }
  );

  const route = useRoute();
  const { name, url } = route.params as { name: string; url: string };

  useEffect(() => {
    ReactNative.Image.prefetch(url);
  }, []);

  const onPinchStateChange = (
    event: GestureEvent<PinchGestureHandlerEventPayload>
  ) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const newScale = _lastScale * event.nativeEvent.scale;

      Animated.timing(_scale, {
        toValue: newScale,
        useNativeDriver: false,
        delay: 0,
        easing: Easing.elastic(1),
      }).start(() => {
        _baseScale.setValue(_lastScale);
        _pinchScale.setValue(1);
      });
    }
  };

  const onPanStateChange = (
    event: GestureEvent<PanGestureHandlerEventPayload>
  ) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      Animated.parallel(
        [
          Animated.spring(_posX, {
            toValue: event.nativeEvent.translationX + _lastPosX,
            useNativeDriver: false,
            overshootClamping: true,
          }),

          Animated.spring(_posY, {
            toValue: event.nativeEvent.translationY + _lastPosY,
            useNativeDriver: false,
            overshootClamping: true,
          }),
        ],
        { stopTogether: false }
      ).start();
      _lastPosX = event.nativeEvent.translationX;
      _lastPosY = event.nativeEvent.translationY;
    }
  };

  const downloadFile = useCallback(async () => {
    await Linking.openURL(url);
  }, [name, url]);

  return (
    <>
      <Header title={name} backButton>
        <HeaderButton onPress={downloadFile}>
          <Feather name="download" size={25} color="#fff" />
        </HeaderButton>
      </Header>
      <Container>
        <PinchGestureHandler
          onGestureEvent={onPinchStateChange}
          onHandlerStateChange={_onPinchGestureEvent}
        >
          <PanGestureHandler
            onGestureEvent={onPanStateChange}
            onHandlerStateChange={_onPanGestureEvent}
            minPointers={1}
            maxPointers={1}
          >
            <ImageContainer>
              <Image
                source={{ uri: url }}
                resizeMode="contain"
                style={{
                  transform: [
                    { perspective: 200 },
                    {
                      scale: _scale.interpolate({
                        inputRange: [1, 5],
                        outputRange: [1, 3],
                        extrapolate: "clamp",
                      }),
                    },
                    {
                      translateY: _posY.interpolate({
                        inputRange: [-100, 100],
                        outputRange: [-100, 100],
                        extrapolate: "clamp",
                      }),
                    },
                    {
                      translateX: _posX.interpolate({
                        inputRange: [-100, 100],
                        outputRange: [-100, 100],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                }}
              />
            </ImageContainer>
          </PanGestureHandler>
        </PinchGestureHandler>
      </Container>
    </>
  );
};

export default ImagePreview;
