import React from "react";
import { Share, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import About from "./Profil/About";
import ProfilHome from "./Profil/ProfilHome";
import EditProfil from "./Profil/EditProfil";
import CompleteProfil from "./Profil/CompleteProfil";

const Stack = createNativeStackNavigator();

const Profil = ({ route }) => {
  const navigation = useNavigation();

  const logOut = async () => {
    console.log("LogOut");

    // try {
    //   await AsyncStorage.setItem(
    //     "st_chantier237_user",
    //     JSON.stringify({
    //       userId: "",
    //       isAbonned: false,
    //       dateAbonned: "",
    //     })
    //   );
    // } catch (e) {}

    // navigation.reset({
    //   index: 1,
    //   routes: [
    //     { name: "Home" },
    //     {
    //       name: "SignIn",
    //     },
    //   ],
    // });

    navigation.navigate("SignIn");
  };

  const shareApp = async () => {
    try {
      const result = await Share.share({
        message:
          "Telecharger Chantier237 et trouver un emploi selon vos competences en un clic",
        url:
          Platform.OS == "android"
            ? "https://stcode.camencorp.com"
            : "https://stcode.camencorp.com",
      });
    } catch (error) {}
  };

  return (
    <Stack.Navigator initialRouteName="ProfilHome">
      <Stack.Screen
        name="ProfilHome"
        options={{
          headerShown: false,
        }}
      >
        {(props) => (
          <ProfilHome
            {...props}
            userId={route.params.stateUser.userId}
            logOut={logOut}
            shareApp={shareApp}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="EditProfil"
        options={{
          headerShown: false,
        }}
      >
        {(props) => (
          <EditProfil
            {...props}
            userId={route.params.stateUser.userId}
            logOut={logOut}
            shareApp={shareApp}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="CompleteProfil"
        options={{
          headerShown: false,
        }}
      >
        {(props) => (
          <CompleteProfil {...props} userId={route.params.stateUser.userId} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="About"
        options={{
          headerShown: false,
        }}
      >
        {(props) => <About {...props} logOut={logOut} shareApp={shareApp} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Profil;
