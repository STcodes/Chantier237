import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import UilMedal from "@iconscout/react-native-unicons/icons/uil-medal";
import StarContainer from "../../components/StarContainer";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import UilArrow from "@iconscout/react-native-unicons/icons/uil-angle-left";
import AlertImage from "../../components/AlertImage";

const SingleOuvrier = (props) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full h-[370px] relative">
          <TouchableOpacity
            className="rounded-full w-4 h-4 absolute z-10 left-3 top-3 items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            onPress={() => {
              navigation.navigate("OuvrierHome");
            }}
          >
            <UilArrow size={30} color="white" />
          </TouchableOpacity>
          <Image
            source={{
              uri: "https://img.freepik.com/free-photo/medium-shot-smiley-woman-posing_23-2149439882.jpg?size=626&ext=jpg",
            }}
            className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-100"
          />
          <View className="w-full h-full items-center justify-between pt-3 pb-7">
            <Text
              className="rounded-lg text-center text-white text-sm w-min px-5 py-2"
              style={{ backgroundColor: "rgba(0,0,0,0.6)", fontWeight: 500 }}
            >
              Developpeur web 👨‍💻
            </Text>
            <Text
              className="text-center text-white text-bold text-[26px] rounded-lg px-5 py-2"
              style={{ backgroundColor: "rgba(0,0,0,0.5)", fontWeight: 400 }}
            >
              M. SITIO Thierry
            </Text>
          </View>
        </View>
        <View className="w-full bg-white rounded-2xl -translate-y-8 pt-5 px-5">
          <View className="w-full">
            <Text
              className="text-lg mb-1 text-blue-700"
              style={{ fontWeight: 600 }}
            >
              Description
            </Text>
            <Text style={{ fontWeight: 400, lineHeight: 18 }}>
              Je suis tres competent dans le domaine du dev web. Site web,
              portfolio. Faites moi confiance et contactez moi. Je vous promet
              que vous ne serez pas decu.
            </Text>
          </View>
          <View className="flex-row w-full gap-2 items-center justify-star mb-2 mt-2">
            <UilMedal size={27} color="orange" />
            <Text style={{ fontWeight: 500 }}>
              02 ans d'experience {"  "}-{" "}
            </Text>
            <StarContainer evaluation={4} />
          </View>
          <View className="w-full">
            <Text
              className="text-lg  text-blue-700"
              style={{ fontWeight: 600 }}
            >
              Quelques realisations
            </Text>
            <Text className="text-sm mb-5" style={{ fontWeight: 300 }}>
              (cliquez pour agrandir)
            </Text>

            <View className="w-full items-start flex-row flex-wrap gap-7 pl-3 pt-3 h-[200px] pb-5">
              <AlertImage imageUrl="https://imgs.search.brave.com/j7oZHPlUz1gkUToQNMqDBgwzZZF9CBy0EEfiUIoB618/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/bG0wNHg1RklrM0h1/NzRaREo5SFFnSGFF/OCZwaWQ9QXBp" />
              <AlertImage imageUrl="https://imgs.search.brave.com/JE5VpjEryLPYnJbww8Qi1GJ1iDiSiQNjO6PFPsaTMq0/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5x/SnNMVzN6U2ctUENu/bTc0YkFfOV9nSGFF/OCZwaWQ9QXBp" />
              <AlertImage imageUrl="https://imgs.search.brave.com/yYqgoDEeSd8sk1BWvw8CxiO2By64G9Ewu02kRuEUY0M/rs:fit:1080:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5K/dkE4VFR4ZG9jdUxf/QkJGZERwYzdnSGFE/USZwaWQ9QXBp" />
              <AlertImage imageUrl="https://imgs.search.brave.com/AmnfO8axrnzTZ5fzXBWJ4fIBJV95xNr5YGrsfg9SMaE/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5w/VUFiTFA5MEVmNjRD/QjNKXzFVV0pRSGFI/YSZwaWQ9QXBp" />
              <AlertImage imageUrl="https://imgs.search.brave.com/j7oZHPlUz1gkUToQNMqDBgwzZZF9CBy0EEfiUIoB618/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/bG0wNHg1RklrM0h1/NzRaREo5SFFnSGFF/OCZwaWQ9QXBp" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleOuvrier;
