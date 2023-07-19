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
import { React, useState, useEffect } from "react";
import { Menu, NativeBaseProvider } from "native-base";
import UilTreePoint from "@iconscout/react-native-unicons/icons/uil-ellipsis-v";
import { useNavigation } from "@react-navigation/native";
import ProductItem from "../../components/ProductItem";
import { LogoImage, NotFound } from "../../assets";
import axios from "axios";

const ListOwnProduct = (props) => {
  const [dataState, setDataState] = useState({
    isLoading: true,
    error: false,
    data: [],
  });
  const navigation = useNavigation();

  const api = () => {
    setDataState((prev) => {
      return { ...prev, isLoading: true, error: false };
    });
    axios({
      method: "GET",
      url: "https://chantier237.camencorp.com/API/MARKETPLACE/st_getProduct.php",
      responseType: "json",
      headers: { "Access-Control-Allow-Origin": "*" },
      params: {
        id: props.idUser,
        action: "own",
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
          props.setOwnLike(response.data.ownLike);
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
                  navigation.navigate("MarketPlaceHome");
                }}
              >
                <Text className="text-lg">Tous les articles</Text>
              </Menu.Item>
              <Menu.Item
                onPress={() => {
                  navigation.navigate("CreateProduct");
                }}
              >
                <Text className="text-lg">Publier un article</Text>
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
          <View className="w-full px-4 py-4 mb-1">
            <Text className="text-[25px] tracking-wider pl-1 text-gray-800">
              <Text
                className="text-[35px] tracking-wider text-blue-700"
                style={{ fontWeight: 500 }}
              >
                V
              </Text>
              os articles
            </Text>

            <Text className="pt-2 ml-1 text-base">
              Parcourer vos differents articles
            </Text>
          </View>

          {/* AFFICHAGE DES PRODUITS */}

          {!dataState.isLoading && !dataState.error ? (
            <View
              className="w-[full flex-row flex-wrap items-center justify-center"
              style={{ gap: 20 }}
            >
              {dataState.data.map((item) => {
                return (
                  <ProductItem
                    {...item}
                    key={item.id}
                    OwnLike={props.OwnLike}
                    setOwnLike={props.setOwnLike}
                    idUser={props.idUser}
                  />
                );
              })}
            </View>
          ) : (
            <></>
          )}

          {/* CHARGEMENT EN COURS */}

          {dataState.isLoading ? (
            <View className="w-full mt-20 items-center justify-center">
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <></>
          )}

          {/* AUCUNE DONNEE TROUVE OU ERREUR */}

          {dataState.error ? (
            <View className="w-full pt-10 pl-2 items-center justify-center gap-3">
              <Image source={NotFound} className="w-20 h-20" />
              <Text className="text-center">
                Aucune produit trouvé. Verifier votre connexion et reessayer.
              </Text>
            </View>
          ) : (
            <></>
          )}

          <View className="h-20"></View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default ListOwnProduct;
