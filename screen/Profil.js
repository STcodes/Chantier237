import { React, useState } from "react";
import { Share, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import About from "./Profil/About";
import ProfilHome from "./Profil/ProfilHome";
import EditProfil from "./Profil/EditProfil";
import CompleteProfil from "./Profil/CompleteProfil";

const Stack = createNativeStackNavigator();

const Profil = (props) => {
  const [dataUser, setDataUser] = useState({});
  const logOut = async () => {
    props.logOut();
  };

  const shareApp = async () => {
    try {
      const result = await Share.share({
        message:
          "Telecharger Chantier237 et trouver un emploi selon vos competences en un clic",
        url:
          Platform.OS == "android"
            ? "https://play.google.com/store/apps/details?id="
            : "https://apps.apple.com/cm/app/",
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
        {(prop) => (
          <ProfilHome
            {...prop}
            userId={props.stateUser.userId}
            dataUser={dataUser}
            setDataUser={setDataUser}
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
        {(prop) => (
          <EditProfil
            {...prop}
            userId={props.stateUser.userId}
            dataUser={dataUser}
            setDataUser={setDataUser}
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
        {(prop) => <CompleteProfil {...prop} userId={props.stateUser.userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="About"
        options={{
          headerShown: false,
        }}
      >
        {(prop) => <About {...prop} logOut={logOut} shareApp={shareApp} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Profil;
