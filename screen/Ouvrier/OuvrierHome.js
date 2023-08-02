import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import {
  LogoImage,
  NotFound,
  genie_civil_category,
  staffeur_category,
  manoeuvre_category,
  macon_category,
  crepissage_category,
  livraison_eau_category,
  plombier_category,
  electricien_category,
  fouille_category,
  ferrailleur_category,
  carreaux_category,
  menuisier_category,
  charpentier_category,
  etancheite_category,
  menagere_category,
} from "../../assets/";
import { React, useEffect, useState } from "react";
import axios from "axios";
import OuvrierCategory from "../../components/OuvrierCategory";
import OuvrierProfil from "../../components/OuvrierProfil";

const OuvrierHome = (props) => {
  const [categorie, setCategory] = useState("ing_genie_civil");
  const [dataState, setDataState] = useState({
    isLoading: true,
    data: [],
    error: false,
  });
  const dataCategorie = [
    {
      id: 1,
      categoryCard: "ing_genie_civil",
      categoryName: "Ingenieurs genie civil",
      image: genie_civil_category,
    },
    {
      id: 2,
      categoryCard: "staffeur",
      categoryName: "Staffeurs",
      image: staffeur_category,
    },
    {
      id: 3,
      categoryCard: "macon",
      categoryName: "Macons",
      image: macon_category,
    },
    {
      id: 4,
      categoryCard: "manoeuvre",
      categoryName: "Manoeuvres",
      image: manoeuvre_category,
    },
    {
      id: 5,
      categoryCard: "crepisseur",
      categoryName: "Crepisseur",
      image: crepissage_category,
    },
    {
      id: 6,
      categoryCard: "livreur_eau",
      categoryName: "Livreurs d'eau",
      image: livraison_eau_category,
    },
    {
      id: 7,
      categoryCard: "etancheite",
      categoryName: "Travailleurs d'etancheite",
      image: etancheite_category,
    },
    {
      id: 8,
      categoryCard: "plombier",
      categoryName: "Plombiers",
      image: plombier_category,
    },
    {
      id: 9,
      categoryCard: "electricien",
      categoryName: "Electriciens",
      image: electricien_category,
    },
    {
      id: 10,
      categoryCard: "ferrailleur",
      categoryName: "Ferrailleurs",
      image: ferrailleur_category,
    },
    {
      id: 11,
      categoryCard: "fouille",
      categoryName: "Travailleurs de fouille",
      image: fouille_category,
    },
    {
      id: 12,
      categoryCard: "carreleur",
      categoryName: "Carreleurs",
      image: carreaux_category,
    },
    {
      id: 13,
      categoryCard: "menuisier",
      categoryName: "Menuisiers",
      image: menuisier_category,
    },
    {
      id: 14,
      categoryCard: "charpentier",
      categoryName: "Charpentiers",
      image: charpentier_category,
    },
    {
      id: 15,
      categoryCard: "menagere",
      categoryName: "Menagere",
      image: menagere_category,
    },
  ];

  const api = () => {
    setDataState((prev) => {
      return { ...prev, isLoading: true, error: false };
    });
    axios({
      method: "GET",
      url: "https://chantier237.camencorp.com/API/WORKERS/st_workers.php",
      responseType: "json",
      headers: { "Access-Control-Allow-Origin": "*" },
      params: {
        category: categorie,
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
  }, [categorie]);

  return (
    <SafeAreaView className="bg-white min-h-full">
      <StatusBar backgroundColor="white" barStyle="dark-content" />
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
      </View>
      <ScrollView
        className="bg-white flex-1 px-2 h-full pt"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={dataState.isLoading} onRefresh={api} />
        }
      >
        <View className="flex-col items-start justify-center mb-5 mt-4 px-3 w-full ">
          <Text className="text-bold text-[25px] text-blue-900 mb-1">
            Categories
          </Text>
          <Text className="mb-3">Choisir la categorie des travailleurs</Text>
          <ScrollView
            horizontal
            className="gap-3 pt-3 pl-2"
            showsHorizontalScrollIndicator={false}
          >
            {dataCategorie.map((item) => {
              return (
                <OuvrierCategory
                  {...item}
                  key={item.id}
                  categorie={categorie}
                  setCategory={setCategory}
                />
              );
            })}
          </ScrollView>
        </View>

        <View className="flex-col px-1 w-full mb-4 ">
          <Text className="text-semibold text-[15px] mb-5">
            {"  "}Travailleurs de la categorie
          </Text>

          {/* AFFICHAGE DES PROFILS */}

          {!dataState.isLoading && !dataState.error && (
            <View className="w-full gap-2 items-center justify-start pt-1">
              {dataState.data.map((item) => {
                return (
                  <OuvrierProfil
                    {...item}
                    key={item.rowid}
                    userId={props.userId}
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
            <View className="w-full pt-10 items-center justify-center gap-3">
              <Image source={NotFound} className="w-20 h-20" />
              <Text className="text-center">
                Aucun profil trouve. Verifier votre connexion et reessayer.
              </Text>
            </View>
          )}
        </View>
        <View className="h-10"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OuvrierHome;
