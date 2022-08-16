import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import {
  Container,
  ModalAnimation,
  ModalAnimationContainer,
  ModalButton,
  ModalButtonText,
  ModalCardContainer,
  ModalContainer,
  ModalContent,
  ModalTitle,
} from "./styles";

interface EmblemProps {
  visible: boolean;
  close: () => void;
  premium: boolean;
}

const EmblemModal= ({ visible, close, premium }: EmblemProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleGoPremium = () => {
    close()
    navigation.navigate("PurchasePremium")
  }

  return (
    <Container 
      visible={visible}
      onDismiss={close}
      onRequestClose={close}
      animationType="fade" 
      transparent 
      statusBarTranslucent
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPress={close}
      >
        <ModalContainer>
          <ModalCardContainer>
            <ModalAnimationContainer>
              <ModalAnimation
                source={require("../../../assets/star.json")}
                loop={false}
                autoPlay
              />
            </ModalAnimationContainer>
            <ModalTitle>Emblema legal né?</ModalTitle>
            <ModalContent>
              Ele é dado a pessoas muito especias que apoiam o Saturn Chat com o
              plano Star. {!premium && "Quer ter um igual? Então venha fazer parte da constelação!"}
            </ModalContent>
            {
              !premium && (
                <ModalButton onPress={handleGoPremium}>
                  <ModalButtonText>
                    Obter Star
                  </ModalButtonText>
                </ModalButton>
              ) 
            }
          </ModalCardContainer>
        </ModalContainer>
      </TouchableOpacity>
    </Container>
  );
};

export default EmblemModal;
