import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import UilArrow from "@iconscout/react-native-unicons/icons/uil-angle-left";
import UilMoney from "@iconscout/react-native-unicons/icons/uil-money-stack";
import UilClock from "@iconscout/react-native-unicons/icons/uil-clock";
import UilCalendar from "@iconscout/react-native-unicons/icons/uil-calender";
import UilMap from "@iconscout/react-native-unicons/icons/uil-map-marker";
import UilUser from "@iconscout/react-native-unicons/icons/uil-users-alt";
import { ferrailleur_category } from "../../assets";
import { Button, NativeBaseProvider } from "native-base";
import { useNavigation } from "@react-navigation/native";
import OffreSuscribedProfil from "../../components/OffreSuscribedProfil";

const SingleOffrePosted = () => {
  const navigation = useNavigation();
  const nb = 1;
  return (
    <NativeBaseProvider>
      <SafeAreaView className="bg-white min-h-full">
        <StatusBar backgroundColor="blue" barStyle="light-content" />

        <ScrollView
          className="flex-1 bg-white h-full w-full"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full h-[280px] relative">
            <TouchableOpacity
              className="rounded-full w-4 h-4 absolute z-20 left-3 top-3 items-center justify-center p-4"
              style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
              onPress={() => {
                navigation.navigate("OffreHome");
              }}
            >
              <UilArrow size={30} color="white" />
            </TouchableOpacity>
            <View className="w-full items-center justify-center pt-3 pb-7 absolute z-10 bottom-4">
              <Text
                className="rounded-2xl text-center text-white text-sm w-min px-5 py-2"
                style={{ backgroundColor: "rgba(0,0,0,0.6)", fontWeight: 600 }}
              >
                Recherche d'un ingénieur génie civil
              </Text>
            </View>
            <View className="flex-row gap-x-2 w-full items-center justify-center absolute z-10 top-3">
              <View
                style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                className="flex-row items-center justify-center gap-x-2 rounded-2xl px-2 py-1"
              >
                <UilClock size={25} color="white" />
                <Text
                  className="text-sm text-white tracking-wider"
                  style={{ fontWeight: 600, lineHeight: 18 }}
                >
                  Temps plein
                </Text>
              </View>
            </View>
            <Image
              source={ferrailleur_category}
              className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-100"
            />
          </View>
          <View className="w-full bg-white rounded-2xl -translate-y-8 pt-5 px-5 items-center">
            <View className="w-full">
              <Text
                className="text-lg mb-1 text-blue-700 tracking-wider"
                style={{ fontWeight: 600 }}
              >
                Descriptif de l'offre
              </Text>
              <Text
                style={{ fontWeight: 400, lineHeight: 18 }}
                className="text-gray-600"
              >
                J'aurai besoin d'un plombier pour reparer la chasse de mes
                toilettes. Je crois qu'elle est bouchee, J'aurai besoin d'un
                plombier pour reparer la chasse de mes toilettes. Je crois
                qu'elle est bouchee.
              </Text>
            </View>
            <View className="flex-row items-center justify-start gap-x-3 mb-5 mt-5">
              <UilMoney size={25} color="green" />
              <Text className="text-sm tracking-wider">
                25.000 Fcfa par semaine - Non négociable
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-col items-center justify-start gap-y-2 w-[33%]">
                <View className="bg-blue-100 items-center justify-center p-3 rounded-full">
                  <UilCalendar size={30} color="blue" />
                </View>
                <Text className="text-center">Il y'a 2 semaines</Text>
              </View>
              <View className="flex-col items-center justify-start gap-y-2 w-[33%]">
                <View className="bg-blue-100 items-center justify-center p-3 rounded-full">
                  <UilMap size={30} color="blue" />
                </View>
                <Text className="text-center">Yaoundé</Text>
              </View>
              <View className="flex-col items-center justify-start gap-y-2 w-[33%]">
                <View className="bg-blue-100 items-center justify-center p-3 rounded-full">
                  <UilUser size={30} color="blue" />
                </View>
                <Text className="text-center">
                  {nb}
                  {nb > 1 ? " places" : " place"}
                </Text>
              </View>
            </View>
          </View>
          <View className="items-start justify-start pl-6">
            <Text
              className="text-blue-700 text-lg tracking-wider"
              style={{ fontWeight: 500 }}
            >
              Liste des candidats
            </Text>
            <View className="items-start justify-start gap-y-5 mt-5 mb-7">
              <OffreSuscribedProfil isSelected={true} isNoted={true} />
              <OffreSuscribedProfil isSelected={true} isNoted={false} />
              <OffreSuscribedProfil isSelected={false} isNoted={false} />
            </View>
          </View>
          <View className="w-full items-center flex-row justify-center">
            <Button
              style={{
                backgroundColor: "rgba(0,255,0,0.25)",
                width: "40%",
                height: 47,
                borderRadius: 25,
                fontSize: 30,
                fontWeight: 600,
                justifyContent: "center",
              }}
              isLoading={false}
              size="lg"
              isLoadingText="Enregistrement..."
            >
              <Text
                className="text-[19px] text-green-800 tracking-widest"
                style={{ fontWeight: 500 }}
              >
                Terminer
              </Text>
            </Button>
            <View className="w-[20px]"></View>
            <Button
              style={{
                backgroundColor: "rgba(255,0,0,0.25)",
                width: "40%",
                height: 47,
                borderRadius: 25,
                fontSize: 30,
                fontWeight: 600,
                justifyContent: "center",
              }}
              isLoading={false}
              size="lg"
              isLoadingText="Enregistrement..."
            >
              <Text
                className="text-[19px] text-red-800 tracking-widest"
                style={{ fontWeight: 500 }}
              >
                Annuler
              </Text>
            </Button>
          </View>
          <View className="h-3"></View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default SingleOffrePosted;
