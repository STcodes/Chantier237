import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { React, useState, useEffect } from "react";
import {
  NativeBaseProvider,
  Input,
  FormControl,
  Select,
  Button,
  TextArea,
} from "native-base";
import { LogoImage } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import DatePicker from "../../components/DatePicker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { imageEmpty } from "../../assets";

const CompleteProfil = (props) => {
  const navigation = useNavigation();
  let formData = new FormData();
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState(["", "", "", "", "", ""]);
  const [dataInfo, setDataInfo] = useState({
    user: props.userId,
    sexe: "",
    experience: "",
    phone: "",
    dateNaiss: "2000-1-1",
    description: "",
  });
  const [isDataInfoEmpty, setDataInfoEmpty] = useState({
    sexe: false,
    experience: false,
    phone: false,
    dateNaiss: false,
    description: false,
  });

  const stToast = (message) => {
    if (Platform.OS == "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    }
  };

  const pickImage = async (id) => {
    let galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (galleryStatus.status == "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 10],
        quality: 1,
      });

      if (!result.canceled) {
        setImageData((prev) =>
          prev.map((item, key) =>
            key === id - 1 ? result.assets[0].uri : item
          )
        );
      }
    }
  };

  const GetImageGallery = (props) => {
    return (
      <TouchableOpacity
        className="w-[120px] h-[110px] items-center justify-center "
        onPress={() => {
          pickImage(props.id);
        }}
      >
        {imageData[props.id - 1] != "" ? (
          <Image
            source={{ uri: imageData[props.id - 1] }}
            className="w-[110px] h-[90px] rounded-sm border-[1px] border-blue-500"
          />
        ) : (
          <FontAwesome name="image" size={100} color="black" />
        )}
      </TouchableOpacity>
    );
  };

  const isDataEmpty = () => {
    for (const [cle, valeur] of Object.entries(dataInfo)) {
      if (valeur === "") {
        stToast("Veuillez entrer tous les champs");
        setDataInfoEmpty((prev) => {
          return { ...prev, [cle]: true };
        });
        return false;
      } else {
        setDataInfoEmpty((prev) => {
          return { ...prev, [cle]: false };
        });
      }
    }

    for (let index = 0; index < imageData.length; index++) {
      if (imageData[index] == "") {
        stToast("Veuillez inserer les images");
        return false;
      }
    }
    return true;
  };

  const submitData = () => {
    if (isDataEmpty()) {
      for (let i = 0; i < imageData.length; i++) {
        formData.append(`file${i + 1}`, {
          uri:
            Platform.OS === "android"
              ? "file:///" + imageData[i].split("file:/").join("")
              : imageData[i],
          type: mime.getType(imageData[i]),
          name: imageData[i].split("/").pop(),
        });
      }
      formData.append("user", dataInfo.user);
      formData.append("sexe", dataInfo.sexe);
      formData.append("experience", dataInfo.experience);
      formData.append("phone", dataInfo.phone);
      formData.append("dateNaiss", dataInfo.dateNaiss);
      formData.append("description", dataInfo.description);
      // ********API
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView className="bg-white w-full">
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View
          className="w-full flex-row items-center justify-between px-2 py-2 bg-white"
          style={{ borderBottomColor: "gray", borderBottomWidth: 1 }}
        >
          <View className="flex-row gap-1 items-center">
            <Image source={LogoImage} className="w-10 h-10" />
            <Text className="text-bold text-[20px] tracking-wider">
              Chantier237
            </Text>
          </View>
        </View>
        <ScrollView
          className="bg-white h-full w-full pb-14 px-5"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-[24px] tracking-wider text-gray-800 text-left my-5">
            <Text className="text-[38px] text-blue-700">C</Text>ompleter votre
            profil
          </Text>

          {/* Image de profil */}

          <Text className="mb-1 text-lg">Photo de profil et banniere</Text>
          <Text className="text-sm text-black tracking-wide mb-5">
            (cliquer pour selectionner)
          </Text>
          <View className="w-full mb-7 items-center justify-center">
            <TouchableOpacity
              className="w-full items-center overflow-hidden h-52"
              onPress={() => {
                pickImage(2);
              }}
            >
              {imageData[1] != "" ? (
                <Image
                  source={{ uri: imageData[1] }}
                  className="w-full h-full rounded-2xl border-[2px] border-blue-700"
                />
              ) : (
                <Image
                  source={imageEmpty}
                  className="w-full h-full rounded-2xl border-[2px] border-blue-700"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white border-blue-700 border-2 w-[100px] h-[100px] items-center justify-center rounded-full -translate-y-12 -mb-12 overflow-hidden z-10"
              onPress={() => {
                pickImage(1);
              }}
            >
              {imageData[0] != "" ? (
                <Image
                  source={{ uri: imageData[0] }}
                  className="w-full h-full rounded-full"
                />
              ) : (
                <FontAwesome
                  name="user"
                  color="black"
                  style={{ fontSize: 80 }}
                />
              )}
            </TouchableOpacity>
          </View>

          {/* Sexe */}
          <Text className="mb-2 text-base">Sexe</Text>
          <FormControl isInvalid={isDataInfoEmpty.sexe} mb="5">
            <Select
              accessibilityLabel="Votre sexe"
              placeholder="Selectionner votre sexe"
              className="text-sm"
              _selectedItem={{
                bg: "teal.600",
              }}
              mt="1"
              onValueChange={(value) =>
                setDataInfo({ ...dataInfo, sexe: value })
              }
            >
              <Select.Item label="Homme" value="homme" />
              <Select.Item label="Femme" value="femme" />
              <Select.Item label="Neutre" value="neutre" />
            </Select>
            <FormControl.ErrorMessage>
              Ce champ ne doit pas etre vide.
            </FormControl.ErrorMessage>
          </FormControl>

          {/* Anneés d'experience */}
          <Text className="mb-2 text-base">Anneés d'experience</Text>
          <FormControl isInvalid={isDataInfoEmpty.experience} mb="5">
            <Input
              placeholder="Années d'expérience"
              type="text"
              keyboardType="numeric"
              className="text-sm"
              onChangeText={(value) =>
                setDataInfo({ ...dataInfo, experience: value })
              }
            />
            <FormControl.ErrorMessage>
              Ce champ ne doit pas etre vide.
            </FormControl.ErrorMessage>
          </FormControl>

          {/* Numero de telephone */}
          <Text className="mb-2 text-base">Numero de téléphone</Text>
          <FormControl isInvalid={isDataInfoEmpty.phone} mb="5">
            <Input
              placeholder="Numero de téléphone"
              type="text"
              keyboardType="numeric"
              className="text-sm"
              onChangeText={(value) =>
                setDataInfo({ ...dataInfo, phone: value })
              }
            />
            <FormControl.ErrorMessage>
              Ce champ ne doit pas etre vide.
            </FormControl.ErrorMessage>
          </FormControl>

          {/* Date de naissance */}
          <Text className="mb-2 text-base">Date de naissance</Text>
          <DatePicker
            defaultDate={dataInfo.dateNaiss}
            onDateChange={(value) => {
              setDataInfo({
                ...dataInfo,
                dateNaiss: `${value.getFullYear()}-${
                  value.getMonth() + 1
                }-${value.getDate()}`,
              });
            }}
          />
          {isDataInfoEmpty.dateNaiss && (
            <Text className="mb-5 text-red-500 text-sm text-left">
              Ce champ ne doit pas etre vide
            </Text>
          )}

          {/* Description */}
          <Text className="mb-2 text-base mt-5">Description</Text>
          <TextArea
            totalLines={20}
            isInvalid={isDataInfoEmpty.description}
            placeholder="Votre descriptif"
            value={dataInfo.description}
            onChangeText={(value) =>
              setDataInfo({ ...dataInfo, description: value })
            }
          />
          {isDataInfoEmpty.description && (
            <Text className="mb-5 text-red-500 text-sm text-left mt-2">
              Ce champ ne doit pas etre vide
            </Text>
          )}

          {/* Images */}

          <Text className="text-lg text-black tracking-wide mt-7">
            Photos de vos réalsations
          </Text>
          <Text className="text-base text-black tracking-wide">
            (cliquer pour selectionner)
          </Text>
          <View
            className="w-full items-center justify-start flex-row flex-wrap pt-5 mb-2"
            style={{ gap: 30 }}
          >
            <GetImageGallery id={3} />
            <GetImageGallery id={4} />
            <GetImageGallery id={5} />
            <GetImageGallery id={6} />
          </View>

          <Button
            style={{
              backgroundColor: "rgba(0,0,0,0.9)",
              width: "100%",
              height: 60,
              borderRadius: 7,
              fontSize: 25,
              marginTop: 20,
            }}
            onPress={submitData}
            size="lg"
            colorScheme="black"
            isLoading={isLoading}
            disabled={isLoading}
            isLoadingText="Enregistrement..."
          >
            <Text className="text-white text-lg" style={{ fontWeight: 600 }}>
              Enregistrer
            </Text>
          </Button>

          <View className="h-20"></View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default CompleteProfil;
