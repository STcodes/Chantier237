import { View, Text, Image, TouchableOpacity } from "react-native";
import StarContainer from "../components/StarContainer";
import UilAngleRight from "@iconscout/react-native-unicons/icons/uil-angle-right";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import React from "react";

const OuvrierProfil = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="flex-row w-full gap-3 items-center justify-start mb-4"
      onPress={() => {
        navigation.navigate("SingleOuvrier", { id: props.rowid });
      }}
    >
      <Image
        source={{
          uri: props.image_url,
        }}
        className="w-14 h-14 rounded-full"
      />
      <Animatable.View
        animation={"bounceIn"}
        className="flex-row items-start justify-between w-[77%] border-b-[1px] border-gray-400 pb-3 "
      >
        <View>
          <Text className="text-bases" style={{ fontWeight: "700" }}>
            {props.rowid == props.userId
              ? props.last_name + "  (Vous)"
              : props.last_name}
          </Text>
          <Text className="text-gray-600 mb-1">
            {props.description.length >= 30
              ? `${props.description.substring(0, 35)}...`
              : props.description}
          </Text>
          <StarContainer evaluation={props.evaluation} />
        </View>
        <UilAngleRight size="30" color="blue" />
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default OuvrierProfil;
