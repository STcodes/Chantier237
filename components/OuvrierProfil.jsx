import { View, Text, Image, TouchableOpacity } from "react-native";
import StarContainer from "../components/StarContainer";
import UilAngleRight from "@iconscout/react-native-unicons/icons/uil-angle-right";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const OuvrierProfil = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="flex-row w-full gap-3 items-center justify-start mb-4"
      onPress={() => {
        navigation.navigate("SingleOuvrier", { id: props.id });
      }}
    >
      <Image
        source={{
          uri: props.imageUrl,
        }}
        className="w-14 h-14 rounded-full"
      />
      <View className="flex-row items-start justify-between w-[77%] border-b-[1px] border-gray-700 pb-3 ">
        <View>
          <Text className="text-bases" style={{ fontWeight: "700" }}>
            {props.name}{" "}
          </Text>
          <Text className="text-gray-600 mb-1">
            {props.description.length >= 30
              ? `${props.description.substring(0, 35)}...`
              : props.description}
          </Text>
          <StarContainer evaluation={props.evaluation} />
        </View>
        <UilAngleRight size="30" color="blue" />
      </View>
    </TouchableOpacity>
  );
};

export default OuvrierProfil;
