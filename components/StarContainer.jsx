import { View, Text } from "react-native";
import React from "react";
import UilStar from "@iconscout/react-native-unicons/icons/uil-star";

const StarContainer = ({ evaluation }) => {
  let size = 20;
  let colorActive = "orange";
  let colorNoActive = "gray";

  if (evaluation == 5) {
    return (
      <View className="flex-row gap-[4px]">
        <UilStar size={size} color={colorActive} />
        <UilStar size={size} color={colorActive} />
        <UilStar size={size} color={colorActive} />
        <UilStar size={size} color={colorActive} />
        <UilStar size={size} color={colorActive} />
      </View>
    );
  }
  if (evaluation == 4) {
    return (
      <View className="flex-row gap-[4px] ">
        <UilStar size={size} color={colorActive} />
        <UilStar size={size} color={colorActive} />
        <UilStar size={size} color={colorActive} />
        <UilStar size={size} color={colorActive} />
        <UilStar size={size} color={colorNoActive} />
      </View>
    );
  }
  if (evaluation == 3) {
    return (
      <View className="flex-row gap-[4px]">
        <UilStar size={size} color={colorActive} />
        <UilStar size={size} color={colorActive} />
        <UilStar size={size} color={colorActive} />
        <UilStar size={size} color={colorNoActive} />
        <UilStar size={size} color={colorNoActive} />
      </View>
    );
  }
  if (evaluation == 2) {
    return (
      <View className="flex-row gap-[4px]">
        <UilStar size={size} color={colorActive} />
        <UilStar size={size} color={colorActive} />
        <UilStar size={size} color={colorNoActive} />
        <UilStar size={size} color={colorNoActive} />
        <UilStar size={size} color={colorNoActive} />
      </View>
    );
  }
  if (evaluation == 1) {
    return (
      <View className="flex-row gap-[4px]">
        <UilStar size={size} color={colorActive} />
        <UilStar size={size} color={colorNoActive} />
        <UilStar size={size} color={colorNoActive} />
        <UilStar size={size} color={colorNoActive} />
        <UilStar size={size} color={colorNoActive} />
      </View>
    );
  }
};

export default StarContainer;
