import React, { memo } from "react";
import Animated, { FadeInUp } from "react-native-reanimated";

interface AnimatedMessageProps {
  children: React.ReactNode;
  index: number;
  messageId: string;
}

export const AnimatedMessage: React.FC<AnimatedMessageProps> = memo(
  ({ children, index }) => {
    const delay = index < 6 ? index * 30 : 0;

    return (
      <Animated.View
        entering={FadeInUp.duration(180).delay(delay).springify().damping(18)}
      >
        {children}
      </Animated.View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.messageId === nextProps.messageId &&
      prevProps.index === nextProps.index
    );
  },
);
