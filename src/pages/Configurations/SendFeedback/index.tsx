import Header from "@components/Header";
import React, { useState } from "react";
import { Container, FormContainer, InputContainer } from "./styles";
import { useTranslate } from "@hooks/useTranslate";
import Input from "@components/Input";
import { FeedbackType } from "@type/enums";
import { useTheme } from "styled-components";
import RNPickerSelect from "react-native-picker-select";
import api from "@services/api";

import SimpleToast from "react-native-simple-toast";
import { useNavigation } from "@react-navigation/native";
import Button from "@components/Button";

const SendFeedback: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslate("SendFeedback");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(
    FeedbackType.SUGGESTION,
  );
  const [message, setMessage] = useState("");
  const nav = useNavigation();

  const handleSendFeedback = async () => {
    const { status, data } = await api.post("/feedbacks", {
      type: feedbackType,
      content: message,
    });

    if (status === 200) {
      SimpleToast.show(t("sent"), SimpleToast.SHORT);
      nav.goBack();
    }
  };

  return (
    <>
      <Header title={t("title")} />
      <Container>
        <FormContainer>
          <InputContainer>
            <RNPickerSelect
              onValueChange={(value) => {
                setFeedbackType(value);
              }}
              value={feedbackType}
              placeholder={{
                label: "Tipo de Feedback",
                value: undefined,
                color: colors.light_gray,
              }}
              style={{
                inputAndroid: {
                  backgroundColor: colors.shape,
                },
              }}
              dropdownItemStyle={{
                backgroundColor: colors.background,
              }}
              activeItemStyle={{
                backgroundColor: colors.shape,
              }}
              items={[
                {
                  label: t(`feedback_type.suggestion`),
                  value: FeedbackType.SUGGESTION,
                  color: colors.black,
                },
                {
                  label: t(`feedback_type.bug`),
                  value: FeedbackType.BUG,
                  color: colors.black,
                },
                {
                  label: t(`feedback_type.others`),
                  value: FeedbackType.OTHER,
                  color: colors.black,
                },
              ]}
            />
          </InputContainer>
          <InputContainer>
            <Input
              value={message}
              label={t("labels.message")}
              multiline
              onChangeText={setMessage}
            />
          </InputContainer>
          <Button
            title={t("done")}
            enabled={!!feedbackType || !!message}
            onPress={handleSendFeedback}
          />
        </FormContainer>
      </Container>
    </>
  );
};

export default SendFeedback;
