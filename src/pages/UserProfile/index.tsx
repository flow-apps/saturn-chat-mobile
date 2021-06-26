import React from "react";
import { Feather } from "@expo/vector-icons";
import Header from "../../components/Header";
import {
  Avatar,
  Banner,
  BasicInfos,
  BasicInfosContainer,
  Container,
  ImagesContainer,
  UserProfileContainer,
  UserName,
  GroupsContainer,
  GroupsTitle,
  Groups,
} from "./styles";
import { useTheme } from "styled-components";
import Group from "../../components/Group";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../../contexts/auth";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../components/Loading";
import { UserData } from "../../../@types/interfaces";
import api from "../../services/api";

const UserProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [userInfos, setUserInfos] = useState<UserData>({} as UserData);

  const { colors } = useTheme();
  const { user } = useAuth();
  const route = useRoute() as { params?: { id: string } };
  const navigation = useNavigation();

  const id = route.params && route.params?.id ? route.params?.id : user?.id;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await api.get(`/users?user_id=${id}`);

      if (res.status === 200) {
        setUserInfos(res.data);
      }
      setLoading(false);
    })();
  }, []);

  const handleGoGroupInfos = (groupID: string) => {
    navigation.navigate("GroupInfos", { id: groupID });
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header title={userInfos?.name} backButton />
      <Container>
        <UserProfileContainer>
          <BasicInfosContainer>
            <ImagesContainer>
              <Banner />
              <Avatar source={{ uri: userInfos?.avatar.url }} />
            </ImagesContainer>
            <BasicInfos>
              <UserName>{userInfos?.name}</UserName>
            </BasicInfos>
          </BasicInfosContainer>
          <GroupsContainer>
            <GroupsTitle>
              <Feather name="users" size={25} color={colors.light_heading} />{" "}
              Participando
            </GroupsTitle>
            <Groups>
              {userInfos?.participating.map((participant, index) => {
                return (
                  participant.group.privacy !== "PRIVATE" && (
                    <Group
                      key={index}
                      name={participant.group.name}
                      image={participant.group.group_avatar.url}
                      onPress={() => handleGoGroupInfos(participant.group.id)}
                    />
                  )
                );
              })}
            </Groups>
          </GroupsContainer>
        </UserProfileContainer>
      </Container>
    </>
  );
};

export default UserProfile;
