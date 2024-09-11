import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Container,
  EmblemContainer,
  Name,
  NameContainer,
  NicknameContainer,
  NicknameText,
} from "./styles";
import { useTheme } from "styled-components";
import fonts from "@styles/fonts";
import EmblemModal from "@components/Modals/EmblemModal";
import { MotiView } from "moti";
import { usePremium } from "@contexts/premium";

export interface PremiumNameProps {
  name: string;
  nameSize?: number;
  fontFamily?: keyof typeof fonts;
  emblemSize?: number;
  color?: string;
  align?: "center" | "right";
  hasPremium?: boolean;
  nickname?: string;
  showNickname?: boolean;
}

const PremiumName = ({
  name,
  nickname,
  emblemSize,
  nameSize,
  color,
  fontFamily,
  align,
  hasPremium,
  showNickname,
}: PremiumNameProps) => {
  const { colors } = useTheme();
  const { isPremium } = usePremium();
  const [showEmblemDetails, setShowEmblemDetails] = useState(false);

  const handleEmblemDetails = () => {
    setShowEmblemDetails((old) => !old);
  };

  return (
    <>
      <EmblemModal
        premium={isPremium}
        close={() => setShowEmblemDetails(false)}
        visible={showEmblemDetails}
      />
      <Container
        style={{
          justifyContent: align === "center" ? "center" : "flex-start",
        }}
      >
        <MotiView
          from={{
            opacity: 0.8,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            type: "timing",
            duration: 1500,
            loop: true,
          }}
        >
          <EmblemContainer onPress={handleEmblemDetails} isPremium={hasPremium}>
            <FontAwesome
              name="star"
              size={emblemSize || (nameSize || 16) + 4}
              color={colors.secondary}
            />
          </EmblemContainer>
        </MotiView>
        <NameContainer>
          <Name
            name={name}
            nameSize={nameSize}
            color={color}
            fontFamily={fontFamily}
          >
            {name}
          </Name>
          {showNickname && nickname && (
            <NicknameContainer>
              <NicknameText>@{nickname}</NicknameText>
            </NicknameContainer>
          )}
        </NameContainer>
      </Container>
    </>
  );
};

export default PremiumName;
