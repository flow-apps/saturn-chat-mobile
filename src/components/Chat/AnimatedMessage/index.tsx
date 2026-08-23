import React from "react";
import { MotiView } from "moti";

interface AnimatedMessageProps {
  children: React.ReactNode;
  index: number;
}

export const AnimatedMessage: React.FC<AnimatedMessageProps> = ({
  children,
  index,
}) => {
  const delay = Math.min(index * 40, 320);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: 200,
        delay,
      }}
    >
      {children}
    </MotiView>
  );
};