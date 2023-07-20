import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { A } from "@expo/html-elements";
import { LogoImage } from "../assets/";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Checkbox from "expo-checkbox";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";

import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ToastAndroid,
  Platform,
} from "react-native";
import {
  NativeBaseProvider,
  Button,
  FormControl,
  Input,
  Select,
} from "native-base";
import Toast from "react-native-root-toast";

const SignUp = (props) => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [isCondition, SetIsCondition] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState({
    userName: "",
    password: "",
    lastName: "",
    email: "",
    job: "",
    jobCategory: "",
  });

  const [isDataEmpty, setIsDataEmpty] = useState({
    userName: false,
    password: false,
    lastName: false,
    email: false,
    job: false,
    jobCategory: false,
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
      inputData.userName != "" &&
      inputData.password.length >= 8 &&
      inputData.lastName != "" &&
      inputData.email != "" &&
      inputData.job != "" &&
      inputData.jobCategory != "" &&
      isCondition
    ) {
      // api
      setIsLoading(true);

      axios({
        method: "POST",
        url: "https://chantier237.camencorp.com/API/AUTH/st_signup.php",
        responseType: "json",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: inputData,
      })
        .then((response) => {
          if (response.data.status == "ERROR") {
            //TOAST THE ERROR
            stToast(response.data.message);
          } else {
            // save the datauser in state and in local

            AsyncStorage.setItem(
              "st_chantier237_user",
              JSON.stringify({
                userId: response.data.data.id,
                isAbonned: response.data.data.is_abon,
                dateAbonned: response.data.data.date_abon,
              })
            );

            props.setStateUser({
              userId: response.data.data.id,
              isAbonned: response.data.data.is_abon,
              dateAbonned: response.data.data.date_abon,
            });
          }
          navigation.replace("Home");
        })
        .catch((error) => {
          // toat error
          stToast("Erreur lors de la connexion. Veuillez reessayer.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      if (inputData.userName == "") {
        setIsDataEmpty((prev) => {
          return { ...prev, userName: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, userName: false };
        });
      }
      if (inputData.password.length < 8) {
        setIsDataEmpty((prev) => {
          return { ...prev, password: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, password: false };
        });
      }
      if (inputData.lastName == "") {
        setIsDataEmpty((prev) => {
          return { ...prev, lastName: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, lastName: false };
        });
      }
      if (inputData.email == "") {
        setIsDataEmpty((prev) => {
          return { ...prev, email: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, email: false };
        });
      }
      if (inputData.job == "") {
        setIsDataEmpty((prev) => {
          return { ...prev, job: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, job: false };
        });
      }
      if (inputData.jobCategory == "") {
        setIsDataEmpty((prev) => {
          return { ...prev, jobCategory: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, jobCategory: false };
        });
      }
      if (!isCondition) {
        stToast(
          "Veuliiez acceptez les termes et conditions d'utilisation pour l'inscription"
        );
      }
    }
  };

  return (
    <NativeBaseProvider>
      <StatusBar
        backgroundColor="rgba(29, 78, 216, 1)"
        barStyle="light-content"
        className=""
      />
      <ScrollView
        className="bg-white flex-1"
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(29, 78, 216, 1)", "white"]}
          locations={[0, 0.8]}
          className="w-full h-40 top-0 left-0 absolute -z-10"
        />
        <View className="items-center justify-center mt-10 w-full pb-10">
          <View className="w-32 h-32 mb-2">
            <Image source={LogoImage} className="w-full h-full object-cover" />
          </View>
          <View className="flex-col items-center justify-center w-full">
            <Text className="text-[30px] text-[black] mb-1 text-bold">
              Inscription
            </Text>
            <Text>creez votre compte</Text>
          </View>

          <View className="w-full px-8 items-center justify-center flex-col pt-5 gap-5">
            <FormControl isInvalid={isDataEmpty.userName}>
              <Input
                placeholder="Nom d'utilisateur"
                type="text"
                className="text-sm"
                name="userName"
                onChangeText={(value) =>
                  setInputData({ ...inputData, userName: value })
                }
              />
              <FormControl.HelperText>
                Veuillez renseigner un seul nom
              </FormControl.HelperText>
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide.
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={isDataEmpty.lastName}>
              <Input
                placeholder="Votre nom"
                type="text"
                className="text-sm"
                onChangeText={(value) =>
                  setInputData({ ...inputData, lastName: value })
                }
              />
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide.
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={isDataEmpty.email}>
              <Input
                placeholder="Votre email"
                type="text"
                className="text-sm"
                onChangeText={(value) =>
                  setInputData({ ...inputData, email: value })
                }
              />
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide.
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={isDataEmpty.password}>
              <Input
                placeholder="Mot de passe"
                type={show ? "text" : "password"}
                className="text-sm"
                onChangeText={(value) =>
                  setInputData({ ...inputData, password: value })
                }
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
                      size={25}
                      mr="2"
                      color="black"
                      style={{ marginRight: 13 }}
                    />
                  </Pressable>
                }
              />
              <FormControl.ErrorMessage>
                Le mot de passe doit contenir au moins 8 caracteres
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={isDataEmpty.job}>
              <Input
                placeholder="Nom de votre metier"
                type="text"
                className="text-sm"
                onChangeText={(value) =>
                  setInputData({ ...inputData, job: value })
                }
              />
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide.
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={isDataEmpty.jobCategory}>
              <Select
                accessibilityLabel="Selectionner votre categorie"
                placeholder="Selectionner votre categorie"
                className="text-sm"
                _selectedItem={{
                  bg: "teal.600",
                }}
                mt="1"
                onValueChange={(value) =>
                  setInputData({ ...inputData, jobCategory: value })
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

            <FormControl className="w-full px-7">
              <View className="flex-row text-center items-center justify-start">
                <Checkbox
                  value={isCondition}
                  onValueChange={SetIsCondition}
                  color="blue"
                />
                <Text className="text-center text-sm">
                  J'accepte les{" "}
                  <A
                    href="https://stcode-portfolio.netlify.app"
                    style={{
                      color: "blue",
                      textDecorationLine: "underline",
                    }}
                  >
                    termes et conditions d'utilisation{" "}
                  </A>
                  et la{" "}
                  <A
                    href="https://stcode-portfolio.netlify.app"
                    style={{
                      color: "blue",
                      textDecorationLine: "underline",
                    }}
                  >
                    politique de confidentialite
                  </A>
                </Text>
              </View>
            </FormControl>

            <Button
              style={{
                backgroundColor: "black",
                width: "100%",
                height: 60,
                borderRadius: 7,
                fontSize: 25,
              }}
              onPress={submitData}
              size="lg"
              colorScheme="black"
              isLoading={isLoading}
              disabled={isLoading}
              isLoadingText="Inscription"
            >
              S'inscrire
            </Button>

            <Text className="items-center justify-center w-full text-center">
              Vous avez deja un compte ?{"  "}
              <Text
                className="text-[15px] text-blue-700"
                onPress={() => {
                  navigation.navigate("Signin");
                }}
              >
                Connectez-vous
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default SignUp;
