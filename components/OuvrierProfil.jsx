import { View, Text, Image, TouchableOpacity } from "react-native";
import StarContainer from "../components/StarContainer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
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
        className="w-14 h-14 rounded-full bg-blue-200"
      />
      <View className="flex-row items-start justify-between w-[77%] border-b-[1px] border-gray-400 pb-3">
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
<<<<<<< HEAD
        <FontAwesome name="angle-right" size={30} color="blue" />
=======
        <FontAwesome name="angle-right" size="30" color="blue" />
>>>>>>> 86988c9fa6a41f443ad36f46c33dd0fb8b8605e0
      </View>
    </TouchableOpacity>
  );
};

export default OuvrierProfil;
