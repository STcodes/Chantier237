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
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LogoImage } from "../assets/";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Checkbox from "expo-checkbox";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";
import Toast from "react-native-root-toast";
import * as Linking from "expo-linking";

const SignUp = (props) => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [isCondition, SetIsCondition] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState({
    userName: "",
    lastName: "",
    password: "",
    phone: "",
  });

  const [isDataEmpty, setIsDataEmpty] = useState({
    userName: false,
    password: false,
    lastName: false,
    phone: false,
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

  const isInputDataEmpty = () => {
    for (const [cle, valeur] of Object.entries(inputData)) {
      if (valeur === "") {
        stToast("Veulliez entrer tous les champs");
        setIsDataEmpty((prev) => {
          return { ...prev, [cle]: true };
        });
        return false;
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, [cle]: false };
        });
      }
      if (cle == "password") {
        if (valeur.length < 8) {
          stToast("Veulliez entrer un mot de passe valide");
          setIsDataEmpty((prev) => {
            return { ...prev, [cle]: true };
          });
          return false;
        }
      }
    }

    if (!isCondition) {
      stToast(
        "Veulliez acceptez les termes et conditions d'utilisation pour l'inscription"
      );
      return false;
    }
    return true;
  };

  const submitData = () => {
    if (isInputDataEmpty()) {
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
          // navigation.replace("Home");
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        })
        .catch((error) => {
          // toat error
          stToast("Erreur lors de la connexion. Veuillez reessayer.");
        })
        .finally(() => {
          setIsLoading(false);
        });
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

          <View className="w-full px-8  justify-center flex-col pt-5">
            {/* Nom d'ultisateur */}
            <Text className="mb-2 mt-2 text-base text-left">
              Votre nom d'utilisateur
            </Text>
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

            {/* Nom */}
            <Text className="mb-2 mt-4 text-base text-left">
              Votre nom complet
            </Text>
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

            {/* mot de passe */}
            <Text className="mb-2 mt-4 text-base text-left">
              Votre mot de passe
            </Text>
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

            {/* Numero de telephone */}
            <Text className="mb-2 mt-4 text-base text-left">
              Votre numero de téléphone
            </Text>
            <FormControl isInvalid={isDataEmpty.phone}>
              <Input
                placeholder="Numero de téléphone"
                type="text"
                keyboardType="numeric"
                className="text-sm"
                onChangeText={(value) =>
                  setInputData({ ...inputData, phone: value })
                }
              />
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide.
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl className="w-full px-7 my-10">
              <View className="flex-row justify-start">
                <Checkbox
                  value={isCondition}
                  onValueChange={() => {
                    SetIsCondition((prev) => !prev);
                  }}
                  color="blue"
                />
                <Text className="text-center text-sm">
                  J'accepte les{" "}
                  <Text
                    className="text-blue-700 underline"
                    onPress={() => {
                      Linking.openURL(`https://chantier237.netlify.app/terms/`);
                    }}
                  >
                    termes et conditions d'utilisation
                  </Text>{" "}
                  et la{" "}
                  <Text
                    className="text-blue-700 underline"
                    onPress={() => {
                      Linking.openURL(`https://chantier237.netlify.app/policy`);
                    }}
                  >
                    politique de confidentialité
                  </Text>
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

            <Text className="items-center justify-center w-full text-center mt-7">
              Vous avez déjà un compte ?{"  "}
              <Text
                className="text-[15px] text-blue-700"
                onPress={() => {
                  navigation.navigate("Signin");
                }}
              >
                Connectez-vous
              </Text>
            </Text>

            <View className="h-10"></View>
          </View>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default SignUp;
