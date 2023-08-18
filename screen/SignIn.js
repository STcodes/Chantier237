import {
  View,
  Text,
  Pressable,
  Image,
  ToastAndroid,
  StatusBar,
  Platform,
} from "react-native";
import { NativeBaseProvider, Button, FormControl, Input } from "native-base";
import Toast from "react-native-root-toast";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LogoImage } from "../assets/";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

const SignIn = (props) => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState({
    userName: "",
    password: "",
  });
  const [isDataEmpty, setIsDataEmpty] = useState({
    userName: false,
    password: false,
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
    if (inputData.userName != "" && inputData.password != "") {
      // api
      setIsLoading(true);
      axios({
        method: "POST",
        url: "https://chantier237.camencorp.com/API/AUTH/st_signin.php",
        responseType: "json",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: inputData,
      })
        .then((response) => {
          if (response.data.status == "ERROR") {
            stToast("Nom d'utilisateur ou mot de passe incorrect.");
          } else {
            props.setStateUser({
              userId: response.data.data.id,
              isAbonned: response.data.data.is_abon,
              dateAbonned: response.data.data.date_abon,
            });

            AsyncStorage.setItem(
              "st_chantier237_user",
              JSON.stringify({
                userId: response.data.data.id,
                isAbonned: response.data.data.is_abon,
                dateAbonned: response.data.data.date_abon,
              })
            );
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          }
          setIsLoading(false);
        })
        .catch((error) => {
          stToast("Erreur de connexion. Veuillez reessayer");
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
      if (inputData.password == "") {
        setIsDataEmpty((prev) => {
          return { ...prev, password: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, password: false };
        });
      }
    }
  };

  // functions to get and set local state

  const storeLocalUserData = async (value) => {
    try {
      await AsyncStorage.setItem("st_chantier237_user", JSON.stringify(value));
    } catch (e) {}
  };

  const getLocalUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("st_chantier237_user");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {}
  };

  // recuperer le localstate et se connecter si il existe

  useEffect(() => {
    let a = getLocalUserData();
    a.then((result) => {
      if (result == null || result == undefined) {
        storeLocalUserData(props.stateUser);
      } else {
        if (result.userId != "") {
          props.setStateUser({
            userId: result.userId,
            isAbonned: result.isAbonned,
            dateAbonned: result.dateAbonned,
          });
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        }
      }
    });
  }, []);

  return (
    <NativeBaseProvider>
      <StatusBar
        backgroundColor="rgba(29, 78, 216, 1)"
        barStyle="light-content"
      />
      <View className="bg-white flex-1 items-center justify-start pt-12 flex-col">
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(29, 78, 216, 1)", "white"]}
          locations={[0, 0.8]}
          className="w-full h-40 top-0 left-0 absolute -z-10"
        />
        <View className="w-32 h-32 mb-2">
          <Image source={LogoImage} className="w-full h-full object-cover" />
        </View>

        <View className="flex-col items-center justify-center w-full">
          <Text className="text-[30px] text-[black] mb-1 text-bold">
            Connexion
          </Text>
          <Text>Accedez à votre compte</Text>
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
            <FormControl.ErrorMessage>
              Ce champ ne doit pas etre vide.
            </FormControl.ErrorMessage>
          </FormControl>

          {/* mot de passe */}
          <Text className="mb-2 mt-7 text-base text-left">
            Votre mot de passe
          </Text>
          <FormControl isInvalid={isDataEmpty.password}>
            <Input
              placeholder="Mot de passe"
              type={show ? "text" : "password"}
              className="text-sm"
              name="userName"
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
              Ce champ ne doit pas etre vide.
            </FormControl.ErrorMessage>
          </FormControl>

          <Button
            style={{
              backgroundColor: "black",
              width: "100%",
              height: 60,
              borderRadius: 7,
              fontSize: 25,
              marginTop: 35,
            }}
            onPress={submitData}
            size="lg"
            colorScheme="black"
            isLoading={isLoading}
            disabled={isLoading}
            isLoadingText="Connexion"
          >
            Se connecter
          </Button>

          <Text className="items-center justify-center w-full text-center mt-8">
            Vous avez pas de compte ?{"  "}
            <Text
              className="text-blue-500 text-[15px]"
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              Inscrivez-vous
            </Text>
          </Text>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default SignIn;
