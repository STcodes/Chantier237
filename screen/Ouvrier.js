import { View, Text } from "react-native";
import React from "react";

const Ouvrier = ({ route }) => {
  return (
    <View>
      <Text>Ouvrier{route.params.stateUser.dateAbonned}</Text>
    </View>
  );
};

export default Ouvrier;
