import React, { useState, useCallback } from "react";
import {
  Modal,
  ScrollView,
  Switch,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components";
import SimpleToast from "react-native-simple-toast";

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

  const handleAddOption = useCallback(() => {
    if (options.length >= 10) {
      return SimpleToast.show(
        "Máximo de 10 opções atingido.",
        SimpleToast.SHORT,
      );
    }
    setOptions((prev) => [...prev, ""]);
  }, [options.length]);

  const handleRemoveOption = useCallback(
    (index: number) => {
      if (options.length <= 2) {
        return SimpleToast.show(
          "A enquete deve ter pelo menos 2 opções.",
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
      return SimpleToast.show(
        "Digite a pergunta da enquete.",
        SimpleToast.SHORT,
      );
    }

    if (filledOptions.length < 2) {
      return SimpleToast.show(
        "Preencha pelo menos duas opções válidas.",
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
      <TouchableWithoutFeedback onPress={handleResetAndClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            justifyContent: "flex-end",
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: colors.background || "#1F2937",
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                maxHeight: "85%",
                padding: 20,
              }}
            >
              {/* Header do Modal */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: colors.light_heading || "#FFF",
                  }}
                >
                  Criar Enquete
                </Text>
                <TouchableOpacity onPress={handleResetAndClose}>
                  <Feather
                    name="x"
                    size={24}
                    color={colors.dark_heading || "#9CA3AF"}
                  />
                </TouchableOpacity>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {/* Pergunta */}
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.dark_heading || "#9CA3AF",
                    marginBottom: 6,
                  }}
                >
                  Pergunta
                </Text>
                <TextInput
                  value={question}
                  onChangeText={setQuestion}
                  placeholder="Ex: Qual o local do evento?"
                  placeholderTextColor={colors.dark_heading || "#6B7280"}
                  style={{
                    backgroundColor: colors.shape || "#374151",
                    color: colors.light_heading || "#FFF",
                    borderRadius: 10,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    fontSize: 15,
                    marginBottom: 16,
                  }}
                  maxLength={255}
                />

                {/* Opções */}
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.dark_heading || "#9CA3AF",
                    marginBottom: 6,
                  }}
                >
                  Opções
                </Text>

                {options.map((opt, index) => (
                  <View
                    key={`poll_option_input_${index}`}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 10,
                    }}
                  >
                    <TextInput
                      value={opt}
                      onChangeText={(text) => handleOptionChange(text, index)}
                      placeholder={`Opção ${index + 1}`}
                      placeholderTextColor={colors.dark_heading || "#6B7280"}
                      style={{
                        flex: 1,
                        backgroundColor: colors.shape || "#374151",
                        color: colors.light_heading || "#FFF",
                        borderRadius: 10,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        fontSize: 15,
                      }}
                      maxLength={255}
                    />
                    {options.length > 2 && (
                      <TouchableOpacity
                        onPress={() => handleRemoveOption(index)}
                      >
                        <Feather
                          name="trash-2"
                          size={20}
                          color={colors.red || "#EF4444"}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}

                {/* Botão Adicionar Opção */}
                {options.length < 10 && (
                  <TouchableOpacity
                    onPress={handleAddOption}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      paddingVertical: 10,
                      marginBottom: 16,
                    }}
                  >
                    <Feather name="plus" size={18} color={colors.primary} />
                    <Text style={{ color: colors.primary, fontWeight: "600" }}>
                      Adicionar opção
                    </Text>
                  </TouchableOpacity>
                )}

                {/* Múltipla Escolha */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 12,
                    borderTopWidth: 1,
                    borderTopColor: colors.light_gray || "#374151",
                    marginBottom: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: colors.light_heading || "#FFF",
                    }}
                  >
                    Permitir múltipla escolha
                  </Text>
                  <Switch
                    value={allowsMultiple}
                    onValueChange={setAllowsMultiple}
                    trackColor={{
                      false: "#4B5563",
                      true: colors.secondary + "80",
                    }}
                    thumbColor={allowsMultiple ? colors.secondary : "#9CA3AF"}
                  />
                </View>

                {/* Botão de Enviar Enquete */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    backgroundColor: colors.primary,
                    paddingVertical: 12,
                    borderRadius: 12,
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <Text
                    style={{ color: "#FFF", fontWeight: "bold", fontSize: 16 }}
                  >
                    Criar Enquete
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
