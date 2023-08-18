import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  ToastAndroid,
  Platform,
} from "react-native";
import { React, useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Button, NativeBaseProvider, AlertDialog } from "native-base";
import { useNavigation } from "@react-navigation/native";
import OffreSuscribedProfil from "../../components/OffreSuscribedProfil";
import axios from "axios";
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
  NotFound,
} from "../../assets";

const SingleOffrePosted = ({ route }) => {
  const navigation = useNavigation();
  const [overLoading, setOverLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dataState, setDataState] = useState({
    isLoading: true,
    offer: [],
    user: [],
    error: false,
  });

  const stToast = (message) => {
    if (Platform.OS == "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    }
  };

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

  const api = () => {
    setDataState((prev) => {
      return { ...prev, isLoading: true, error: false };
    });
    axios({
      method: "GET",
      url: "https://chantier237.camencorp.com/API/OFFER/st_getOwnSingleOffer.php",
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
              offer: response.data.offer,
              user: response.data.user,
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
  };

  useEffect(() => {
    api();
  }, []);

  const deleteApi = () => {
    setIsOpen(false);
    setDeleteLoading(true);
    axios({
      method: "POST",
      url: "https://chantier237.camencorp.com/API/OFFER/st_actionButton.php",
      responseType: "json",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: {
        offer: route.params.id,
        action: "delete",
      },
    })
      .then((response) => {
        if (response.data.status == "ERROR") {
          stToast("Erreur lors de la supprission. Veuillez reessayer");
        }
        if (response.data.status == "OK") {
          stToast("Suppression effectuée");
          navigation.navigate("OffreHome");
        }
      })
      .catch((error) => {
        stToast("Erreur lors de la suppression. Veuillez reessayer");
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };
  const overApi = () => {
    setOverLoading(true);
    axios({
      method: "POST",
      url: "https://chantier237.camencorp.com/API/OFFER/st_actionButton.php",
      responseType: "json",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: {
        offer: route.params.id,
        action: "over",
      },
    })
      .then((response) => {
        if (response.data.status == "ERROR") {
          stToast("Veuillez noter tous les candidats que vous avez choisi");
        }
        if (response.data.status == "OK") {
          stToast("Enregistrement effectué");
          navigation.navigate("OffreHome");
        }
      })
      .catch((error) => {
        stToast("Erreur lors de l'enregistrement. Veuillez reessayer");
      })
      .finally(() => {
        setOverLoading(false);
      });
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView className="bg-white min-h-full">
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <AlertDialog
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Annuler l'offre</AlertDialog.Header>
            <AlertDialog.Body>
              Etes vous sur de vouloir annuler l'offre ?
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button colorScheme="blue" onPress={deleteApi} width="1/3">
                  Oui
                </Button>
                <Button
                  colorScheme="danger"
                  width="1/3"
                  onPress={() => {
                    setIsOpen(false);
                  }}
                >
                  Non
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>

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
            className="flex-1 bg-white h-full w-full"
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={dataState.isLoading}
                onRefresh={api}
              />
            }
          >
            <View className="w-full h-[280px] relative">
              <TouchableOpacity
                className="rounded-full w-9 h-9 absolute z-20 left-3 top-3 items-center justify-center"
                style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
<<<<<<< HEAD
                <FontAwesome name="angle-left" size={30} color="white" />
=======
                <FontAwesome name="angle-left" size="30" color="white" />
>>>>>>> 86988c9fa6a41f443ad36f46c33dd0fb8b8605e0
              </TouchableOpacity>
              <View className="w-full items-center justify-center pt-3 pb-7 absolute z-10 bottom-4">
                <View
                  className="rounded-lg overflow-hidden px-5 py-2"
                  style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                >
                  <Text
                    className="rounded-2xl text-center text-white text-sm"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {dataState.offer.title}
                  </Text>
                </View>
              </View>
              <View className="flex-row gap-x-2 w-full items-center justify-center absolute z-10 top-3">
                <View
                  style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                  className="flex-row items-center justify-center gap-x-2 rounded-2xl px-2 py-1"
                >
<<<<<<< HEAD
                  <FontAwesome5 name="clock" size={25} color="white" />
=======
                  <FontAwesome5 name="clock" size="25" color="white" />
>>>>>>> 86988c9fa6a41f443ad36f46c33dd0fb8b8605e0
                  <Text
                    className="text-sm text-white tracking-wider"
                    style={{ fontWeight: 600, lineHeight: 18 }}
                  >
                    {dataState.offer.time}
                  </Text>
                </View>
              </View>
              <Image
                source={TestImage(dataState.offer.job_category)}
                className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-100"
              />
            </View>
            <View className="w-full bg-white rounded-2xl -translate-y-8 pt-5 px-5 items-center justify-start">
              <View className="w-full">
                <Text
                  className="text-lg mb-1 text-blue-700 tracking-wider"
                  style={{ fontWeight: 600 }}
                >
                  Descriptif de l'offre
                </Text>
                <Text
                  style={{ fontWeight: 400, lineHeight: 18 }}
                  className="text-gray-600"
                >
                  {dataState.offer.description}
                </Text>
              </View>
              <View className="w-full flex-row items-center justify-start mb-5 mt-5">
<<<<<<< HEAD
                <FontAwesome5 name="money-bill" size={25} color="green" />
=======
                <FontAwesome5 name="money-bill" size="25" color="green" />
>>>>>>> 86988c9fa6a41f443ad36f46c33dd0fb8b8605e0
                <Text className="text-sm tracking-wider ml-3">
                  {dataState.offer.salaire} Fcfa{" "}
                  {dataState.offer.salaire_frequence} -{" "}
                  {dataState.offer.salaire_negoci}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-col items-center justify-start gap-y-2 w-[33%]">
                  <View className="bg-blue-100 items-center justify-center w-[70px] h-[70px] p-3 rounded-full">
<<<<<<< HEAD
                    <FontAwesome name="calendar" size={28} color="blue" />
=======
                    <FontAwesome name="calendar" size="28" color="blue" />
>>>>>>> 86988c9fa6a41f443ad36f46c33dd0fb8b8605e0
                  </View>
                  <Text className="text-center">{dataState.offer.date}</Text>
                </View>
                <View className="flex-col items-center justify-start gap-y-2 w-[33%]">
                  <View className="bg-blue-100 items-center justify-center w-[70px] h-[70px] p-3 rounded-full">
<<<<<<< HEAD
                    <FontAwesome name="map-marker" size={30} color="blue" />
=======
                    <FontAwesome name="map-marker" size="30" color="blue" />
>>>>>>> 86988c9fa6a41f443ad36f46c33dd0fb8b8605e0
                  </View>
                  <Text className="text-center">{dataState.offer.lieu}</Text>
                </View>
                <View className="flex-col items-center justify-start gap-y-2 w-[33%]">
                  <View className="bg-blue-100 items-center justify-center w-[70px] h-[70px] p-3 rounded-full">
<<<<<<< HEAD
                    <FontAwesome5 name="user-friends" size={28} color="blue" />
=======
                    <FontAwesome5 name="user-friends" size="28" color="blue" />
>>>>>>> 86988c9fa6a41f443ad36f46c33dd0fb8b8605e0
                  </View>
                  <Text className="text-center">
                    {dataState.offer.nb_personne}
                    {dataState.offer.nb_personne > 1 ? " places" : " place"}
                  </Text>
                </View>
              </View>
            </View>
            <View className="items-start justify-start pl-6">
              <Text
                className="text-blue-700 text-lg tracking-wider"
                style={{ fontWeight: 500 }}
              >
                Liste des candidats
              </Text>
              <View className="items-start justify-start gap-y-5 mt-5 mb-7">
                {dataState.user.map((item) => {
                  return (
                    <OffreSuscribedProfil
                      {...item}
                      key={item.rowid}
                      offer={route.params.id}
                    />
                  );
                })}
              </View>
            </View>
            <View className="w-full items-center flex-row justify-center">
              {/* button terminer l'offre */}

              <Button
                style={{
                  backgroundColor: "white",
                  width: "40%",
                  height: 47,
                  borderRadius: 25,
                  borderWidth: 1,
                  fontSize: 30,
                  fontWeight: 600,
                  justifyContent: "center",
                }}
                _text={{
                  color: "black",
                }}
                isLoading={overLoading}
                isDisabled={overLoading}
                onPress={overApi}
                size="sm"
                isLoadingText="Enregistrement..."
              >
                <Text
                  className="text-[19px] text-black tracking-widest"
                  style={{ fontWeight: 500 }}
                >
                  Terminer
                </Text>
              </Button>
              <View className="w-[20px]"></View>

              {/* Button annuler l'offre */}

              <Button
                style={{
                  backgroundColor: "rgba(255,0,0,0.7)",
                  width: "40%",
                  height: 47,
                  borderRadius: 25,
                  fontSize: 30,
                  fontWeight: 600,
                  justifyContent: "center",
                }}
                isLoading={deleteLoading}
                isDisabled={deleteLoading}
                onPress={() => {
                  setIsOpen(true);
                }}
                size="lg"
                isLoadingText="En cours..."
              >
                <Text
                  className="text-[19px] text-white tracking-widest"
                  style={{ fontWeight: 500 }}
                >
                  Annuler
                </Text>
              </Button>
            </View>
            <View className="h-3"></View>
          </ScrollView>
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default SingleOffrePosted;
