import React, { memo, useCallback, useMemo } from "react";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { MotiView } from "moti";
import { useAuth } from "@contexts/auth";
import { useWebsocket } from "@contexts/websocket";
import { PollData } from "@type/interfaces";

import {
  Container,
  QuestionText,
  SubtitleText,
  OptionsContainer,
  OptionButton,
  OptionContent,
  OptionInfo,
  OptionText,
  PercentageText,
  TotalVotesText,
} from "./styles";

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
        if (option.votes?.some((v) => v.user_id === user.id)) {
          votedIds.add(option.id);
        }
      });

      return votedIds;
    }, [poll?.options, user?.id]);

    return (
      <Container>
        <QuestionText>📊 {poll.question}</QuestionText>

        <SubtitleText>
          {poll.allows_multiple
            ? "Selecione uma ou mais opções"
            : "Selecione uma opção"}
        </SubtitleText>

        <OptionsContainer>
          {poll.options.map((option) => {
            const votes = option.votes_count || 0;
            const percentage =
              totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
            const isSelected = userVotedOptionIds.has(option.id);

            const progressBgColor = isSelected
              ? colors.primary + "35"
              : colors.secondary + "20";

            return (
              <OptionButton
                key={option.id}
                onPress={() => handleVote(option.id)}
                activeOpacity={0.7}
                style={{ overflow: "hidden", position: "relative" }}
              >
                <MotiView
                  animate={{
                    width: `${percentage}%`, 
                    backgroundColor: progressBgColor,
                  }}
                  transition={{
                    type: "timing",
                    duration: 350,
                  }}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: percentage === 100 ? 0 : undefined,
                    borderRadius: 10,
                  }}
                />

                <OptionContent>
                  <OptionInfo>
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
                    <OptionText isSelected={isSelected}>
                      {option.option_text}
                    </OptionText>
                  </OptionInfo>

                  <PercentageText>
                    {percentage}% ({votes})
                  </PercentageText>
                </OptionContent>
              </OptionButton>
            );
          })}
        </OptionsContainer>

        <TotalVotesText>
          {totalVotes} {totalVotes === 1 ? "voto" : "votos"}
        </TotalVotesText>
      </Container>
    );
  },
);
