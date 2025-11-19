import styled from "styled-components/native";
import LottieView from "lottie-react-native";
import fonts from "@styles/fonts";
import { RectButton } from "react-native-gesture-handler";

type PlanProps = {
  planColor?: string;
};

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 0px 15px;
`;

export const AnimationContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 350px;
`;

export const Animation = styled(LottieView)`
  width: 100%;
  height: 100%;
`;

export const AnimationTitle = styled.Text`
  font-size: 20px;
  font-family: ${fonts.hero};
  color: ${(props) => props.theme.colors.secondary};
  margin: -30px 0px 10px 0px;
`;
export const DescriptionWrapper = styled.View`
  margin-top: 5px;
`;

export const Description = styled.Text`
  font-size: 15px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.light_heading};
  text-align: center;
`;
export const PlansContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

export const PlanContainer = styled.View<PlanProps>`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border: 2px solid
    ${(props) => props.planColor || props.theme.colors.secondary};
  padding: 12px;
  border-radius: 5px;
  margin-bottom: 15px;
  elevation: 2;
`;

export const PlanTitle = styled.Text<PlanProps>`
  font-size: 20px;
  font-family: ${fonts.heading};
  color: ${(props) => props.planColor || props.theme.colors.secondary};
`;

export const PlanPriceContainer = styled.View`
  margin: 10px 0px;
`;

export const PlanDiscountText = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.light_heading};
  text-align: center;
  text-decoration: line-through;
  margin-bottom: -5px;
`;

export const PlanPrice = styled.Text<PlanProps>`
  font-size: 30px;
  font-family: ${fonts.hero};
  color: ${(props) => props.planColor || props.theme.colors.secondary};
`;

export const PlanBuyButton = styled(RectButton)`
  width: 100%;
  background-color: ${(props) => props.theme.colors.green};
  border-radius: 5px;
  padding: 10px;
`;

export const PlanBuyButtonText = styled.Text`
  text-align: center;
  font-size: 16px;
  font-family: ${fonts.text};
  color: #fff;
`;

export const BuyFinishedContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 0px 15px;
  justify-content: center;
`;

export const BuyFinishedAnimation = styled(Animation)`
  width: 300px;
  height: 300px;
margin: 0 auto;
`;

export const BuyFinishedTitle = styled.Text`
  text-align: center;
  font-size: 20px;
  font-family: ${fonts.heading};
  color: ${props => props.theme.colors.secondary};
`;
export const BuyFinishedSubtitle = styled.Text`
  font-family: ${fonts.text};
  color: ${props => props.theme.colors.black};
  font-size: 16px;
  margin-top: 15px;
`;