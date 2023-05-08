import React from "react";
import OffreHome from "./Offre/OffreHome";
import SingleOffre from "./Offre/SingleOffre";
import CreateOffre from "./Offre/CreateOffre";
import ListOffrePostuled from "./Offre/ListOffrePostuled";
import ListOffrePosted from "./Offre/ListOffrePosted";
import SingleOffrePosted from "./Offre/SingleOffrePosted";
import SingleOuvrier from "./Ouvrier/SingleOuvrier";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Offre = ({ route }) => {
  return (
    <Stack.Navigator initialRouteName="OffreHome">
      <Stack.Screen name="OffreHome" options={{ headerShown: false }}>
        {(props) => (
          <OffreHome {...props} idUser={route.params.stateUser.userId} />
        )}
      </Stack.Screen>
      <Stack.Screen name="SingleOffre" options={{ headerShown: false }}>
        {(props) => (
          <SingleOffre {...props} idUser={route.params.stateUser.userId} />
        )}
      </Stack.Screen>
      <Stack.Screen name="CreateOffre" options={{ headerShown: false }}>
        {(props) => (
          <CreateOffre {...props} idUser={route.params.stateUser.userId} />
        )}
      </Stack.Screen>
      <Stack.Screen name="ListOffrePostuled" options={{ headerShown: false }}>
        {(props) => (
          <ListOffrePostuled
            {...props}
            idUser={route.params.stateUser.userId}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ListOffrePosted" options={{ headerShown: false }}>
        {(props) => (
          <ListOffrePosted {...props} idUser={route.params.stateUser.userId} />
        )}
      </Stack.Screen>
      <Stack.Screen name="SingleOffrePosted" options={{ headerShown: false }}>
        {(props) => (
          <SingleOffrePosted
            {...props}
            idUser={route.params.stateUser.userId}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="SingleOuvrier" options={{ headerShown: false }}>
        {(props) => <SingleOuvrier {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Offre;
