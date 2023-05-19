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
import UilSearch from "@iconscout/react-native-unicons/icons/uil-search";
import UilTreePoint from "@iconscout/react-native-unicons/icons/uil-ellipsis-v";
import { useNavigation } from "@react-navigation/native";
import ProductItem from "../../components/ProductItem";
import { LogoImage } from "../../assets";
import ProductCategory from "../../components/ProductCategory";

const MarketPlaceHome = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("feraille");
  const [OwnLike, setOwnLike] = useState([1, 3, 6]);
  const [dataState, setDataState] = useState({
    isLoading: true,
    error: false,
    data: [
      {
        id: 1,
        imageUrl:
          "https://img.freepik.com/free-photo/smartphones-balancing-with-blue-background_23-2150271748.jpg?size=626&ext=jpg",
        price: 140000,
        name: "Iphone Xr",
      },
      {
        id: 2,
        imageUrl:
          "https://img.freepik.com/premium-photo/backpack-isolated_163782-6015.jpg?size=626&ext=jpg",
        price: 8532,
        name: "Sac a dos",
      },
      {
        id: 3,
        imageUrl:
          "https://img.freepik.com/free-photo/one-person-typing-laptop-night-generated-by-ai_188544-27872.jpg?size=626&ext=jpg",
        price: 125000,
        name: "Laptop",
      },
      {
        id: 4,
        imageUrl:
          "https://img.freepik.com/free-photo/black-luxury-sport-sedan-car-standing-race-trace_114579-1169.jpg?size=626&ext=jpg",
        price: 7000000,
        name: "BMW",
      },
      {
        id: 5,
        imageUrl:
          "https://img.freepik.com/free-photo/wooden-table-with-defocussed-image-boat-lake_1048-3432.jpg?size=626&ext=jpg",
        price: 3500,
        name: "Longues planches",
      },
      {
        id: 6,
        imageUrl:
          "https://img.freepik.com/premium-photo/world-with-dripping-water_476363-4800.jpg?size=626&ext=jpg",
        price: 2700,
        name: "Cuve d'eau",
      },
      {
        id: 7,
        imageUrl:
          "https://img.freepik.com/free-photo/green-truck-with-white-trailer-road_1340-32388.jpg?size=626&ext=jpg",
        price: 25000000,
        name: "Camion de livraison",
      },
      {
        id: 8,
        imageUrl:
          "https://img.freepik.com/free-photo/still-life-rendering-jackets-display_23-2149745039.jpg?size=626&ext=jpg",
        price: 5000,
        name: "Pull",
      },
    ],
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
  ];
  const navigation = useNavigation();

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
              Chantier 237
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
          // refreshControl={<RefreshControl refreshing={dataState.isLoading} />}
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
                    <UilSearch size={30} color="blue" />
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

          {/* AFFICHAGE DES OFFRES */}
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
                  OwnLike={OwnLike}
                  setOwnLike={setOwnLike}
                />
              );
            })}
          </View>

          <View className="h-20"></View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default MarketPlaceHome;
