import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OuvrierHome from "./Ouvrier/OuvrierHome";
import SingleOuvrier from "./Ouvrier/SingleOuvrier";

const Stack = createNativeStackNavigator();

const Ouvrier = ({ route }) => {
  return (
    <Stack.Navigator initialRouteName="OuvrierHome">
      <Stack.Screen
        name="OuvrierHome"
        options={{
          headerShown: false,
        }}
      >
        {(props) => (
          <OuvrierHome {...props} userId={route.params.stateUser.userId} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="SingleOuvrier"
        options={{
          headerShown: false,
        }}
        component={SingleOuvrier}
      />
    </Stack.Navigator>
  );
};

export default Ouvrier;
