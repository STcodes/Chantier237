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
import { React, useState } from "react";
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
import axios from "axios";

const CompleteProfil = (props) => {
  const navigation = useNavigation();
  let formData = new FormData();
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState(["", "", "", "", "", ""]);
  const [dataInfo, setDataInfo] = useState({
    user: props.userId,
    sexe: "",
    job: "",
    jobCategory: "",
    experience: "",
    dateNaiss: "2000-1-1",
    description: "",
  });
  const [isDataInfoEmpty, setDataInfoEmpty] = useState({
    sexe: false,
    job: false,
    jobCategory: false,
    experience: false,
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
      formData.append("job", dataInfo.job);
      formData.append("jobCategory", dataInfo.jobCategory);
      formData.append("experience", dataInfo.experience);
      formData.append("dateNaiss", dataInfo.dateNaiss);
      formData.append("description", dataInfo.description);
      // ********API
      api();
    }
  };

  const api = () => {
    setIsLoading(true);
    axios
      .post(
        "https://chantier237.camencorp.com/API/PROFIL/st_completeProfil.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000,
        }
      )
      .then((response) => {
        if (response.data.status == "ERROR") {
          stToast("Erreur lors de l'enregistrement. Veuillez reessayer.");
        }
        if (response.data.status == "OK") {
          stToast("Enregistrement reussi");
          navigation.reset({
            index: 0,
            routes: [{ name: "ProfilHome" }],
          });
        }
      })
      .catch((error) => {
        stToast("Erreur lors de l'enregistrement. Veuillez reessayer.");
      })
      .finally(() => {
        setIsLoading(false);
      });
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

          {/* metier */}
          <Text className="mb-2 text-base">Votre metier</Text>
          <FormControl isInvalid={isDataInfoEmpty.job} mb="5">
            <Input
              placeholder="Nom de votre metier"
              type="text"
              className="text-sm"
              onChangeText={(value) => setDataInfo({ ...dataInfo, job: value })}
            />
            <FormControl.ErrorMessage>
              Ce champ ne doit pas etre vide.
            </FormControl.ErrorMessage>
          </FormControl>

          {/* Categorie */}
          <Text className="mb-2 text-base">Votre categorie</Text>
          <FormControl isInvalid={isDataInfoEmpty.jobCategory} mb="5">
            <Select
              accessibilityLabel="Selectionner votre categorie"
              placeholder="Selectionner votre categorie"
              className="text-sm"
              _selectedItem={{
                bg: "teal.600",
              }}
              mt="1"
              onValueChange={(value) =>
                setDataInfo({ ...dataInfo, jobCategory: value })
              }
            >
              <Select.Item
                label="Ingenieur genie civil"
                value="ing_genie_civil"
              />
              <Select.Item label="Staffeur" value="staffeur" />
              <Select.Item label="Macons" value="macon" />
              <Select.Item label="Manoeuvre" value="manoeuvre" />
              <Select.Item label="Crepisseur" value="crepisseur" />
              <Select.Item label="Livreur d'eau" value="livreur_eau" />
              <Select.Item
                label="Travailleurs d'etancheite"
                value="etancheite"
              />
              <Select.Item label="Plombiers" value="plombier" />
              <Select.Item label="Electricien" value="electricien" />
              <Select.Item label="Ferrailleur" value="ferrailleur" />
              <Select.Item label="Travailleur de fouille" value="fouille" />
              <Select.Item label="Carreleur" value="carreleur" />
              <Select.Item label="Menuisier" value="menuisier" />
              <Select.Item label="Charpentier" value="charpentier" />
              <Select.Item label="Menagere" value="menagere" />
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
