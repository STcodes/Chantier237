import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OffreHome from "./Offre/OffreHome";
import SingleOffre from "./Offre/SingleOffre";

const Stack = createNativeStackNavigator();

const Offre = ({ route }) => {
  console.log(route);

  return (
    <Stack.Navigator initialRouteName="OffreHome">
      <Stack.Screen name="OffreHome" options={{ headerShown: false }}>
        {(props) => <OffreHome {...props} />}
      </Stack.Screen>
      <Stack.Screen name="SingleOffre" options={{ headerShown: false }}>
        {(props) => <SingleOffre {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Offre;
