import React, { useState, useCallback } from "react";
import {
  Modal,
  Platform,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import SimpleToast from "react-native-simple-toast";

import {
  ModalOverlay,
  KeyboardView,
  ModalContent,
  Header,
  Title,
  CloseButton,
  Label,
  Input,
  OptionRow,
  OptionInput,
  RemoveOptionButton,
  AddOptionButton,
  AddOptionText,
  MultipleChoiceContainer,
  MultipleChoiceText,
  SubmitButton,
  SubmitButtonText,
} from "./styles";
import { useTranslate } from "@hooks/useTranslate";

interface PollModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    question: string;
    options: string[];
    allows_multiple: boolean;
  }) => void;
}

export const PollModal: React.FC<PollModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const { colors } = useTheme();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [allowsMultiple, setAllowsMultiple] = useState(false);
  const { t } = useTranslate("Components.Chat.Poll");

  const handleAddOption = useCallback(() => {
    if (options.length >= 10) {
      return SimpleToast.show(
        t("max_options", { count: 10 }),
        SimpleToast.SHORT,
      );
    }
    setOptions((prev) => [...prev, ""]);
  }, [options.length]);

  const handleRemoveOption = useCallback(
    (index: number) => {
      if (options.length <= 2) {
        return SimpleToast.show(
          t("min_options", { count: 2 }),
          SimpleToast.SHORT,
        );
      }
      setOptions((prev) => prev.filter((_, i) => i !== index));
    },
    [options.length],
  );

  const handleOptionChange = useCallback((text: string, index: number) => {
    setOptions((prev) => {
      const updated = [...prev];
      updated[index] = text;
      return updated;
    });
  }, []);

  const handleResetAndClose = useCallback(() => {
    setQuestion("");
    setOptions(["", ""]);
    setAllowsMultiple(false);
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    const trimmedQuestion = question.trim();
    const filledOptions = options
      .map((opt) => opt.trim())
      .filter((opt) => opt.length > 0);

    if (!trimmedQuestion) {
      return SimpleToast.show(t("type_poll_question"), SimpleToast.SHORT);
    }

    if (filledOptions.length < 2) {
      return SimpleToast.show(
        t("min_options", { count: 2 }),
        SimpleToast.SHORT,
      );
    }

    onSubmit({
      question: trimmedQuestion,
      options: filledOptions,
      allows_multiple: allowsMultiple,
    });

    handleResetAndClose();
  }, [question, options, allowsMultiple, onSubmit, handleResetAndClose]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleResetAndClose}
    >
      <KeyboardView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={handleResetAndClose}>
          <ModalOverlay>
            <TouchableWithoutFeedback>
              <ModalContent>
                <Header>
                  <Title>{t("create_poll")}</Title>
                  <CloseButton onPress={handleResetAndClose}>
                    <Feather
                      name="x"
                      size={24}
                      color={colors.dark_heading || "#9CA3AF"}
                    />
                  </CloseButton>
                </Header>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  <Label>{t("question")}</Label>
                  <Input
                    value={question}
                    onChangeText={setQuestion}
                    placeholder={t("question_input_placeholder")}
                    placeholderTextColor={colors.dark_heading || "#6B7280"}
                    maxLength={255}
                  />

                  {/* Opções */}
                  <Label>{t("options")}</Label>
                  {options.map((opt, index) => (
                    <OptionRow key={`poll_option_input_${index}`}>
                      <OptionInput
                        value={opt}
                        onChangeText={(text) => handleOptionChange(text, index)}
                        placeholder={t("question_option_placeholder", {
                          count: index + 1,
                        })}
                        placeholderTextColor={colors.dark_heading || "#6B7280"}
                        maxLength={255}
                      />
                      {options.length > 2 && (
                        <RemoveOptionButton
                          onPress={() => handleRemoveOption(index)}
                        >
                          <Feather
                            name="trash-2"
                            size={20}
                            color={colors.red || "#EF4444"}
                          />
                        </RemoveOptionButton>
                      )}
                    </OptionRow>
                  ))}

                  {options.length < 10 && (
                    <AddOptionButton onPress={handleAddOption}>
                      <Feather name="plus" size={18} color={colors.primary} />
                      <AddOptionText>{t("add_option")}</AddOptionText>
                    </AddOptionButton>
                  )}

                  <MultipleChoiceContainer>
                    <MultipleChoiceText>{t("multiple")}</MultipleChoiceText>
                    <Switch
                      value={allowsMultiple}
                      onValueChange={setAllowsMultiple}
                      trackColor={{
                        false: "#4B5563",
                        true: colors.secondary + "80",
                      }}
                      thumbColor={allowsMultiple ? colors.secondary : "#9CA3AF"}
                    />
                  </MultipleChoiceContainer>

                  <SubmitButton onPress={handleSubmit}>
                    <SubmitButtonText>{t("create_poll")}</SubmitButtonText>
                  </SubmitButton>
                </ScrollView>
              </ModalContent>
            </TouchableWithoutFeedback>
          </ModalOverlay>
        </TouchableWithoutFeedback>
      </KeyboardView>
    </Modal>
  );
};
