import React, { memo, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components";
import { useAuth } from "@contexts/auth";
import { useWebsocket } from "@contexts/websocket";
import { PollData } from "@type/interfaces";
import _ from "lodash";

export interface PollOptionData {
  id: string;
  option_text: string;
  votes_count: number;
}

interface PollMessageProps {
  poll: PollData;
  groupId: string;
}

export const PollMessage: React.FC<PollMessageProps> = memo(
  ({ poll, groupId }) => {
    const { colors } = useTheme();
    const { user } = useAuth();
    const { socket } = useWebsocket();

    const totalVotes = useMemo(() => {
      return poll.options.reduce(
        (acc, curr) => acc + (curr.votes_count || 0),
        0,
      );
    }, [poll.options]);

    const handleVote = useCallback(
      (optionId: string) => {
        if (!socket || !user) return;

        socket.emit("vote_poll", {
          poll_id: poll.id,
          option_id: optionId,
          group_id: groupId,
        });
      },
      [socket, user, poll.id, groupId],
    );

    const userVotedOptionIds = useMemo(() => {
      if (!user?.id || !poll?.options) return new Set<string>();

      const votedIds = new Set<string>();

      poll.options.forEach((option) => {
        console.log(option.votes);

        if (option.votes?.some((v) => v.user_id === user.id)) {
          votedIds.add(option.id);
        }
      });

      return votedIds;
    }, [poll?.options, user?.id]);

    return (
      <View style={{ width: "100%", marginTop: 8, marginBottom: 4, gap: 10 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: colors.light_heading || "#FFF",
          }}
        >
          📊 {poll.question}
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: colors.dark_heading || "#9CA3AF",
            marginTop: -6,
          }}
        >
          {poll.allows_multiple
            ? "Selecione uma ou mais opções"
            : "Selecione uma opção"}
        </Text>

        <View style={{ gap: 8, marginTop: 4 }}>
          {poll.options.map((option) => {
            const votes = option.votes_count || 0;
            const percentage =
              totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
            const isSelected = userVotedOptionIds.has(option.id);

            return (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleVote(option.id)}
                activeOpacity={0.7}
                style={{
                  position: "relative",
                  backgroundColor: colors.shape || "#374151",
                  borderRadius: 10,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  overflow: "hidden",
                  borderWidth: isSelected ? 1.5 : 0,
                  borderColor: colors.primary,
                }}
              >
                {/* Barra de Progresso do Percentual */}
                <View
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${percentage}%`,
                    backgroundColor: isSelected
                      ? colors.primary + "35"
                      : colors.secondary + "20",
                    borderRadius: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    zIndex: 1,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      flex: 1,
                      marginRight: 8,
                    }}
                  >
                    <Feather
                      name={
                        isSelected
                          ? "check-circle"
                          : poll.allows_multiple
                            ? "square"
                            : "circle"
                      }
                      size={18}
                      color={
                        isSelected
                          ? colors.primary
                          : colors.dark_heading || "#9CA3AF"
                      }
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: colors.light_heading || "#FFF",
                        fontWeight: isSelected ? "600" : "normal",
                      }}
                    >
                      {option.option_text}
                    </Text>
                  </View>

                  {/* Contagem / Porcentagem */}
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      color: colors.dark_heading || "#9CA3AF",
                    }}
                  >
                    {percentage}% ({votes})
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Rodapé com total de votos */}
        <Text
          style={{
            fontSize: 11,
            color: colors.dark_heading || "#9CA3AF",
            textAlign: "right",
            marginTop: 2,
          }}
        >
          {totalVotes} {totalVotes === 1 ? "voto" : "votos"}
        </Text>
      </View>
    );
  },
);
