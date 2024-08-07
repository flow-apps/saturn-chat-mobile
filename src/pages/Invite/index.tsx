import React, { useCallback, useState } from "react";
import {
  AcceptInviteButton,
  AcceptInviteText,
  Container,
  InviteAnimation,
  InviteAvatarImage,
  InviteContainer,
  InviteGroupName,
  InviteTitle,
  InviteAnimationContainer,
  InviteInvalidReason,
} from "./styles";
import { StatusBar } from "expo-status-bar/build/StatusBar";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { InviteData } from "@type/interfaces";
import api from "@services/api";
import Loading from "@components/Loading";
import { ParticipantData } from "../Home";
import SimpleToast from "react-native-simple-toast";
import { useAuth } from "@contexts/auth";
import analytics from "@react-native-firebase/analytics";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslate } from "@hooks/useTranslate";
import { ParticipantStates } from "@type/enums";

const Invite: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState<null | InviteData>(null);
  const [participating, setParticipating] = useState(false);
  const { user } = useAuth();

  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const params = route.params as { inviteID: string };
  const inviteID = params.inviteID;

  const { t } = useTranslate("Components.Chat.InviteInMessage");

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setLoading(true);
        api
          .get(`/invites/${inviteID}?user_id=${user?.id}`)
          .then((res) => {
            if (res.status === 200) {
              setInvite(res.data.invite);

              const participant = res.data?.participant as ParticipantData;

              if (!participant) {
                return setParticipating(false);
              }

              if (participant.state === ParticipantStates.JOINED) {
                setParticipating(true);
              }
            }
          })
          .catch(() => setInvite(null))
          .finally(() => {
            setLoading(false);
          });
      })();
    }, [inviteID])
  );

  if (loading) return <Loading />;

  if (!invite) {
    return (
      <>
        <StatusBar translucent />
        <Container
          colors={["#0061ff", "#0059ff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.2, y: 0.8 }}
        >
          <InviteContainer>
            <InviteAnimationContainer>
              <InviteAnimation
                source={require("@assets/crying.json")}
                autoPlay
                autoSize
                loop
              />
            </InviteAnimationContainer>
            <InviteGroupName>{t("invalid_invite_title")}</InviteGroupName>
            <InviteInvalidReason>
              {t("invalid_invite_subtitle")}
            </InviteInvalidReason>
          </InviteContainer>
        </Container>
      </>
    );
  }

  const handleJoin = async () => {
    await api
      .get(`/inv/join/${invite?.id}`)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data as ParticipantData;

          analytics().logEvent("join_group", {
            method: "invite",
            group_id: data.group_id,
          });
          navigation.navigate("Chat", { id: data.group_id });
        }
      })
      .catch((err) => {
        SimpleToast.show(t("toasts.error"), SimpleToast.SHORT);
      });
  };

  return (
    <>
      <StatusBar backgroundColor="#0061ff" />
      <Container
        colors={["#0061ff", "#0059ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 0.5 }}
      >
        <InviteContainer>
          <InviteTitle>{t("invite_screen_title")}</InviteTitle>
          <InviteAvatarImage uri={invite.group.group_avatar?.url} />
          <InviteGroupName>{invite?.group.name}</InviteGroupName>
          <AcceptInviteButton onPress={handleJoin} enabled={!participating}>
            <AcceptInviteText>
              {participating ? t("joined_text") : t("join_text")}
            </AcceptInviteText>
          </AcceptInviteButton>
        </InviteContainer>
      </Container>
    </>
  );
};

export default Invite;
