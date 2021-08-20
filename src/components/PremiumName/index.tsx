import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Container, EmblemContainer, Name, NameContainer } from "./styles";
import { useTheme } from "styled-components";
import fonts from "../../styles/fonts";
import EmblemModal from "../Modals/EmblemModal";

export interface PremiumNameProps {
  name: string;
  nameSize?: number;
  fontFamily?: keyof typeof fonts;
  emblemSize?: number;
  color?: string;
  align?: "center" | "right"
  hasPremium?: boolean;
}

const PremiumName = ({
  name,
  emblemSize,
  nameSize,
  color,
  fontFamily,
  align,
  hasPremium
}: PremiumNameProps) => {
  const { colors } = useTheme();
  const [premium, isPremium] = useState(true)
  const [showEmblemDetails, setShowEmblemDetails] = useState(false)

  const handleEmblemDetails = () => {
    setShowEmblemDetails(old => !old)
  }

  return (
    <>
      <EmblemModal premium={premium} close={() => setShowEmblemDetails(false)} visible={showEmblemDetails} />
      <Container
        style={{
          justifyContent: align === "center" ? "center" : "flex-start"
        }}
      >
        <EmblemContainer onPress={handleEmblemDetails} isPremium={hasPremium || premium || false}>
          <FontAwesome name="star" size={emblemSize || (nameSize || 16) + 4} color={colors.secondary} />
        </EmblemContainer>
        <NameContainer>
          <Name 
            name={name} 
            nameSize={nameSize} 
            color={color} 
            fontFamily={fontFamily}
          >
            {name}
          </Name>
        </NameContainer>
      </Container>
    </>
  );
};

export default PremiumName;
