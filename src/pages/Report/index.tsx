import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  Container,
  FormContainer,
  InputContainer,
  Subtitle,
  Title,
} from "./styles";
import Header from "@components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import Input from "@components/Input";
import Radio from "@components/Radio";
import { ReportToType, ReportType } from "@type/enums";
import { useTheme } from "styled-components";
import { useTranslate } from "@hooks/useTranslate";
import api from "@services/api";
import SimpleToast from "react-native-simple-toast";
import Button from "@components/Button";

const Report: React.FC = () => {
  const { params } = useRoute();
  const { type, group_id, message_id, user_id } = params as any;
  const { colors } = useTheme();
  const [reportType, setReportType] = useState("");
  const [message, setMessage] = useState("");
  const nav = useNavigation();

  const { t } = useTranslate("Report");

  const handleReport = async () => {
    const { status } = await api.post("/reports", {
      type: reportType,
      to_type: type,
      to_user_id: type === ReportToType.USER ? user_id : undefined,
      to_group_id: type === ReportToType.GROUP ? group_id : undefined,
      to_message_id: type === ReportToType.MESSAGE ? message_id : undefined,
      message,
    });

    if (status === 200) {
      SimpleToast.show(t("sent"), SimpleToast.SHORT);
      nav.goBack();
    }
  };

  return (
    <>
      <Header title={t("header_title")} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <Container>
              <Title>{t("title")}</Title>
              <Subtitle>{t("subtitle")}</Subtitle>
              <FormContainer>
                <InputContainer>
                  {Object.values(ReportType).map((type, index) => (
                    <Radio
                      key={index}
                      label={t(`types.${type}`)}
                      selectedValue={reportType}
                      onValueChange={(value) => setReportType(value)}
                      value={type}
                      color={colors.black}
                    />
                  ))}
                </InputContainer>
                <InputContainer>
                  <Input
                    value={message}
                    onChangeText={setMessage}
                    label="Informe mais detalhes (opcional)"
                    multiline
                  />
                </InputContainer>
                <Button
                  title={t("done")}
                  enabled={!!reportType}
                  onPress={handleReport}
                />
              </FormContainer>
            </Container>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default Report;
