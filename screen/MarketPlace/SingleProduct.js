import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import UilArrow from "@iconscout/react-native-unicons/icons/uil-angle-left";
import { NativeBaseProvider, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";

import { React, useState } from "react";

const ProductImage = (props) => {
  const setImageUrl = () => {
    props.setImageView(props.imageUrl);
  };

  return (
    <TouchableOpacity
      className={
        props.imageUrl == props.productimageUrl
          ? "rounded-lg w-[60px] h-[60px] overflow-hidden border-blue-700 border-[3px]"
          : "rounded-lg w-[60px] h-[60px] overflow-hidden opacity-90"
      }
      onPress={() => setImageUrl()}
    >
      <Image source={{ uri: props.imageUrl }} className="w-full h-full" />
    </TouchableOpacity>
  );
};

const SingleProduct = ({ route }) => {
  const navigation = useNavigation();
  const productImage = [
    {
      id: 1,
      imageUrl:
        "https://img.freepik.com/free-photo/one-person-typing-laptop-night-generated-by-ai_188544-27872.jpg?size=626&ext=jpg",
    },
    {
      id: 2,
      imageUrl:
        "https://img.freepik.com/free-photo/black-businessman-using-computer-laptop_53876-14803.jpg?size=626&ext=jpg",
    },
    {
      id: 3,
      imageUrl:
        "https://img.freepik.com/free-photo/empty-office-architects-with-computer-desk_482257-9527.jpg?size=626&ext=jpg",
    },
  ];
  const [productimageUrl, setImageView] = useState(productImage[1].imageUrl);

  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView className="bg-white w-full">
        <ScrollView
          className="flex-1 bg-white min-h-full"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full h-[340px] relative">
            <TouchableOpacity
              className="rounded-full w-4 h-4 absolute z-10 left-3 top-3 items-center justify-center p-4"
              style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <UilArrow size={30} color="white" />
            </TouchableOpacity>
            <Image
              source={{
                uri: productimageUrl,
              }}
              className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-100"
            />
            <View className="w-full h-full items-center justify-between pt-3 pb-7">
              <View
                className="px-5 py-2 rounded-lg overflow-hidden"
                style={{
                  fontWeight: 500,
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <Text
                  className="text-center text-white text-base"
                  style={{ fontWeight: 600 }}
                >
                  120 000 FCFA
                </Text>
              </View>
              <View className="flex-row mb-4" style={{ gap: 15 }}>
                {productImage.map((item) => {
                  return (
                    <ProductImage
                      key={item.id}
                      {...item}
                      productimageUrl={productimageUrl}
                      setImageView={setImageView}
                    />
                  );
                })}
              </View>
            </View>
          </View>
          <View className="w-full bg-white rounded-2xl -translate-y-8 pt-5 px-5">
            <View className="w-full">
              <Text className="text-sm">
                Catégorie {" >"}
                {"  "}
                <Text className="text-blue-700">Electronique</Text>
              </Text>
              <View className="flex-row items-center justify-between w-full">
                <Text
                  style={{ fontWeight: 600 }}
                  className="text-xl tracking-wider"
                >
                  Laptop DELL Icore 5
                </Text>

                <AntDesign name="heart" size={35} mr="10" color="red" />
              </View>
              <View className="gap-x-5 mt-4 flex-row items-center justify-start flex-wrap">
                <View className="items-start justify-start gap-y-3">
                  <View className="flex-row items-center justify-start gap-x-2">
                    <Ionicons name="star" size={22} color="orange" />
                    <Text className="text-gray-700 text-sm">120 likes</Text>
                  </View>
                  <View className="flex-row items-center justify-start gap-x-2">
                    <FontAwesome5 name="thumbs-up" size={20} color="blue" />
                    <Text className="text-gray-700 text-sm">
                      5 recommandations
                    </Text>
                  </View>
                </View>
                <View className="items-start justify-start gap-y-4">
                  <View className="flex-row items-center justify-start gap-x-2">
                    <FontAwesome5 name="calendar-alt" size={20} color="blue" />
                    <Text className="text-gray-700 text-sm">
                      Il y'a 02 jours
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-start gap-x-2">
                    <FontAwesome5
                      name="map-marker-alt"
                      size={20}
                      color="blue"
                    />
                    <Text className="text-gray-700 text-sm">Bonamoussadi</Text>
                  </View>
                </View>
              </View>
              <Text
                className="text-lg mb-1 mt-5 text-blue-700 tracking-wide"
                style={{ fontWeight: 600 }}
              >
                Description
              </Text>
              <Text
                style={{ fontWeight: 400, lineHeight: 18 }}
                className="text-[16px] tracking-wide leading-10"
              >
                These components may be useful for certain applications. For an
                exhaustive list of components and APIs, check out the sidebar to
                the left (or menu above, if you are on a narrow screen).These
                components may be useful for certain applications. For an
                exhaustive list of components and APIs, check out the sidebar to
                the left (or menu above, if you are on a narrow screen).
              </Text>
              <View className="items-center justify-center flex-row mt-5 gap-x-5">
                <Button
                  style={{
                    backgroundColor: "white",
                    width: "45%",
                    height: 47,
                    borderRadius: 20,
                    borderWidth: 1,
                    fontSize: 30,
                    fontWeight: 600,
                    justifyContent: "center",
                  }}
                  // isLoading={isLoading}
                  // isDisabled={isLoading}
                  size="lg"
                  // isLoadingText="Enregistrement..."
                  // onPress={api}
                >
                  <Text
                    className="text-[18px] text-black tracking-widest"
                    style={{ fontWeight: 500 }}
                  >
                    Appeler
                  </Text>
                </Button>
                <Button
                  style={{
                    backgroundColor: "rgba(0,0,0,1)",
                    width: "45%",
                    height: 47,
                    borderRadius: 20,
                    fontSize: 30,
                    fontWeight: 600,
                    justifyContent: "center",
                  }}
                  // isLoading={isLoading}
                  // isDisabled={isLoading}
                  size="lg"
                  // isLoadingText="Enregistrement..."
                  // onPress={api}
                >
                  <Text
                    className="text-[18px] text-white tracking-widest"
                    style={{ fontWeight: 500 }}
                  >
                    Recommander
                  </Text>
                </Button>
              </View>
              <View className="items-center justify-center flex-row mt-5 gap-x-5">
                <Button
                  style={{
                    backgroundColor: "white",
                    width: "45%",
                    height: 47,
                    borderRadius: 20,
                    borderWidth: 1,
                    fontSize: 30,
                    fontWeight: 600,
                    justifyContent: "center",
                  }}
                  // isLoading={isLoading}
                  // isDisabled={isLoading}
                  size="lg"
                  // isLoadingText="Enregistrement..."
                  // onPress={api}
                >
                  <Text
                    className="text-[18px] text-black tracking-widest"
                    style={{ fontWeight: 500 }}
                  >
                    Terminer
                  </Text>
                </Button>
                <Button
                  style={{
                    backgroundColor: "red",
                    width: "45%",
                    height: 47,
                    borderRadius: 20,
                    fontSize: 30,
                    fontWeight: 600,
                    justifyContent: "center",
                  }}
                  // isLoading={isLoading}
                  // isDisabled={isLoading}
                  size="lg"
                  // isLoadingText="Enregistrement..."
                  // onPress={api}
                >
                  <Text
                    className="text-[18px] text-white tracking-widest"
                    style={{ fontWeight: 500 }}
                  >
                    Annuler
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default SingleProduct;
