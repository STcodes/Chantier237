import { View } from "react-native";
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
  if (4 <= evaluation && evaluation < 5) {
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
  if (3 <= evaluation && evaluation < 4) {
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
  if (2 <= evaluation && evaluation < 3) {
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
  if (0 < evaluation && evaluation < 2) {
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
  if (evaluation == 0) {
    return (
      <View className="flex-row gap-[4px]">
        <UilStar size={size} color={colorNoActive} />
        <UilStar size={size} color={colorNoActive} />
        <UilStar size={size} color={colorNoActive} />
        <UilStar size={size} color={colorNoActive} />
        <UilStar size={size} color={colorNoActive} />
      </View>
    );
  }
};

export default StarContainer;
