import fonts from "@styles/fonts";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 12px;
`;

export const ManagePremiumTitle = styled.Text`
  font-size: 20px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.dark_heading};
  margin: 15px 0px;
  margin-top: 25px;
`;

export const ManagePremiumSubtitle = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.black};

  margin-bottom: 25px;
`;

export const ManagePremiumCardContainer = styled.View`
  padding: 15px;
  background-color: ${(props) => props.theme.colors.shape};
  border-radius: 8px;
`;

export const ManagePremiumCardPeriodContainer = styled.View``;

export const ManagePremiumCardPeriodLabel = styled.Text`
  color: ${(props) => props.theme.colors.light_heading};
  font-family: ${fonts.text};
  font-size: 12px;
`;

export const ManagePremiumCardPeriod = styled.Text`
  font-family: ${fonts.hero};
  font-size: 25px;
  color: ${(props) => props.theme.colors.secondary};
`;

export const ManagePremiumInfosContainer = styled.View`
  margin-top: 15px;
`;

export const ManagePremiumInfoWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ManagePremiumInfoLabel = styled.Text`
  font-size: 14px;
  font-family: ${fonts["text"]};
  color: ${(props) => props.theme.colors.black};
`;

export const ManagePremiumInfoText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${fonts["text-bold"]};
`;

export const ManagePremiumCancelPlanContainer = styled.View`
  margin-top: 15px;
`;
