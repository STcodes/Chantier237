import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import StarContainer from "../../components/StarContainer";
import { React, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AlertImage from "../../components/AlertImage";
import axios from "axios";
import { NotFound } from "../../assets/";

const SingleOuvrier = ({ route }) => {
  const navigation = useNavigation();
  const [dataState, setDataState] = useState({
    isLoading: true,
    data: [],
    realisation: [],
    error: false,
  });

  useEffect(() => {
    setDataState((prev) => {
      return { ...prev, isLoading: true, error: false };
    });
    axios({
      method: "GET",
      url: "https://chantier237.camencorp.com/API/WORKERS/st_single_worker.php",
      responseType: "json",
      headers: { "Access-Control-Allow-Origin": "*" },
      params: {
        id: route.params.id,
      },
    })
      .then((response) => {
        if (response.data.status == "ERROR") {
          setDataState((prev) => {
            return { ...prev, error: true };
          });
        } else {
          setDataState((prev) => {
            return {
              ...prev,
              data: response.data.data,
              realisation: response.data.realisation,
            };
          });
        }
      })
      .catch((error) => {
        setDataState((prev) => {
          return { ...prev, error: true };
        });
      })
      .finally(() => {
        setDataState((prev) => {
          return { ...prev, isLoading: false };
        });
      });
  }, []);

  return (
    <SafeAreaView className="bg-white min-h-full">
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      {/* CHARGEMENT EN COURS */}

      {dataState.isLoading && (
        <View className="flex-1 h-full items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {/* AUCUNE DONNEE TROUVE OU ERREUR */}

      {dataState.error && (
        <View className="flex-1 h-full items-center justify-center gap-3">
          <Image source={NotFound} className="w-20 h-20" />
          <Text className="text-center">
            Aie aie aie! Verifier votre connexion et reessayer.
          </Text>
        </View>
      )}

      {/* AFFICHAGE DES PROFILS */}

      {!dataState.isLoading && !dataState.error && (
        <ScrollView
          className="flex-1 bg-white"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full h-[370px] relative">
            <TouchableOpacity
              className="rounded-full w-9 h-9 absolute z-10 left-3 top-3 items-center justify-center"
              style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <FontAwesome name="angle-left" size={30} color="white" />
            </TouchableOpacity>
            <Image
              source={{
                uri: dataState.data.image_url,
              }}
              className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-100"
            />
            <View className="w-full h-full items-center justify-between pt-3 pb-7">
              <View
                className="px-5 py-2 rounded-lg overflow-hidden"
                style={{
                  fontWeight: 500,
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <Text className="text-center text-white text-sm">
                  {dataState.data.job_name}
                </Text>
              </View>

              <View
                className="px-5 py-2 rounded-lg overflow-hidden"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                <Text
                  className="text-center text-white text-[26px]"
                  style={{
                    fontWeight: 400,
                  }}
                >
                  {dataState.data.last_name}
                </Text>
              </View>
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
                {dataState.data.description}
              </Text>
            </View>
            <View className="flex-row w-full gap-2 items-center justify-star mb-2 mt-2">
              <FontAwesome5 name="medal" size={27} color="orange" />
              <Text style={{ fontWeight: 500 }}>
                {dataState.data.anciennete}
                {dataState.data.anciennete > 1
                  ? " ans"
                  : " an"} d'experience {"  "}-{" "}
              </Text>
              <StarContainer evaluation={dataState.data.evaluation} />
            </View>
            <View className="w-full items-center justify-start ">
              <Text
                className="text-lg  text-blue-700 text-left w-full"
                style={{ fontWeight: 600 }}
              >
                Quelques réalisations
              </Text>
              <Text
                className="text-left text-sm mb-5 w-full"
                style={{ fontWeight: 300 }}
              >
                cliquez pour agrandir
              </Text>

              <View className="w-full items-start flex-row flex-wrap  pt-3 h-[200px] pb-5">
                {dataState.realisation.length == 0 ? (
                  <Text>Aucune réalisation enregistre pour ce profil.</Text>
                ) : (
                  dataState.realisation.map((item) => {
                    return (
                      <AlertImage
                        imageUrl={item.realisation_image_url}
                        key={item.rowid}
                      />
                    );
                  })
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default SingleOuvrier;
