import { Text, TouchableOpacity } from "react-native";
import React from "react";

const ProductCategory = (props) => {
  return (
    <TouchableOpacity
      className={
        props.category == props.value
          ? "px-5 h-11 items-center justify-center bg-blue-600 rounded-2xl ml-5"
          : "px-5 h-11 items-center justify-center border-gray-300 border-[1px] rounded-2xl ml-5"
      }
      onPress={() => {
        props.setCategory(props.value);
      }}
    >
      <Text
        className={
          props.category == props.value ? "text-white text-lg" : "text-lg"
        }
      >
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductCategory;
