import React from "react";
import {
  Container,
  GroupButton,
  GroupImage,
  NewGroupButton,
  QuickAccessGroupsContainer,
  QuickAccessGroupsScroll,
  QuickAccessTitle,
  GroupsContainer,
  GroupsTitle,
  GroupsSubtitle,
  GroupsList,
  TitleWrapper,
} from "./styles";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import Header from "../../components/Header";
import avatar from "../../assets/avatar.jpg";
import HorizontalLine from "../../components/HorizontalLine";
import Group from "../../components/Group";

const Home: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Container>
      <Header title="Grupos" backButton={false} homeButtons />
      <QuickAccessGroupsContainer>
        <QuickAccessTitle>
          <MaterialIcons name="star" size={20} color={colors.secondary} />{" "}
          Acesso rápido
        </QuickAccessTitle>
        <QuickAccessGroupsScroll
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <NewGroupButton>
            <Feather name="plus" size={35} color={colors.secondary} />
          </NewGroupButton>
          <GroupButton>
            <GroupImage source={avatar} />
          </GroupButton>
          <GroupButton>
            <GroupImage source={avatar} />
          </GroupButton>
          <GroupButton>
            <GroupImage source={avatar} />
          </GroupButton>
        </QuickAccessGroupsScroll>
      </QuickAccessGroupsContainer>
      <GroupsContainer showsVerticalScrollIndicator={false}>
        <TitleWrapper>
          <GroupsTitle>Acesse os grupos</GroupsTitle>
          <GroupsSubtitle>25 mensagens não lidas</GroupsSubtitle>
        </TitleWrapper>
        <HorizontalLine />
        <GroupsList>
          <Group name="Pedro's Group" unreadMessages={20} />
          <Group name="Pedro's Group" unreadMessages={5} />
          <Group name="Pedro's Group" unreadMessages={0} />
          <Group name="Pedro's Group" unreadMessages={0} />
          <Group name="Pedro's Group" unreadMessages={0} />
        </GroupsList>
      </GroupsContainer>
    </Container>
  );
};

export default Home;
