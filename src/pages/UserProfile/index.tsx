import React, { useState, useCallback } from "react";
import AdBanner from "@components/Ads/Banner";
import Group from "@components/Group";
import Feather from "@expo/vector-icons/Feather";
import Header from "@components/Header";
import PremiumName from "@components/PremiumName";
import Loading from "@components/Loading";
import api from "@services/api";
import { useAds } from "@contexts/ads";
import { useTheme } from "styled-components";
import { useAuth } from "@contexts/auth";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { FriendData, UserData } from "@type/interfaces";
import { FriendsStates } from "@type/enums";
import { View } from "react-native";
import {
  Container,
  Avatar,
  Banner,
  BasicInfos,
  BasicInfosContainer,
  FriendsContainer,
  FriendsInfosContainer,
  FriendsNumber,
  FriendsTitle,
  ImagesContainer,
  UserProfileContainer,
  GroupsContainer,
  GroupsTitle,
  Groups,
  BioContainer,
  BioContent,
  AvatarContainer,
  AddFriendContainer,
  NicknameText,
} from "./styles";

import isNull from "lodash/isNull";
import FriendActionButtons from "@components/UserProfile/FriendActionButtons";
import AddFriendButton from "@components/UserProfile/AddFriendButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { HeaderButton } from "@components/Header/styles";
import { useTranslate } from "@hooks/useTranslate";
import { usePremium } from "@contexts/premium";

const UserProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [friendsState, setFriendsState] = useState<FriendsStates>();
  const [userInfos, setUserInfos] = useState<UserData>({} as UserData);
  const [friendInfos, setFriendInfos] = useState<FriendData>();

  const { colors } = useTheme();
  const { user } = useAuth();

  const route = useRoute() as { params?: { id: string } };
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { t } = useTranslate("Profile");
  const { isPremium } = usePremium();

  const id = route.params && route.params?.id ? route.params?.id : user?.id;

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setLoading(true);
        const res = await api.get(`/users?user_id=${id}`);

        if (res.status === 200) {
          setUserInfos(res.data);

          if (res.data.friend) {
            setFriendInfos(res.data.friend);
            setFriendsState(res.data.friend.state);
          }
        }
        setLoading(false);
      })();
    }, [])
  );

  const openFriendsManager = () => {
    navigation.navigate("FriendsManager");
  };

  const handleGoGroupInfos = (groupID: string) => {
    navigation.navigate("GroupInfos", { id: groupID });
  };

  const handleGoAvatar = () => {
    navigation.navigate("ImagePreview", {
      name: userInfos.avatar.name,
      url: userInfos.avatar.url,
    });
  };

  const renderFriendButton = () => {
    if (userInfos.id === user?.id) {
      return <></>;
    }

    if (
      friendsState === FriendsStates.REQUESTED &&
      friendInfos?.received_by.id === user?.id
    ) {
      return (
        <FriendActionButtons
          name={friendInfos?.requested_by.name}
          action={handleAcceptOrRejectFriend}
        />
      );
    }

    return (
      <AddFriendButton
        friendsState={friendsState}
        handleActionFriend={handleRequestFriend}
      />
    );
  };

  const handleRequestFriend = async () => {
    const res = await api.post(`/friends/request?friend_id=${userInfos.id}`);

    if (res.status === 200) {
      setFriendsState(res.data.state);
    }
  };

  const handleAcceptOrRejectFriend = async (action: "ACCEPT" | "REJECT") => {
    const res = await api.put(
      `/friends/response?state=${action}&friend_id=${friendInfos?.id}`
    );

    if (res.status === 200) {
      setFriendsState(res.data.state);
    }
  };

  const handleGoEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header title={userInfos?.name}>
        {userInfos?.id === user.id && (
          <HeaderButton onPress={handleGoEditProfile}>
            <Feather name="edit" size={22} color="#fff" />
          </HeaderButton>
        )}
      </Header>
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
                <Avatar uri={userInfos?.avatar?.url} />
              </AvatarContainer>
            </ImagesContainer>
            <BasicInfos>
              <PremiumName
                name={userInfos?.name}
                nameSize={22}
                color={colors.light_heading}
                align="center"
                hasPremium={
                  userInfos.id === user.id ? isPremium : userInfos.isPremium
                }
              />
              {userInfos.nickname && (
                <NicknameText>@{userInfos.nickname}</NicknameText>
              )}
            </BasicInfos>
            {!isNull(userInfos?.bio) && userInfos?.bio.length && (
              <BioContainer>
                <BioContent>{userInfos?.bio}</BioContent>
              </BioContainer>
            )}
            {userInfos?.id === user?.id && (
              <FriendsInfosContainer>
                <FriendsContainer
                  disabled={!userInfos?.friendsAmount}
                  onPress={openFriendsManager}
                >
                  <FriendsNumber>{userInfos?.friendsAmount}</FriendsNumber>
                  <FriendsTitle>{t("friends")}</FriendsTitle>
                </FriendsContainer>
              </FriendsInfosContainer>
            )}
            <AddFriendContainer>{renderFriendButton()}</AddFriendContainer>
          </BasicInfosContainer>
          {userInfos?.participating.length > 0 && (
            <GroupsContainer>
              <GroupsTitle>
                <Feather name="users" size={25} color={colors.light_heading} />{" "}
                {t("participating")}
              </GroupsTitle>
              <Groups>
                {userInfos?.participating?.map((participant, index) => {
                  const avatar = participant.group.group_avatar;
                  return (
                    participant.group.privacy !== "PRIVATE" && (
                      <View key={index * 1.5}>
                        {!!index && index % 5 === 0 && <AdBanner />}
                        <Group
                          key={participant.id}
                          name={participant.group.name}
                          image={avatar ? avatar?.url : ""}
                          onPress={() =>
                            handleGoGroupInfos(participant.group.id)
                          }
                        />
                      </View>
                    )
                  );
                })}
              </Groups>
            </GroupsContainer>
          )}
        </UserProfileContainer>
      </Container>
    </>
  );
};

export default UserProfile;
