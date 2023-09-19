import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { NativeBaseProvider } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LogoImage } from "../../assets";
import * as Linking from "expo-linking";

const About = () => {
  return (
    <NativeBaseProvider>
      <SafeAreaView className="bg-white w-full">
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View
          className="w-full flex-row items-center justify-between px-2 py-2 bg-white pr-4"
          style={{ borderBottomColor: "gray", borderBottomWidth: 1 }}
        >
          <View className="flex-row gap-1 items-center">
            <Image source={LogoImage} className="w-10 h-10" />
            <Text className="text-bold text-[20px] tracking-wider">
              Chantier237
            </Text>
          </View>
        </View>
        <ScrollView
          className="bg-white h-full w-full pb-14 px-5"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-[24px] tracking-wider pl-1 text-gray-800 text-left my-5">
            <Text className="text-[38px] text-blue-700">A</Text> propos de
            Chantier237
          </Text>
          <TouchableOpacity
            className="items-center justify-between flex-row w-full mt-4"
            onPress={() => {
              Linking.openURL("https://chantier237.netlify.app/terms/");
            }}
          >
            <Text className="text-left text-lg">
              Termes et conditions d'utilisation
            </Text>
            <FontAwesome name="angle-right" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center justify-between flex-row w-full mt-4"
            onPress={() => {
              Linking.openURL("https://chantier237.netlify.app/policy");
            }}
          >
            <Text className="text-left text-lg">
              Politique de confidentialité
            </Text>
            <FontAwesome name="angle-right" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center justify-between flex-row w-full mt-4"
            onPress={() => {
              Linking.openURL("https://chantier237.netlify.app/using");
            }}
          >
            <Text className="text-left text-lg">Manuel d'utilisation</Text>
            <FontAwesome name="angle-right" size={28} color="black" />
          </TouchableOpacity>

          <View className="items-center justify-between flex-row w-full mt-4">
            <Text className="text-2xl mt-5 mb-5 text-left">Contacts</Text>
            <FontAwesome name="angle-down" size={28} color="black" />
          </View>

          <View className="w-full flex-col gap-y-4">
            <View className="items-center justify-start gap-x-5 flex-row">
              <View className="bg-blue-100 w-11 h-11 items-center justify-center rounded-full">
                <FontAwesome name="phone" size={20} color="blue" />
              </View>
              <Text className="text-sm text-left">
                +237 658 27 15 33 / +237 681 60 98 71
              </Text>
            </View>
            <View className="items-center justify-start gap-x-5 flex-row">
              <View className="bg-blue-100 w-11 h-11 items-center justify-center p-3 rounded-full">
                <FontAwesome name="whatsapp" size={20} color="blue" />
              </View>
              <Text className="text-sm text-left">+237 658 27 15 33</Text>
            </View>
            <View className="items-center justify-start gap-x-5 flex-row">
              <View className="bg-blue-100 w-11 h-11 items-center justify-center p-3 rounded-full">
                <FontAwesome name="envelope" size={20} color="blue" />
              </View>
              <Text className="text-sm text-left">chantier237@gmail.com</Text>
            </View>
          </View>

          <View className="items-center justify-between flex-row w-full mt-4">
            <Text className="text-2xl mt-5 mb-5 text-left">
              Contacts du développeur
            </Text>
            <FontAwesome name="angle-down" size={28} color="black" />
          </View>

          <View className="w-full flex-col gap-y-4">
            <View className="items-center justify-start gap-x-5 flex-row">
              <View className="bg-blue-100 w-11 h-11 items-center justify-center p-3 rounded-full">
                <FontAwesome name="phone" size={20} color="blue" />
              </View>
              <Text className="text-sm text-left">+237 671 88 08 71</Text>
            </View>
            <View className="items-center justify-start gap-x-5 flex-row">
              <View className="bg-blue-100 w-11 h-11 items-center justify-center p-3 rounded-full">
                <FontAwesome name="envelope" size={20} color="blue" />
              </View>
              <Text className="text-sm text-left">ordit2000@gmail.com</Text>
            </View>
          </View>
          <View className="h-20"></View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default About;
