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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const OffreProfil = (props) => {
  const navigation = useNavigation();

  function TestImage(image) {
    if (image == "ing_genie_civil") {
      image = genie_civil_category;
    }
    if (image == "staffeur") {
      image = staffeur_category;
    }
    if (image == "macon") {
      image = macon_category;
    }
    if (image == "manoeuvre") {
      image = manoeuvre_category;
    }
    if (image == "crepisseur") {
      image = crepissage_category;
    }
    if (image == "livreur_eau") {
      image = livraison_eau_category;
    }
    if (image == "etancheite") {
      image = etancheite_category;
    }
    if (image == "plombier") {
      image = plombier_category;
    }
    if (image == "electricien") {
      image = electricien_category;
    }
    if (image == "ferrailleur") {
      image = ferrailleur_category;
    }
    if (image == "fouille") {
      image = fouille_category;
    }
    if (image == "carreleur") {
      image = carreaux_category;
    }
    if (image == "menuisier") {
      image = menuisier_category;
    }
    if (image == "charpentier") {
      image = charpentier_category;
    }
    if (image == "menagere") {
      image = menagere_category;
    }
    if (image == "other") {
      image = find_job;
    }
    return image;
  }

  if (props.search == "") {
    return (
      <TouchableOpacity
        className="flex-row items-start justify-center w-full pl-6 gap-x-1 mb-4"
        onPress={() => {
          navigation.navigate("SingleOffre", { id: props.rowid });
        }}
      >
        <View className="w-[20%] pt-2">
          <Image
            source={TestImage(props.job_category)}
            className="w-16 h-16 rounded-md bg-blue-200"
          />
        </View>
        <View
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
            <View className="flex-row gap-x-2">
              <FontAwesome name="calendar-o" size={20} color="blue" />
              <Text>{props.date}</Text>
            </View>
            <View className="flex-row gap-x-2 items-center">
              <FontAwesome name="map-marker" size={20} color="blue" />
              <Text>
                {props.lieu.length >= 13
                  ? `${props.lieu.substring(0, 13)}...`
                  : props.lieu}
              </Text>
            </View>
          </View>

          {props.isAccepted && (
            <View className="rounded-md px-3 py-1 mt-3 overflow-hidden bg-green-200">
              <Text className="text-green-900  text-sm ">Accepté</Text>
            </View>
          )}
          {props.isPostuled && !props.isAccepted && (
            <View className="rounded-md px-3 py-1 mt-3 bg-blue-200">
              <Text className="text-blue-900 text-sm ">Postulé</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  } else {
    if (props.title.toLowerCase().indexOf(props.search.toLowerCase()) != -1) {
      return (
        <TouchableOpacity
          className="flex-row items-start justify-center w-full pl-6 gap-x-1 mb-4"
          onPress={() => {
            navigation.navigate("SingleOffre", { id: props.rowid });
          }}
        >
          <View className="w-[20%] pt-2">
            <Image
              source={TestImage(props.job_category)}
              className="w-16 h-16 rounded-md bg-blue-200"
            />
          </View>
          <View
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
              <View className="flex-row gap-x-2">
                <FontAwesome name="calendar-o" size={20} color="blue" />
                <Text>{props.date}</Text>
              </View>
              <View className="flex-row gap-x-2 items-center">
                <FontAwesome name="map-marker" size={20} color="blue" />
                <Text>
                  {props.lieu.length >= 13
                    ? `${props.lieu.substring(0, 13)}...`
                    : props.lieu}
                </Text>
              </View>
            </View>

            {props.isAccepted && (
              <View className="rounded-md px-3 py-1 mt-3 overflow-hidden bg-green-200">
                <Text className="text-green-900  text-sm ">Accepté</Text>
              </View>
            )}
            {props.isPostuled && !props.isAccepted && (
              <View className="rounded-md px-3 py-1 mt-3 bg-blue-200">
                <Text className="text-blue-900 text-sm ">Postulé</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    }
  }
};

export default OffreProfil;
