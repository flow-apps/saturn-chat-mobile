import React from "react";
import loading from "@assets/loading.json";
import { AnimationView, Container, Lottie } from "./styles";

const Loading: React.FC = () => {
  return (
    <Container>
      <AnimationView>
        <Lottie source={loading} autoPlay loop />
      </AnimationView>
    </Container>
  );
};

export default Loading;
