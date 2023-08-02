import { React, useState, useEffect, Children } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { LogoImage } from "../../assets";
import { Input, Menu, NativeBaseProvider, FormControl } from "native-base";
import UilTreePoint from "@iconscout/react-native-unicons/icons/uil-ellipsis-v";
import UilSearch from "@iconscout/react-native-unicons/icons/uil-search";
import OffreProfil from "../../components/OffreProfil";
import { useNavigation } from "@react-navigation/native";
import { NotFound } from "../../assets";
import axios from "axios";

const OffreHome = (props) => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const [dataState, setDataState] = useState({
    isLoading: true,
    data: [],
    error: false,
  });

  const api = () => {
    setDataState((prev) => {
      return { ...prev, isLoading: true, error: false };
    });
    axios({
      method: "GET",
      url: "https://chantier237.camencorp.com/API/OFFER/st_getAllOffer.php",
      responseType: "json",
      headers: { "Access-Control-Allow-Origin": "*" },
      params: {
        id: props.idUser,
      },
    })
      .then((response) => {
        if (response.data.status == "ERROR") {
          setDataState((prev) => {
            return { ...prev, error: true };
          });
        } else {
          setDataState((prev) => {
            return { ...prev, data: response.data.data };
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

  useEffect(() => {
    api();
  }, []);

  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView className="bg-white w-full">
        <View
          className="w-full flex-row items-center justify-between px-2 py-2 bg-white"
          style={{ borderBottomColor: "gray", borderBottomWidth: 1 }}
        >
          <View className="flex-row gap-1 items-center">
            <Image source={LogoImage} className="w-10 h-10" />
            <Text className="text-bold text-[20px] tracking-wider">
              Chantier237
            </Text>
          </View>
          <View>
            <Menu
              w="190"
              trigger={(triggerProps) => {
                return (
                  <TouchableOpacity
                    accessibilityLabel="More options menu"
                    {...triggerProps}
                  >
                    <UilTreePoint color="black" size={24} />
                  </TouchableOpacity>
                );
              }}
            >
              <Menu.Item
                onPress={() => {
                  navigation.navigate("ListOffrePosted");
                }}
              >
                <Text className="text-lg">Offres postées</Text>
              </Menu.Item>
              <Menu.Item
                onPress={() => {
                  navigation.navigate("ListOffrePostuled");
                }}
              >
                <Text className="text-lg">Offres postulées</Text>
              </Menu.Item>
              <Menu.Item
                onPress={() => {
                  navigation.navigate("CreateOffre");
                }}
              >
                <Text className="text-lg">Poster une offre</Text>
              </Menu.Item>
            </Menu>
          </View>
        </View>
        <ScrollView
          className="bg-white h-full w-full pb-14"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={dataState.isLoading} onRefresh={api} />
          }
        >
          <View className="w-full px-4 py-4 gap-y-3">
            <Text className="text-[24px] tracking-wider pl-1 text-gray-800">
              Trouvez l'offre d'emploi 😊{"\n"}de votre choix
            </Text>

            <FormControl>
              <Input
                placeholder="Rechercher"
                type="text"
                className="text-base"
                name="userName"
                variant="rounded"
                onChangeText={(value) => {
                  setSearch(value);
                }}
                InputRightElement={
                  <TouchableOpacity className="-translate-x-3">
                    <UilSearch size={30} color="blue" />
                  </TouchableOpacity>
                }
              />
            </FormControl>
            <Text className="pl-1 text-[15px] text-gray-500">
              Liste des emplois
            </Text>
          </View>

          {/* AFFICHAGE DES OFFRES */}

          {!dataState.isLoading && !dataState.error && (
            <View className="w-full gap-2 items-center justify-start pt-1">
              {dataState.data.map((item) => {
                return (
                  <OffreProfil {...item} key={item.rowid} search={search} />
                );
              })}
            </View>
          )}

          {/* CHARGEMENT EN COURS */}

          {dataState.isLoading && (
            <View className="w-full mt-20 items-center justify-center">
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}

          {/* AUCUNE DONNEE TROUVE OU ERREUR */}

          {dataState.error && (
            <View className="w-full pt-10 pl-2 items-center justify-center gap-3">
              <Image source={NotFound} className="w-20 h-20" />
              <Text className="text-center">
                Aucune offre trouve. Verifier votre connexion et reessayer.
              </Text>
            </View>
          )}

          <View className="h-14"></View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default OffreHome;
