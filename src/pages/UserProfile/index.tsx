import React, { useState, useEffect } from "react";
import AdBanner from "../../components/Ads/Banner";
import Group from "../../components/Group";
import Header from "../../components/Header";
import PremiumName from "../../components/PremiumName";
import Loading from "../../components/Loading";
import api from "../../services/api";
import { Feather } from "@expo/vector-icons";
import { useAds } from "../../contexts/ads";
import { useTheme } from "styled-components";
import { useAuth } from "../../contexts/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserData } from "../../../@types/interfaces";
import { View } from "react-native";
import {
  Avatar,
  Banner,
  BasicInfos,
  BasicInfosContainer,
  Container,
  ImagesContainer,
  UserProfileContainer,
  GroupsContainer,
  GroupsTitle,
  Groups,
  BioContainer,
  BioContent,
  AvatarContainer,
  FriendButton,
  FriendButtonText,
  AddFriendContainer,
} from "./styles";

import _ from "lodash";
import { FriendsStates } from "../../../@types/enums";

const UserProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [friendsState, setFriendsState] = useState<FriendsStates>();
  const [userInfos, setUserInfos] = useState<UserData>({} as UserData);

  const { Interstitial } = useAds();
  const { colors } = useTheme();
  const { user } = useAuth();
  const route = useRoute() as { params?: { id: string } };
  const navigation = useNavigation();

  const id = route.params && route.params?.id ? route.params?.id : user?.id;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const isReady = await Interstitial.getIsReadyAsync();
      if (isReady) await Interstitial.showAdAsync();
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

  const handleGoAvatar = () => {
    navigation.navigate("ImagePreview", {
      name: userInfos.avatar.name,
      url: userInfos.avatar.url,
    });
  };

  const handleRequestFriend = async () => {};

  const friendIconSelector = () => {
    switch (friendsState) {
      case FriendsStates.REQUESTED:
        return <Feather name="user" size={16} />;
      case FriendsStates.FRIENDS:
        return <Feather name="user-check" size={16} />;
      default:
        return <Feather name="user-plus" size={16} />;
    }
  };

  const friendButtonTextSelector = () => {
    switch (friendsState) {
      case FriendsStates.FRIENDS:
        return "Amigos";
      case FriendsStates.REQUESTED:
        return "Solicitação enviada";
      default:
        return "Adicionar aos amigos";
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header title={userInfos?.name} />
      <Container>
        <UserProfileContainer>
          <BasicInfosContainer>
            <ImagesContainer>
              <Banner />
              <AvatarContainer
                onPress={handleGoAvatar}
                disabled={!userInfos.avatar}
                activeOpacity={0.7}
              >
                {userInfos.avatar ? (
                  <Avatar
                    source={{
                      uri: userInfos?.avatar.url,
                      cache: "immutable",
                      priority: "high",
                    }}
                  />
                ) : (
                  <Avatar
                    source={require("../../assets/avatar-placeholder.png")}
                  />
                )}
              </AvatarContainer>
            </ImagesContainer>
            <BasicInfos>
              <PremiumName
                name={userInfos?.name}
                nameSize={22}
                color={colors.light_heading}
                align="center"
              />
            </BasicInfos>
            {!_.isNull(userInfos?.bio) && userInfos?.bio.length ? (
              <BioContainer>
                <BioContent>{userInfos?.bio}</BioContent>
              </BioContainer>
            ) : (
              <></>
            )}
            <AddFriendContainer>
              <FriendButton state={friendsState} onPress={handleRequestFriend}>
                <FriendButtonText>
                  {friendIconSelector()} {friendButtonTextSelector()}
                </FriendButtonText>
              </FriendButton>
            </AddFriendContainer>
          </BasicInfosContainer>
          <GroupsContainer>
            <GroupsTitle>
              <Feather name="users" size={25} color={colors.light_heading} />{" "}
              Participando
            </GroupsTitle>
            <Groups>
              {userInfos?.participating.map((participant, index) => {
                const avatar = participant.group.group_avatar;
                return (
                  participant.group.privacy !== "PRIVATE" && (
                    <View key={index * 1.5}>
                      {index % 5 === 0 && <AdBanner />}
                      <Group
                        key={participant.id}
                        name={participant.group.name}
                        image={avatar ? avatar.url : ""}
                        onPress={() => handleGoGroupInfos(participant.group.id)}
                      />
                    </View>
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
