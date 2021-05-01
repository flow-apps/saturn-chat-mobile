import React from "react";
import { Feather } from "@expo/vector-icons";
import Header from "../../components/Header";
import {
  Avatar,
  Banner,
  BasicInfos,
  BasicInfosContainer,
  Container,
  FollowInfosContainer,
  ImagesContainer,
  MyProfileContainer,
  UserName,
  FollowingContainer,
  FollowNumber,
  FollowTitle,
  FollowerContainer,
  GroupsContainer,
  GroupsTitle,
  Groups,
} from "./styles";
import avatar from "../../assets/avatar.jpg";
import HorizontalLine from "../../components/HorizontalLine";
import { useTheme } from "styled-components";
import Group from "../../components/Group";

const MyProfile: React.FC = () => {
  const { colors } = useTheme();

  return (
    <>
      <Header title="Seu perfil" backButton />
      <Container>
        <MyProfileContainer>
          <BasicInfosContainer>
            <ImagesContainer>
              <Banner />
              <Avatar source={avatar} />
            </ImagesContainer>
            <BasicInfos>
              <UserName>Pedro Henrique</UserName>
              <HorizontalLine />
              <FollowInfosContainer>
                <FollowingContainer>
                  <FollowNumber>290</FollowNumber>
                  <FollowTitle>Seguindo</FollowTitle>
                </FollowingContainer>
                <FollowerContainer>
                  <FollowNumber>590</FollowNumber>
                  <FollowTitle>Seguidores</FollowTitle>
                </FollowerContainer>
              </FollowInfosContainer>
              <HorizontalLine />
            </BasicInfos>
          </BasicInfosContainer>
          <GroupsContainer>
            <GroupsTitle>
              <Feather name="users" size={25} color={colors.light_heading} />{" "}
              Grupos
            </GroupsTitle>
            <Groups>
              <Group name="Oi" />
              <Group name="Oi" />
              <Group name="Oi" />
              <Group name="Oi" />
              <Group name="Oi" />
              <Group name="Oi" />
              <Group name="Oi" />
              <Group name="Oi" />
              <Group name="Oi" />
              <Group name="Oi" />
            </Groups>
          </GroupsContainer>
        </MyProfileContainer>
      </Container>
    </>
  );
};

export default MyProfile;
