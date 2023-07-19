import { React, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  StatusBar,
} from "react-native";
import {
  Menu,
  NativeBaseProvider,
  FormControl,
  Input,
  Select,
  TextArea,
  Button,
} from "native-base";
import Toast from "react-native-root-toast";
import UilTreePoint from "@iconscout/react-native-unicons/icons/uil-ellipsis-v";
import { useNavigation } from "@react-navigation/native";
import { LogoImage } from "../../assets";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

const CreateProduct = (props) => {
  const navigation = useNavigation();
  let formData = new FormData();
  const [imageProduct, setImageProduct] = useState(["", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState({
    user: props.idUser,
    name: "",
    location: "",
    price: "",
    category: "",
    description: "",
  });
  const [isDataEmpty, setIsDataEmpty] = useState({
    name: false,
    location: false,
    price: false,
    category: false,
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

  const submitData = () => {
    if (
      inputData.name != "" &&
      inputData.location != "" &&
      inputData.price != 0 &&
      inputData.category != 0 &&
      inputData.description != "" &&
      imageProduct[0] != "" &&
      imageProduct[1] != "" &&
      imageProduct[2] != ""
    ) {
      for (let i = 0; i < imageProduct.length; i++) {
        formData.append(`file${i + 1}`, {
          uri:
            Platform.OS === "android"
              ? "file:///" + imageProduct[i].split("file:/").join("")
              : imageProduct[i],
          type: mime.getType(imageProduct[i]),
          name: imageProduct[i].split("/").pop(),
        });
      }
      formData.append("name", inputData.name);
      formData.append("category", inputData.category);
      formData.append("description", inputData.description);
      formData.append("location", inputData.location);
      formData.append("price", inputData.price);
      formData.append("user", inputData.user);
      console.log(
        "**********************************************************************"
      );
      api();
    } else {
      if (inputData.name == "") {
        setIsDataEmpty((prev) => {
          return { ...prev, name: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, name: false };
        });
      }
      if (inputData.location == "") {
        setIsDataEmpty((prev) => {
          return { ...prev, location: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, location: false };
        });
      }
      if (inputData.price == 0) {
        setIsDataEmpty((prev) => {
          return { ...prev, price: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, price: false };
        });
      }
      if (inputData.category == 0) {
        setIsDataEmpty((prev) => {
          return { ...prev, category: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, category: false };
        });
      }
      if (inputData.description == 0) {
        setIsDataEmpty((prev) => {
          return { ...prev, description: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, description: false };
        });
      }
      if (
        imageProduct[0] == "" ||
        imageProduct[1] == "" ||
        imageProduct[2] == ""
      ) {
        stToast("Veuillez enregistrer toutes les images");
      }
    }
  };

  // component to take image
  const GetImageGallery = (props) => {
    const [isSelected, setIsSelected] = useState(false);
    const pickImage = async () => {
      let galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (galleryStatus.status == "granted") {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          let imageUri = result.assets[0].uri;
          props.setImageProduct((prev) =>
            prev.map((item, key) => (key === props.id - 1 ? imageUri : item))
          );
          setIsSelected(true);
        }
      }
    };

    return (
      <TouchableOpacity
        className="w-[80px] h-[60px] items-center justify-center"
        onPress={pickImage}
      >
        {props.imageProduct[props.id - 1] != "" ? (
          <Image
            source={{ uri: props.imageProduct[props.id - 1] }}
            className="w-[75px] h-[55px] rounded-sm border-[1px] border-blue-500"
          />
        ) : (
          <FontAwesome name="image" size={60} color="black" />
        )}
      </TouchableOpacity>
    );
  };

  const api = () => {
    setIsLoading(true);
    axios
      .post(
        "https://chantier237.camencorp.com/API/MARKETPLACE/st_createProduct.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.data.status == "ERROR") {
          stToast("Erreur lors de l'enregistrement. Veuillez reessayer.");
        }
        if (response.data.status == "OK") {
          stToast("Article publié");
          navigation.navigate("MarketPlaceHome");
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
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView className="bg-white w-full">
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
          <View>
            <Menu
              w="190"
              trigger={(triggerProps) => {
                return (
                  <TouchableOpacity
                    accessibilityLabel="More options menu"
                    {...triggerProps}
                  >
                    <UilTreePoint color="black" size={24} />
                  </TouchableOpacity>
                );
              }}
            >
              <Menu.Item
                onPress={() => {
                  navigation.navigate("MarketPlaceHome");
                }}
              >
                <Text className="text-lg">Tous les articles</Text>
              </Menu.Item>
              <Menu.Item
                onPress={() => {
                  navigation.navigate("ListOwnProduct");
                }}
              >
                <Text className="text-lg">Vos articles</Text>
              </Menu.Item>
            </Menu>
          </View>
        </View>
        <ScrollView
          className="bg-white h-full w-full pb-14"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full px-4 py-4 mb-3">
            <Text className="text-[25px] tracking-wider pl-1 text-gray-800">
              <Text
                className="text-[35px] tracking-wider text-blue-700"
                style={{ fontWeight: 500 }}
              >
                A
              </Text>
              jouter un article
            </Text>
          </View>

          <View className="w-full h-full gap-y-5 px-5 items-start justify-start">
            {/* name */}

            <FormControl isInvalid={isDataEmpty.name}>
              <Input
                placeholder="Nom du produit"
                type="text"
                className="text-base"
                name="name"
                onChangeText={(value) =>
                  setInputData({ ...inputData, name: value })
                }
              />
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide.
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Location */}

            <FormControl isInvalid={isDataEmpty.location}>
              <Input
                placeholder="Lieu"
                type="text"
                className="text-base"
                onChangeText={(value) =>
                  setInputData({ ...inputData, location: value })
                }
              />
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide.
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Price */}

            <FormControl isInvalid={isDataEmpty.price}>
              <Input
                placeholder="Prix (XAF)"
                keyboardType="numeric"
                type="text"
                className="text-base"
                onChangeText={(value) =>
                  setInputData({ ...inputData, price: value })
                }
              />
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide.
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Category */}

            <FormControl isInvalid={isDataEmpty.category}>
              <Select
                style={{ height: 44, fontSize: 16 }}
                accessibilityLabel="Categorie du produit"
                placeholder="Categorie du produit"
                className="text-sm"
                _selectedItem={{
                  bg: "teal.600",
                }}
                mt="1"
                onValueChange={(value) =>
                  setInputData({ ...inputData, category: value })
                }
              >
                <Select.Item label="Bois" value="bois" />
                <Select.Item label="Féraille" value="feraille" />
                <Select.Item label="Véhicule" value="vehicule" />
                <Select.Item label="Appareil" value="appareil" />
                <Select.Item label="Téléphone" value="telephone" />
                <Select.Item label="Matériel" value="materiel" />
                <Select.Item label="Autre" value="other" />
              </Select>
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide.
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Description */}
            <Text className="mb-2 text-base">Description du produit</Text>
            <TextArea
              totalLines={20}
              isInvalid={isDataEmpty.description}
              placeholder="Description de l'emploi"
              onChangeText={(value) =>
                setInputData({ ...inputData, description: value })
              }
            />

            {/* Images */}

            <Text className="text-lg text-black tracking-wide mt-5">
              Ajouter des images à votre produit
            </Text>

            <View
              className="w-full items-start justify-start flex-row"
              style={{ gap: 30 }}
            >
              <GetImageGallery
                id={1}
                imageProduct={imageProduct}
                setImageProduct={setImageProduct}
              />
              <GetImageGallery
                id={2}
                imageProduct={imageProduct}
                setImageProduct={setImageProduct}
              />
              <GetImageGallery
                id={3}
                imageProduct={imageProduct}
                setImageProduct={setImageProduct}
              />
            </View>

            <Button
              style={{
                backgroundColor: "rgba(0,0,0,0.9)",
                width: "100%",
                height: 50,
                borderRadius: 7,
                fontSize: 25,
                marginTop: 40,
              }}
              onPress={submitData}
              size="lg"
              colorScheme="black"
              isLoading={isLoading}
              disabled={isLoading}
              isLoadingText="Enregistrement..."
            >
              <Text className="text-white text-lg" style={{ fontWeight: 600 }}>
                Poster l'article
              </Text>
            </Button>
          </View>

          <View className="h-20"></View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default CreateProduct;
