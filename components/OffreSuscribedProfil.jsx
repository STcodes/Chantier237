import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import StarContainer from "../components/StarContainer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { React, useState, useEffect } from "react";
import { Button, Input } from "native-base";
import axios from "axios";

const OffreSuscribedProfil = (props) => {
  const navigation = useNavigation();
  const [isSelected, setisSelected] = useState(false);
  const [isNoted, setIsNoted] = useState(false);
  const [isChoiceLoading, setIsChoiceLoading] = useState(false);
  const [isNoteLoading, setIsNoteLoading] = useState(false);
  const [note, setNote] = useState(0);

  useEffect(() => {
    setisSelected(props.isSelected);
    setIsNoted(props.isNoted);
  }, []);

  const choiceApi = () => {
    setIsChoiceLoading(true);
    axios({
      method: "POST",
      url: "https://chantier237.camencorp.com/API/OFFER/st_choice&noteuser.php",
      responseType: "json",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: {
        action: "choice",
        id: props.rowid,
        offer: props.offer,
      },
    })
      .then((response) => {
        if (response.data.status == "ERROR") {
          ToastAndroid.show(
            "Erreur de selection. Veuiller ressayer",
            ToastAndroid.SHORT
          );
        }
        if (response.data.status == "OK") {
          setisSelected(true);
        }
      })
      .catch((error) => {
        ToastAndroid.show(
          "Erreur de selection. Veuiller ressayer",
          ToastAndroid.SHORT
        );
      })
      .finally(() => {
        setIsChoiceLoading(false);
      });
  };

  const noteApi = () => {
    if (note > 5) {
      ToastAndroid.show("Veuiller entrer une note valide", ToastAndroid.SHORT);
    } else {
      setIsNoteLoading(true);
      axios({
        method: "POST",
        url: "https://chantier237.camencorp.com/API/OFFER/st_choice&noteuser.php",
        responseType: "json",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: {
          action: "note",
          id: props.rowid,
          offer: props.offer,
          note: note,
        },
      })
        .then((response) => {
          if (response.data.status == "ERROR") {
            ToastAndroid.show(
              "Erreur de notation. Veuiller ressayer",
              ToastAndroid.SHORT
            );
          }
          if (response.data.status == "OK") {
            setIsNoted(true);
          }
        })
        .catch((error) => {
          ToastAndroid.show(
            "Erreur de notation. Veuiller ressayer",
            ToastAndroid.SHORT
          );
        })
        .finally(() => {
          setIsNoteLoading(false);
        });
    }
  };

  return (
    <View className="flex-row w-full gap-3 items-center justify-start mb-4 ">
      <View className="relative">
        <Image
          source={{ uri: props.imageUrl }}
          className="w-14 h-14 rounded-full bg-blue-200"
        />
        <View
          className={
            isSelected
              ? "absolute top-0 right-0 bg-blue-800 rounded-full p-1"
              : "hidden"
          }
        >
<<<<<<< HEAD
          <FontAwesome name="check" size={10} color="white" />
=======
          <FontAwesome name="check" size="10" color="white" />
>>>>>>> 86988c9fa6a41f443ad36f46c33dd0fb8b8605e0
        </View>
      </View>
      <View className="flex-row items-start justify-between w-[65%] border-b-[1px] pb-3 border-gray-400">
        <View className="w-[90%]">
          <Text className="text-[18px] mb-1" style={{ fontWeight: "600" }}>
            {props.name}
          </Text>
          <StarContainer evaluation={props.evaluation} />
          <View className="h-3"></View>

          {/* Button choisir */}
          {isSelected == 0 && (
            <Button
              variant={"outline"}
              _text={{
                color: "black",
              }}
              isLoading={isChoiceLoading}
              disabled={isChoiceLoading}
              size="sm"
              isLoadingText="selection..."
              style={{ borderRadius: 25 }}
              onPress={choiceApi}
            >
              <Text className="text-black">Choisir</Text>
            </Button>
          )}

          {/* Input noter */}
          {isSelected != 0 && isNoted == 0 && (
            <Input
              type="text"
              keyboardType="numeric"
              size="md"
              w="100%"
              py="0"
              onChangeText={(value) => {
                setNote(value);
              }}
              InputRightElement={
                <Button
                  size="md"
                  rounded="none"
                  w="3/6"
                  h="full"
                  style={{
                    backgroundColor: "rgba(0,0,255,0.5)",
                  }}
                  isLoading={isNoteLoading}
                  isDisabled={isNoteLoading}
                  onPress={() => {
                    noteApi();
                  }}
                >
                  Noter
                </Button>
              }
              placeholder="Note sur 5"
            />
          )}
        </View>
      </View>
      <TouchableOpacity
        className="items-center justify-center h-[100px]"
        onPress={() => {
          navigation.navigate("SingleOuvrier", {
            id: props.rowid,
          });
        }}
      >
<<<<<<< HEAD
        <FontAwesome name="angle-right" size={33} color="blue" />
=======
        <FontAwesome name="angle-right" size="33" color="blue" />
>>>>>>> 86988c9fa6a41f443ad36f46c33dd0fb8b8605e0
      </TouchableOpacity>
    </View>
  );
};

export default OffreSuscribedProfil;
