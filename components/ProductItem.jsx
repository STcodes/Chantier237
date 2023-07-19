import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ProductItem = (props) => {
  const [islike, setIsLike] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    for (i = 0; i < props.OwnLike.length; i++) {
      if (props.OwnLike[i] == props.id) {
        setIsLike(true);
      }
    }
  }, [props.OwnLike]);

  const likeApi = (action) => {
    axios({
      method: "GET",
      url: "https://chantier237.camencorp.com/API/MARKETPLACE/st_likeProduct.php",
      responseType: "json",
      headers: { "Access-Control-Allow-Origin": "*" },
      params: {
        action: action,
        product: props.id,
        id: props.idUser,
      },
    });
  };

  const checkLike = () => {
    for (i = 0; i < props.OwnLike.length; i++) {
      if (props.OwnLike[i] == props.id) {
        arr = props.OwnLike;
        arr.splice(i, 1);
        props.setOwnLike(arr);
        likeApi("unlike");
        setIsLike(false);
        return true;
      }
    }
    // Ajouter au like
    likeApi("like");
    setIsLike(true);
    props.OwnLike.push(props.id);
  };

  if (
    props.search == "" ||
    props.search === undefined ||
    props.search === null
  ) {
    return (
      <TouchableOpacity
        className="w-[42%] h-[190px] rounded-2xl bg-blue-100 overflow-hidden"
        onPress={() => {
          navigation.navigate("SingleProduct", { id: props.id });
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
          <Text className="text-base text-center">
            {props.name.length < 18
              ? props.name
              : `${props.name.substring(0, 17)}...`}
          </Text>
          <Text className="text-base text-center" style={{ fontWeight: 500 }}>
            {props.price} XAF
          </Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    if (props.name.toLowerCase().indexOf(props.search.toLowerCase()) != -1) {
      return (
        <TouchableOpacity
          className="w-[42%] h-[190px] rounded-2xl bg-blue-100 overflow-hidden"
          onPress={() => {
            navigation.navigate("SingleProduct", { id: props.id });
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
            <Text className="text-base text-center">
              {props.name.length > 15
                ? props.name
                : `${props.name.substring(0, 12)}...`}
            </Text>
            <Text className="text-base text-center" style={{ fontWeight: 500 }}>
              {props.price} XAF
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
};

export default ProductItem;
