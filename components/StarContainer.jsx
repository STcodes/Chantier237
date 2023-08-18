import { View } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const StarContainer = ({ evaluation }) => {
  let size = 20;
  let colorActive = "orange";
  let colorNoActive = "black";

  if (evaluation == 5) {
    return (
      <View className="flex-row gap-[4px]">
        <FontAwesome name="star" size={size} color={colorActive} />
        <FontAwesome name="star" size={size} color={colorActive} />
        <FontAwesome name="star" size={size} color={colorActive} />
        <FontAwesome name="star" size={size} color={colorActive} />
        <FontAwesome name="star" size={size} color={colorActive} />
      </View>
    );
  } else if (4 <= evaluation && evaluation < 5) {
    return (
      <View className="flex-row gap-[4px] ">
        <FontAwesome name="star" size={size} color={colorActive} />
        <FontAwesome name="star" size={size} color={colorActive} />
        <FontAwesome name="star" size={size} color={colorActive} />
        <FontAwesome name="star" size={size} color={colorActive} />
        <FontAwesome name="star" size={size} color={colorNoActive} />
      </View>
    );
  } else if (3 <= evaluation && evaluation < 4) {
    return (
      <View className="flex-row gap-[4px]">
        <FontAwesome name="star" size={size} color={colorActive} />
        <FontAwesome name="star" size={size} color={colorActive} />
        <FontAwesome name="star" size={size} color={colorActive} />
        <FontAwesome name="star" size={size} color={colorNoActive} />
        <FontAwesome name="star" size={size} color={colorNoActive} />
      </View>
    );
  } else if (2 <= evaluation && evaluation < 3) {
    return (
      <View className="flex-row gap-[4px]">
        <FontAwesome name="star" size={size} color={colorActive} />
        <FontAwesome name="star" size={size} color={colorActive} />
        <FontAwesome name="star" size={size} color={colorNoActive} />
        <FontAwesome name="star" size={size} color={colorNoActive} />
        <FontAwesome name="star" size={size} color={colorNoActive} />
      </View>
    );
  } else if (0 < evaluation && evaluation < 2) {
    return (
      <View className="flex-row gap-[4px]">
        <FontAwesome name="star" size={size} color={colorActive} />
        <FontAwesome name="star" size={size} color={colorNoActive} />
        <FontAwesome name="star" size={size} color={colorNoActive} />
        <FontAwesome name="star" size={size} color={colorNoActive} />
        <FontAwesome name="star" size={size} color={colorNoActive} />
      </View>
    );
  } else if (evaluation == 0) {
    return (
      <View className="flex-row gap-[4px]">
        <FontAwesome name="star" size={size} color={colorNoActive} />
        <FontAwesome name="star" size={size} color={colorNoActive} />
        <FontAwesome name="star" size={size} color={colorNoActive} />
        <FontAwesome name="star" size={size} color={colorNoActive} />
        <FontAwesome name="star" size={size} color={colorNoActive} />
      </View>
    );
  }
};

export default StarContainer;
