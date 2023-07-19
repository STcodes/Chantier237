import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./screen/SignIn";
import SignUp from "./screen/SignUp";
import Home from "./screen/Home";
import { TailwindProvider } from "tailwindcss-react-native";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [stateUser, setStateUser] = useState({
    userId: "",
    isAbonned: false,
    dateAbonned: "",
  });

  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Signin"
            options={{
              headerShown: false,
            }}
          >
            {(props) => (
              <SignIn
                {...props}
                stateUser={stateUser}
                setStateUser={setStateUser}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Signup"
            options={{
              headerShown: false,
            }}
          >
            {(props) => (
              <SignUp
                {...props}
                stateUser={stateUser}
                setStateUser={setStateUser}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {(props) => (
              <Home
                {...props}
                stateUser={stateUser}
                setStateUser={setStateUser}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}
