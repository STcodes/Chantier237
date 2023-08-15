import { React, useState, useEffect } from "react";
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
import { LogoImage, NotFound } from "../../assets";
import { Menu, NativeBaseProvider } from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import OffrePostedProfil from "../../components/OffrePostedProfil";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ListOffrePosted = (props) => {
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
      url: "https://chantier237.camencorp.com/API/OFFER/st_getOwnOffer.php",
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
          className="w-full flex-row items-center justify-between px-2 py-2 bg-white pr-3"
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
                    <FontAwesome5 name="ellipsis-v" size="22" color="black" />
                  </TouchableOpacity>
                );
              }}
            >
              <Menu.Item
                onPress={() => {
                  navigation.navigate("OffreHome");
                }}
              >
                <Text className="text-lg">Liste des offres</Text>
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
              Les offres que vous avez posté
            </Text>

            <Text className="pl-1 text-[15px] text-gray-500">
              Liste des emplois
            </Text>
          </View>

          {/* Liste des offres */}

          {!dataState.isLoading && !dataState.error && (
            <View className="w-full gap-2 items-center justify-start pt-1">
              {dataState.data.map((item) => {
                return <OffrePostedProfil {...item} key={item.rowid} />;
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
                Aucune offre trouvé. Verifier votre connexion et reessayer.
              </Text>
            </View>
          )}

          <View className="h-14"></View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default ListOffrePosted;
