import { View, TouchableOpacity } from "react-native";
import { React, useState } from "react";
import { Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const AlertImage = (props) => {
  const [isShow, setIsShow] = useState(false);

  if (isShow) {
    return (
      <View
        className={
          isShow
            ? "absolute z-30 w-[100%] h-[200px] rounded-lg m-auto overflow-hidden top-2 "
            : "hidden"
        }
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      >
        <View
          className="h-10 w-10 items-center justify-center absolute z-40 right-1 top-1 bg-gray-500 rounded-full"
          onPress={() => {
            setIsShow(true);
          }}
        >
          <FontAwesome
            name="remove"
            size={27}
            color="white"
            onPress={() => {
              setIsShow(false);
            }}
          />
        </View>
        <Image
          source={{
            uri: props.imageUrl,
          }}
          className="w-full h-full object-cover"
        />
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsShow(true);
        }}
        className="bg-slate-400 mr-6 mb-6 rounded-lg"
      >
        <Image
          className="w-[80px] h-[80px] rounded-lg"
          source={{
            uri: props.imageUrl,
          }}
        />
      </TouchableOpacity>
    );
  }
};

export default AlertImage;
