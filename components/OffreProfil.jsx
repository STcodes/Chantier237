import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  plombier_category,
  menagere_category,
  carreaux_category,
  ferrailleur_category,
  genie_civil_category,
  staffeur_category,
  macon_category,
  manoeuvre_category,
  crepissage_category,
  livraison_eau_category,
  etancheite_category,
  electricien_category,
  fouille_category,
  menuisier_category,
  charpentier_category,
  find_job,
} from "../assets";
import UilCalendar from "@iconscout/react-native-unicons/icons/uil-calender";
import UilMap from "@iconscout/react-native-unicons/icons/uil-map-marker";
import React from "react";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

const OffreProfil = (props) => {
  const navigation = useNavigation();

  function TestImage() {
    let Image = genie_civil_category;
    if (props.job_category == "ing_genie_civil") {
      Image = genie_civil_category;
    }
    if (props.job_category == "staffeur") {
      Image = staffeur_category;
    }
    if (props.job_category == "macon") {
      Image = macon_category;
    }
    if (props.job_category == "manoeuvre") {
      Image = manoeuvre_category;
    }
    if (props.job_category == "crepisseur") {
      Image = crepissage_category;
    }
    if (props.job_category == "livreur_eau") {
      Image = livraison_eau_category;
    }
    if (props.job_category == "etancheite") {
      Image = etancheite_category;
    }
    if (props.job_category == "plombier") {
      Image = plombier_category;
    }
    if (props.job_category == "electricien") {
      Image = electricien_category;
    }
    if (props.job_category == "ferrailleur") {
      Image = ferrailleur_category;
    }
    if (props.job_category == "fouille") {
      Image = fouille_category;
    }
    if (props.job_category == "carreleur") {
      Image = carreaux_category;
    }
    if (props.job_category == "menuisier") {
      Image = menuisier_category;
    }
    if (props.job_category == "charpentier") {
      Image = charpentier_category;
    }
    if (props.job_category == "menagere") {
      Image = menagere_category;
    }
    if (props.job_category == "other") {
      Image = find_job;
    }
    return Image;
  }

  return (
    <TouchableOpacity
      className="flex-row items-start justify-center w-full pl-6 gap-x-1 mb-4"
      onPress={() => {
        navigation.navigate("SingleOffre", { id: props.rowid });
      }}
    >
      <View className="w-[20%] pt-2">
        <Image source={TestImage()} className="w-16 h-16 rounded-md" />
      </View>
      <Animatable.View
        animation={"bounceIn"}
        className="w-[80%] pb-2 items-start justify-start pr-[20px]"
        style={{ borderBottomColor: "gray", borderBottomWidth: 1 }}
      >
        <Text className="text-[17px]" style={{ fontWeight: 500 }}>
          {props.title.length >= 30
            ? `${props.title.substring(0, 30)}...`
            : props.title}
        </Text>
        <Text className="text-gray-600 mb-2 mt-1">
          {props.description.length >= 95
            ? `${props.description.substring(0, 95)}...`
            : props.description}
        </Text>
        <View className="flex-row gap-x-3">
          <View className="flex-row gap-x-1">
            <UilCalendar size={20} color="blue" />
            <Text>{props.date}</Text>
          </View>
          <View className="flex-row gap-x-1">
            <UilMap size={20} color="blue" />
            <Text>{props.lieu}</Text>
          </View>
        </View>

        {props.isAccepted ? (
          <Text className="text-green-900 bg-green-200 text-sm rounded-md px-3 py-1 mt-3">
            Accepté
          </Text>
        ) : (
          <></>
        )}
        {props.isPostuled ? (
          <Text className="text-blue-900 bg-blue-200 text-sm rounded-md px-3 py-1 mt-3">
            Postulé
          </Text>
        ) : (
          <></>
        )}
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default OffreProfil;
