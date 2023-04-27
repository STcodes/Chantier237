import { View, Text, Image, TouchableOpacity } from "react-native";
import StarContainer from "../components/StarContainer";
import UilAngleRight from "@iconscout/react-native-unicons/icons/uil-angle-right";
import UilAngleCheck from "@iconscout/react-native-unicons/icons/uil-check";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { React, useState, useEffect } from "react";
import { Button, Input } from "native-base";

const OffreSuscribedProfil = (props) => {
  const navigation = useNavigation();
  const [isSelected, setisSelected] = useState(false);
  const [isNoted, setIsNoted] = useState(false);

  useEffect(() => {
    setisSelected(props.isSelected);
    setIsNoted(props.isNoted);
  }, []);

  return (
    <View
      className="flex-row w-full gap-3 items-center justify-start mb-4 "
      onPress={() => {
        navigation.navigate("SingleOuvrier", { id: 57 });
      }}
    >
      <View className="relative">
        <Image
          source={{
            uri: "https://img.freepik.com/free-photo/young-african-american-man-s-portrait-isolated-yellow-facial-expression_155003-44277.jpg?size=626&ext=jpg&uid=R88212060&semt=ais",
          }}
          className="w-14 h-14 rounded-full"
        />
        <View
          className={
            isSelected
              ? "absolute top-0 right-0 bg-blue-800 rounded-full"
              : "hidden"
          }
        >
          <UilAngleCheck size={16} color="white" />
        </View>
      </View>
      <Animatable.View
        animation={"bounceIn"}
        className="flex-row items-start justify-between w-[65%] border-b-[1px] pb-3 border-gray-400"
      >
        <View className="w-[90%]">
          <Text className="text-[18px] mb-1" style={{ fontWeight: "600" }}>
            SITIO thierry
          </Text>
          <StarContainer evaluation={4} />
          <View className="h-3"></View>

          {/* Button choisir */}
          {!isSelected ? (
            <Button
              variant={"outline"}
              _text={{
                color: "black",
              }}
              isLoading={false}
              size="sm"
              isLoadingText="selection..."
              style={{ borderRadius: 25 }}
            >
              <Text className="text-black">Choisir</Text>
            </Button>
          ) : (
            <></>
          )}

          {/* Input noter */}
          {isSelected && !isNoted ? (
            <Input
              type="text"
              keyboardType="numeric"
              size="md"
              w="100%"
              py="0"
              InputRightElement={
                <Button
                  size="md"
                  rounded="none"
                  w="3/6"
                  h="full"
                  style={{
                    backgroundColor: "rgba(0,0,255,0.5)",
                  }}
                >
                  Noter
                </Button>
              }
              placeholder="Note sur 5"
            />
          ) : (
            <></>
          )}
        </View>
      </Animatable.View>
      <TouchableOpacity
        className="items-center justify-center h-[100px]"
        onPress={() => {
          navigation.navigate("Ouvrier", {
            screen: "SingleOuvrier",
            params: { id: 56 },
          });
        }}
      >
        <UilAngleRight size="33" color="blue" />
      </TouchableOpacity>
    </View>
  );
};

export default OffreSuscribedProfil;
