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
import { Input, Menu, NativeBaseProvider, FormControl } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import ProductItem from "../../components/ProductItem";
import { LogoImage, NotFound } from "../../assets";
import ProductCategory from "../../components/ProductCategory";
import axios from "axios";

const MarketPlaceHome = (props) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("feraille");
  const [dataState, setDataState] = useState({
    isLoading: true,
    error: false,
    data: [],
  });
  const dataCategory = [
    {
      id: 1,
      name: "Bois",
      value: "bois",
    },
    {
      id: 2,
      name: "Féraille",
      value: "feraille",
    },
    {
      id: 3,
      name: "Véhicule",
      value: "vehicule",
    },
    {
      id: 4,
      name: "Appareil",
      value: "appareil",
    },
    {
      id: 5,
      name: "Téléphone",
      value: "telephone",
    },
    {
      id: 6,
      name: "Matériel",
      value: "materiel",
    },
    {
      id: 7,
      name: "Autre",
      value: "other",
    },
  ];
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
        category: category,
        action: "all",
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
  }, [category]);

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
                    <FontAwesome5 name="ellipsis-v" size={22} color="black" />
                  </TouchableOpacity>
                );
              }}
            >
              <Menu.Item
                onPress={() => {
                  navigation.navigate("ListOwnProduct");
                }}
              >
                <Text className="text-lg">Vos articles</Text>
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
          <View className="w-full px-4 py-4 gap-y-3 mb-1">
            <Text className="text-[24px] tracking-wider pl-1 text-gray-800">
              <Text
                className="text-[35px] tracking-wider text-blue-700"
                style={{ fontWeight: 500 }}
              >
                D
              </Text>
              écouvrez nos articles
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
                    <FontAwesome name="search" size={25} color="blue" />
                  </TouchableOpacity>
                }
              />
            </FormControl>

            <Text className="pt-2 ml-1 text-base">
              Choisir la categorie d'article à afficher
            </Text>
          </View>

          {/* CATEGORIES */}

          <ScrollView
            className="gap-4 pl-1 mb-7"
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            {dataCategory.map((item) => {
              return (
                <ProductCategory
                  key={item.id}
                  name={item.name}
                  value={item.value}
                  category={category}
                  setCategory={setCategory}
                />
              );
            })}

            <View className="w-5"></View>
          </ScrollView>

          {/* AFFICHAGE DES PRODUITS */}

          {!dataState.isLoading && !dataState.error && (
            <View
              className="w-[full flex-row flex-wrap items-center justify-center"
              style={{ gap: 20 }}
            >
              {dataState.data.map((item) => {
                return (
                  <ProductItem
                    {...item}
                    key={item.id}
                    search={search}
                    OwnLike={props.OwnLike}
                    setOwnLike={props.setOwnLike}
                    idUser={props.idUser}
                  />
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
                Aucune produit trouvé. Verifier votre connexion et reessayer.
              </Text>
            </View>
          )}

          <View className="h-20"></View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default MarketPlaceHome;
