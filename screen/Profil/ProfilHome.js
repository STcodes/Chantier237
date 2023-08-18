import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from "react-native";
import { React, useState, useEffect } from "react";
import { Menu, NativeBaseProvider } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import StarContainer from "../../components/StarContainer";
import { NotFound } from "../../assets";
import axios from "axios";

const ProfilHome = (props) => {
  const navigation = useNavigation();
  const [dataState, setDataState] = useState({
    isLoading: true,
    data: [],
    error: false,
  });

  const dataCategorie = [
    {
      id: 1,
      categoryCard: "ing_genie_civil",
      categoryName: "Ingenieur genie civil",
    },
    {
      id: 2,
      categoryCard: "staffeur",
      categoryName: "Staffeurs",
    },
    {
      id: 3,
      categoryCard: "macon",
      categoryName: "Macons",
    },
    {
      id: 4,
      categoryCard: "manoeuvre",
      categoryName: "Manoeuvres",
    },
    {
      id: 5,
      categoryCard: "crepisseur",
      categoryName: "Crepisseur",
    },
    {
      id: 6,
      categoryCard: "livreur_eau",
      categoryName: "Livreurs d'eau",
    },
    {
      id: 7,
      categoryCard: "etancheite",
      categoryName: "Travailleurs d'etancheite",
    },
    {
      id: 8,
      categoryCard: "plombier",
      categoryName: "Plombiers",
    },
    {
      id: 9,
      categoryCard: "electricien",
      categoryName: "Electriciens",
    },
    {
      id: 10,
      categoryCard: "ferrailleur",
      categoryName: "Ferrailleurs",
    },
    {
      id: 11,
      categoryCard: "fouille",
      categoryName: "Travailleurs de fouille",
    },
    {
      id: 12,
      categoryCard: "carreleur",
      categoryName: "Carreleurs",
    },
    {
      id: 13,
      categoryCard: "menuisier",
      categoryName: "Menuisiers",
    },
    {
      id: 14,
      categoryCard: "charpentier",
      categoryName: "Charpentiers",
    },
    {
      id: 15,
      categoryCard: "menagere",
      categoryName: "Menagere",
    },
  ];

  const getJobName = (job) => {
    for (let i = 0; i < dataCategorie.length; i++) {
      if (job == dataCategorie[i].categoryCard) {
        return dataCategorie[i].categoryName;
      }
    }
    return job;
  };

  useEffect(() => {
    api();
  }, []);

  const api = () => {
    setDataState((prev) => {
      return { ...prev, isLoading: true, error: false };
    });
    axios({
      method: "GET",
      url: "https://chantier237.camencorp.com/API/PROFIL/st_getProfil.php",
      responseType: "json",
      headers: { "Access-Control-Allow-Origin": "*" },
      params: {
        user: props.userId,
      },
    })
      .then((response) => {
        if (response.data.status == "ERROR") {
          setDataState((prev) => {
            return { ...prev, error: true };
          });
        } else if (response.data.status == "NOT_COMPLETED") {
          navigation.reset({
            index: 0,
            routes: [{ name: "CompleteProfil" }],
          });
        } else if (response.data.status == "OK") {
          setDataState((prev) => {
            return {
              ...prev,
              data: response.data.data,
            };
          });
          props.setDataUser({
            userName: response.data.data.user_name,
            lastName: response.data.data.last_name,
            email: response.data.data.email,
            jobCategory: response.data.data.job_category,
            job: response.data.data.job_name,
            phone: response.data.data.phone,
            experience: response.data.data.anciennete,
            sexe: response.data.data.sexe,
            dateNaiss: response.data.data.date_naiss,
            description: response.data.data.description,
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
  };

  return (
    <NativeBaseProvider className="bg-white">
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

      {/* AFFICHAGE DU PROFIL */}
      {!dataState.isLoading && !dataState.error && (
        <ScrollView
          className="flex-1 bg-white w-full h-full"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={dataState.isLoading} onRefresh={api} />
          }
        >
          <View className="w-full h-[240px] bg-slate-500 rounded-b-3xl overflow-hidden">
            <Image
              source={{
                uri: dataState.data.banniere_url,
              }}
              className="w-full h-full object-cover opacity-90"
            />
<<<<<<< HEAD
            <View
              className={
                Platform.OS == "ios"
                  ? "absolute right-2 top-[50px] w-9 h-9 items-center justify-center bg-white rounded-full"
                  : "absolute right-2 top-3 w-9 h-9 items-center justify-center bg-white rounded-full"
              }
            >
=======
            <View className="absolute right-2 top-[50px] w-9 h-9 items-center justify-center bg-white rounded-full">
>>>>>>> 86988c9fa6a41f443ad36f46c33dd0fb8b8605e0
              <Menu
                w="220"
                trigger={(triggerProps) => {
                  return (
                    <TouchableOpacity
                      accessibilityLabel="More options menu"
                      {...triggerProps}
                    >
<<<<<<< HEAD
                      <FontAwesome5 name="ellipsis-v" size={22} color="black" />
=======
                      <FontAwesome5 name="ellipsis-v" size="22" color="black" />
>>>>>>> 86988c9fa6a41f443ad36f46c33dd0fb8b8605e0
                    </TouchableOpacity>
                  );
                }}
              >
                <Menu.Item
                  onPress={() => {
                    navigation.navigate("EditProfil");
                  }}
                >
                  <Text className="text-lg">Modifier votre profil</Text>
                </Menu.Item>
                <Menu.Item
                  onPress={() => {
                    navigation.navigate("About");
                  }}
                >
                  <Text className="text-lg">A propos</Text>
                </Menu.Item>
                <Menu.Item
                  onPress={() => {
                    props.shareApp();
                  }}
                >
                  <Text className="text-lg">Partager l'application</Text>
                </Menu.Item>
                <Menu.Item
                  onPress={() => {
                    props.logOut();
                  }}
                >
                  <Text className="text-lg">Se deconnecter</Text>
                </Menu.Item>
              </Menu>
            </View>
          </View>
          <View className="items-center justify-center w-full h-fit">
            <View className="bg-white w-28 h-28 p-2 rounded-full items-center justify-center z-20 -translate-y-12 -mb-12">
              <View className="w-5 h-5 rounded-full bg-white absolute top-[10px] right-[10px] z-10 items-center justify-center">
                <View className="w-[11px] h-[11px] bg-blue-600 rounded-full"></View>
              </View>
              <Image
                source={{
                  uri: dataState.data.image_url,
                }}
                className="w-full h-full rounded-full"
              />
            </View>
            <Text className="text-2xl mb-2" style={{ fontWeight: 600 }}>
              {dataState.data.last_name}
            </Text>
            <Text className="text-sm text-center mb-2">
              {dataState.data.job_name}{" "}
              <Text className="text-blue-600">
                @{getJobName(dataState.data.job_category)}
              </Text>
            </Text>
            <Text className="text-sm text-center mb-2">
              {dataState.data.anciennete} an(s) d'experience
            </Text>
            <StarContainer evaluation={dataState.data.evaluation} />
            <View className="flex-row items-start justify-center mt-5 mb-6 w-full px-4">
              <View className="flex-col items-center justify-start gap-y-2 w-[33%]">
                <View className="bg-blue-100 w-16 h-16 items-center justify-center rounded-full">
<<<<<<< HEAD
                  <FontAwesome name="envelope" size={30} color="blue" />
=======
                  <FontAwesome name="envelope" size="30" color="blue" />
>>>>>>> 86988c9fa6a41f443ad36f46c33dd0fb8b8605e0
                </View>
                <Text className="text-center text-xs">
                  {dataState.data.email}
                </Text>
              </View>
              <View className="flex-col items-center justify-start gap-y-2 w-[33%]">
                <View className="bg-blue-100 w-16 h-16 items-center justify-center rounded-full">
<<<<<<< HEAD
                  <FontAwesome name="phone" size={30} color="blue" />
=======
                  <FontAwesome name="phone" size="30" color="blue" />
>>>>>>> 86988c9fa6a41f443ad36f46c33dd0fb8b8605e0
                </View>
                <Text className="text-center text-xs">
                  +237 {dataState.data.phone}
                </Text>
              </View>
              <View className="flex-col items-center justify-start gap-y-2 w-[33%]">
                <View className="bg-blue-100 w-16 h-16 items-center justify-center rounded-full">
<<<<<<< HEAD
                  <FontAwesome name="calendar" size={30} color="blue" />
=======
                  <FontAwesome name="calendar" size="30" color="blue" />
>>>>>>> 86988c9fa6a41f443ad36f46c33dd0fb8b8605e0
                </View>
                <Text className="text-center text-xs">
                  {dataState.data.date_naiss_decode}
                </Text>
              </View>
            </View>
            <View className="w-full items-start px-4 mb-5">
              <Text className="text-xl mb-2" style={{ fontWeight: 600 }}>
                Description
              </Text>
              <Text style={{ fontWeight: 400, lineHeight: 18 }}>
                {dataState.data.description}
              </Text>
            </View>
          </View>
          <View className="w-full items-start px-4">
            <Text className="text-xl mb-4" style={{ fontWeight: 600 }}>
              Vos réalisations
            </Text>
            <View className="w-full item-center justify-around gap-5 flex-row flex-wrap">
              {dataState.data.realisation.map((item, key) => {
                return (
                  <Image
                    source={{
                      uri: item,
                    }}
                    className="rounded-2xl w-[44%] h-[180px] bg-blue-100"
                    key={key}
                  />
                );
              })}
            </View>
          </View>
          <View className="h-5"></View>
        </ScrollView>
      )}
    </NativeBaseProvider>
  );
};

export default ProfilHome;
