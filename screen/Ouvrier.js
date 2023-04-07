import { View, Text } from "react-native";
import React from "react";

const Ouvrier = ({ route }) => {
  console.log(route);
  return (
    <View>
      <Text>Ouvrier{route.params.stateUser.userId}</Text>
    </View>
  );
};

export default Ouvrier;
