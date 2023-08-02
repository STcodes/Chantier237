import MarketPlace from "./MarketPlace";
import Ouvrier from "./Ouvrier";
import Offre from "./Offre";
// import Abonnement from "./Abonnement";
import Profil from "./Profil";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootSiblingParent } from "react-native-root-siblings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Home = (props) => {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  const colorNavActive = "rgba(29, 78, 216, 1)";
  const colorNavInactive = "black";
  const size = 30;

  const logOut = async () => {
    try {
      await AsyncStorage.setItem(
        "st_chantier237_user",
        JSON.stringify({
          userId: "",
          isAbonned: false,
          dateAbonned: "",
        })
      );
    } catch (e) {}

    navigation.reset({
      index: 0,
      routes: [{ name: "Signin" }],
    });
  };

  return (
    <RootSiblingParent>
      <Tab.Navigator
        initialRouteName="MarketPlace"
        screenOptions={{
          tabBarActiveTintColor: colorNavActive,
          tabBarInactiveTintColor: colorNavInactive,
          tabBarStyle: {
            borderTopColor: "rgba(0,0,0,0.5)",
            backgroundColor: "white",
            paddingTop: 3,
            paddingBottom: Platform.OS == "android" ? 5 : 25,
            height: Platform.OS == "android" ? 57 : 80,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: 500,
          },
        }}
      >
        <Tab.Screen
          name="Ouvrier"
          component={Ouvrier}
          initialParams={{ stateUser: props.stateUser }} //// Answer
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name="users"
                size={size}
                color={focused ? colorNavActive : colorNavInactive}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Offre"
          component={Offre}
          initialParams={{ stateUser: props.stateUser }}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name="hand-holding-usd"
                size={size}
                color={focused ? colorNavActive : colorNavInactive}
              />
            ),
          }}
        />
        <Tab.Screen
          initialParams={{ stateUser: props.stateUser }}
          name="MarketPlace"
          component={MarketPlace}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="store"
                size={size}
                color={focused ? colorNavActive : colorNavInactive}
              />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Abonnement"
          component={Abonnement}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="stopwatch"
                size={size}
                color={focused ? colorNavActive : colorNavInactive}
              />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Profil"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="person"
                size={size}
                color={focused ? colorNavActive : colorNavInactive}
              />
            ),
          }}
        >
          {() => <Profil stateUser={props.stateUser} logOut={logOut} />}
        </Tab.Screen>
      </Tab.Navigator>
    </RootSiblingParent>
  );
};

export default Home;

// les initialParams sont geres dans les tabScreen, les params de initialData et navigate sont recuperer avec route.
