import React from "react";
import { View } from "react-native";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/auth";

const Configurations: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
};

export default Configurations;
