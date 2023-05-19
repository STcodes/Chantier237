import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

const ProductItem = (props) => {
  const [islike, setIsLike] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    for (i = 0; i < props.OwnLike.length; i++) {
      if (props.OwnLike[i] == props.id) {
        setIsLike(true);
      }
    }
  });

  const checkLike = () => {
    for (i = 0; i < props.OwnLike.length; i++) {
      if (props.OwnLike[i] == props.id) {
        arr = props.OwnLike;
        arr.splice(i, 1);
        props.setOwnLike(arr);
        setIsLike(false);
        Toast.show("Retiré des favoris", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
        });
        return true;
      }
    }
    // Ajouter au like
    setIsLike(true);
    Toast.show("Ajouté aux favoris", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
    });
    props.OwnLike.push(props.id);
  };

  return (
    <TouchableOpacity
      className="w-[42%] h-[190px] rounded-2xl bg-blue-100 overflow-hidden"
      onPress={() => {
        navigation.navigate("SingleProduct");
      }}
    >
      <View className="h-[70%] relative">
        <Image
          className="w-full h-full"
          source={{
            uri: props.imageUrl,
          }}
        />
        <TouchableOpacity
          className={
            islike
              ? "rounded-full w-9 h-9 items-center justify-center absolute right-1 top-1"
              : "bg-white rounded-full w-8 h-8 items-center justify-center absolute right-1 top-1"
          }
          onPress={() => checkLike()}
        >
          <Ionicons
            name={islike ? "heart" : "heart-outline"}
            size={islike ? 26 : 22}
            mr="10"
            color={islike ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>
      <View className="bg-blue-50 items-center justify-center h-[30%]">
        <Text className="text-base text-center">{props.name}</Text>
        <Text className="text-base text-center" style={{ fontWeight: 500 }}>
          {props.price} FCFA
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
