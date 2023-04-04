import MarketPlace from "./MarketPlace";
import Ouvrier from "./Ouvrier";
import Offre from "./Offre";
import Abonnement from "./Abonnement";
import Profil from "./Profil";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Home = (props) => {
  const Tab = createBottomTabNavigator();
  const colorNavActive = "#13c58a";
  const colorNavInactive = "black";
  const size = 27;

  return (
    <Tab.Navigator
      initialRouteName="Quincaillerie"
      screenOptions={{
        tabBarActiveTintColor: colorNavActive,
        tabBarInactiveTintColor: colorNavInactive,
        tabBarStyle: {
          borderTopColor: "rgba(0,0,0,0)", //shadow
          backgroundColor: "white",
          paddingTop: 3,
          paddingBottom: 5,
          height: 57,
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
        name="Quincaillerie"
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
      <Tab.Screen
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
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
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
      />
    </Tab.Navigator>
  );
};

export default Home;

// les initialParams sont geres dans les tabScreen, les params de initialData et navigate sont recuperer avec route.
