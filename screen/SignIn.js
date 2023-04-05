import { View, Text, TouchableOpacity, Pressable, Image } from "react-native";
import { NativeBaseProvider, Button, FormControl, Input } from "native-base";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LogoImage, FacebookLogo } from "../assets/";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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

  const submitData = () => {
    if (inputData.userName != "" && inputData.password != "") {
      // api
      setIsLoading(true);
      axios({
        method: "POST",
        url: "http://localhost/chantier237/API/AUTH/st_signin.php",
        responseType: "json",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: inputData,
      })
        .then((response) => {
          if (response.data.status == "ERROR") {
            //TOAST THE ERROR
            console.log(response.data.message);
          } else {
            //save the datauser in state and in local

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

            navigation.navigate("Home");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          //TOAST THE ERROR
          console.log(error);
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
      // console.log(result);
      if (result == null || result == undefined) {
        storeLocalUserData(props.stateUser);
        console.log("set new");
      } else {
        if (result.userId != "") {
          props.setStateUser(result.stateUser);
          navigation.navigate("Home");
          console.log("already logged");
        }
      }
    });
  }, []);

  return (
    <NativeBaseProvider>
      <View className="bg-white flex-1 items-center justify-start pt-8 flex-col">
        <View className="w-32 h-32 mb-2">
          <Image source={LogoImage} className="w-full h-full object-cover" />
        </View>

        <View className="flex-col items-center justify-center w-full">
          <Text className="text-[30px] text-[black] mb-1 text-bold">
            Connexion
          </Text>
          <Text>Acceder a votre compte</Text>
        </View>

        <View className="w-full px-8 items-center justify-center flex-col pt-5 gap-5">
          <FormControl isInvalid={isDataEmpty.userName}>
            <Input
              placeholder="Nom d'utilisateur'"
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
            }}
            onPress={submitData}
            size="lg"
            colorScheme="black"
            isLoading={isLoading}
            isLoadingText="Connexion"
          >
            Se connecter
          </Button>
          <Text className="mt-3 mb-3">
            --{"    "} ou connectez vous avec {"    "}--
          </Text>
          <TouchableOpacity className="flex-row items-center px-5 py-2 bg-white relative rounded-md w-full border-[1px] border-black mb-5 justify-center">
            <Image source={FacebookLogo} className="h-10 w-10" />
            <Text className="text-lg text-semibold ml-5 text-center">
              Facebook
            </Text>
          </TouchableOpacity>
          <Text className="items-center justify-center w-full text-center">
            Vous avez pas de compte ?{"  "}
            <Text
              className="text-blue-500 text-[15px]"
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              S'inscrire
            </Text>
          </Text>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default SignIn;
