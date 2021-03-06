import React, { useState } from "react";
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
import { StatusBar } from "expo-status-bar";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { InviteData } from "../../../@types/interfaces";
import api from "../../services/api";
import Loading from "../../components/Loading";
import { ParticipantData } from "../Home";
import SimpleToast from "react-native-simple-toast";
import { useAuth } from "../../contexts/auth";
import { useFirebase } from "../../contexts/firebase";

const Invite: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState<null | InviteData>(null);
  const [participating, setParticipating] = useState(false);
  const { user } = useAuth();
  const { analytics } = useFirebase()

  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as { inviteID: string };
  const inviteID = params.inviteID;

  useFocusEffect(() => {
    (async () => {
      setLoading(true);
      api
        .get(`/invites/${inviteID}?user_id=${user?.id}`)
        .then((res) => {
          if (res.status === 200) {
            setInvite(res.data.invite);

            if (res.data.participant) {
              setParticipating(true);
            } else {
              setParticipating(false);
            }
          }
        })
        .catch(() => setInvite(null));

      setLoading(false);
    })();
  });

  if (loading) return <Loading />;

  if (!invite && !loading) {
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
                source={require("../../assets/crying.json")}
                autoPlay
                loop
              />
            </InviteAnimationContainer>
            <InviteGroupName>Convite inv??lido</InviteGroupName>
            <InviteInvalidReason>
              O convite pode ter sido expirado, apagado ou ter atingido seu
              n??mero m??ximo de usos. Pe??a outro.
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

          analytics.logEvent("join_group", {
            method: "invite",
            group_id: data.group_id
          })
          navigation.navigate("Chat", { id: data.group_id });
        }
      })
      .catch((err) => {
        SimpleToast.show("Erro ao usar o convite");
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
          <InviteTitle>Voc?? foi convidado(a) para o grupo:</InviteTitle>
          {invite?.group.group_avatar ? (
            <InviteAvatarImage
              source={{
                cache: "immutable",
                priority: "high",
                uri: invite.group.group_avatar.url,
              }}
            />
          ) : (
            <InviteAvatarImage
              source={require("../../assets/avatar-placeholder.png")}
            />
          )}
          <InviteGroupName>{invite?.group.name}</InviteGroupName>
          <AcceptInviteButton onPress={handleJoin} enabled={!participating}>
            <AcceptInviteText>
              {participating ? "Voc?? j?? entrou" : "Aceitar convite"}
            </AcceptInviteText>
          </AcceptInviteButton>
        </InviteContainer>
      </Container>
    </>
  );
};

export default Invite;
