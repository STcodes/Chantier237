import { TouchableOpacity, Text, Image } from "react-native";
import { React } from "react";

const OuvrierCategory = (props) => {
  return (
    <TouchableOpacity
      className={
        props.categorie == props.categoryCard
          ? "h-[130px] w-[115px] bg-blue-500 rounded-lg overflow-hidden mr-4 items-center justify-start"
          : "h-[130px] w-[115px] bg-blue-50 rounded-lg overflow-hidden mr-4 items-center justify-start"
      }
      onPress={() => {
        props.setCategory(props.categoryCard);
      }}
    >
      <Image source={props.image} className="h-[63%] w-full" />
      <Text
        className={
          props.categorie == props.categoryCard
            ? "text-white text-center mt-1 w-[75%]"
            : "text-black text-center mt-1 w-[75%]"
        }
        style={{ fontWeight: 500 }}
      >
        {props.categoryName}
      </Text>
    </TouchableOpacity>
  );
};

export default OuvrierCategory;
