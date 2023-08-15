import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  ToastAndroid,
  Platform,
} from "react-native";
import Toast from "react-native-root-toast";
import { React, useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Button, NativeBaseProvider, AlertDialog } from "native-base";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Linking from "expo-linking";
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

const SingleOffre = ({ route, idUser }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPostuled, setIsPotuled] = useState(false);
  const [dataState, setDataState] = useState({
    isLoading: true,
    data: [],
    error: false,
  });
  const Rotate = {
    from: {
      rotate: "0deg",
    },
    to: {
      rotate: "180deg",
    },
  };

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

  useEffect(() => {
    setDataState((prev) => {
      return { ...prev, isLoading: true, error: false };
    });
    axios({
      method: "GET",
      url: "https://chantier237.camencorp.com/API/OFFER/st_getAllSingleOffer.php",
      responseType: "json",
      headers: { "Access-Control-Allow-Origin": "*" },
      params: {
        id: route.params.id,
        idUser: idUser,
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

  const api = () => {
    setIsLoading(true);
    axios({
      method: "POST",
      url: "https://chantier237.camencorp.com/API/OFFER/st_suscribOffer.php",
      responseType: "json",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: {
        id: idUser,
        offer: route.params.id,
      },
    })
      .then((response) => {
        if (response.data.status == "ERROR") {
          //
          stToast(response.data.message);
        }
        if (response.data.status == "OK") {
          //toast
          stToast(response.data.message);
          setIsPotuled(true);
          setDataState((prev) => {
            return {
              ...prev,
              data: {
                ...prev.data,
                isPostuled: true,
              },
            };
          });
        }
      })
      .catch((error) => {
        //toast
        stToast("Erreur lors de la postulation. Veuillez reessayer.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const api2 = () => {
    setIsOpen(false);
    setIsLoading2(true);
    axios({
      method: "POST",
      url: "https://chantier237.camencorp.com/API/OFFER/st_unsuscribOffer.php",
      responseType: "json",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: {
        id: idUser,
        offer: route.params.id,
      },
    })
      .then((response) => {
        if (response.data.status == "ERROR") {
          //toast
          stToast(response.data.message);
        }
        if (response.data.status == "OK") {
          //toast
          stToast(response.data.message);
          setIsPotuled(false);
          setDataState((prev) => {
            return {
              ...prev,
              data: {
                ...prev.data,
                isPostuled: false,
              },
            };
          });
        }
      })
      .catch((error) => {
        //toast
        stToast("Erreur de l'annulation. Veuillez reessayer.");
      })
      .finally(() => {
        setIsLoading2(false);
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
            <AlertDialog.Header>Annuler la postulation</AlertDialog.Header>
            <AlertDialog.Body>
              Etes vous sur de vouloir annuler la postulation a cette offre ?
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button colorScheme="blue" onPress={api2} width="1/3">
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

        {/* AFFICHAGE DU PROFIL */}

        {!dataState.isLoading && !dataState.error && (
          <ScrollView
            className="flex-1 bg-white h-full w-full"
            showsVerticalScrollIndicator={false}
          >
            <View className="w-full h-[300px] relative">
              <TouchableOpacity
                className="rounded-full w-9 h-9 absolute z-20 left-3 top-3 items-center justify-center"
                style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <FontAwesome name="angle-left" size="30" color="white" />
              </TouchableOpacity>
              <View className="w-full items-center justify-center pt-3 pb-7 absolute z-10 bottom-4 ">
                <View className="rounded-lg overflow-hidden">
                  <Text
                    className="text-center text-white text-sm w-min px-5 py-2"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.6)",
                      fontWeight: 600,
                    }}
                  >
                    {dataState.data.title}
                  </Text>
                </View>
              </View>
              <View className="flex-row gap-x-2 w-full items-center justify-center absolute z-10 top-3">
                <View
                  style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                  className="flex-row items-center justify-center gap-x-2 rounded-2xl px-2 py-1"
                >
                  <FontAwesome5 name="clock" size="25" color="white" />
                  <Text
                    className="text-sm text-white tracking-wider"
                    style={{ fontWeight: 600, lineHeight: 18 }}
                  >
                    {dataState.data.time}
                  </Text>
                </View>
              </View>
              <Image
                source={TestImage(dataState.data.job_category)}
                className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-100"
              />
            </View>
            <View className="w-full bg-white rounded-2xl -translate-y-8 pt-5 px-5">
              <View className="w-full">
                <Text
                  className="text-lg mb-1 text-blue-700 tracking-wider"
                  style={{ fontWeight: 600 }}
                >
                  Descriptif de l'offre
                </Text>
                <Text
                  style={{
                    fontWeight: 400,
                    lineHeight: 18,
                    textAlign: "justify",
                  }}
                  className="text-gray-600"
                >
                  {dataState.data.description}
                </Text>
              </View>
              <View className="flex-row items-center justify-start gap-x-3 mb-5 mt-5">
                <FontAwesome5 name="money-bill" size="25" color="green" />
                <Text className="text-sm tracking-wider">
                  {dataState.data.salaire} Fcfa{" "}
                  {dataState.data.salaire_frequence} -{" "}
                  {dataState.data.salaire_negoci}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-col items-center justify-start gap-y-2 w-[33%]">
                  <View className="bg-blue-100 items-center justify-center w-[70px] h-[70px] p-3 rounded-full">
                    <FontAwesome name="calendar" size="28" color="blue" />
                  </View>
                  <Text className="text-center">{dataState.data.date}</Text>
                </View>
                <View className="flex-col items-center justify-start gap-y-2 w-[33%]">
                  <View className="bg-blue-100 items-center justify-center w-[70px] h-[70px] p-3 rounded-full">
                    <FontAwesome name="map-marker" size="30" color="blue" />
                  </View>
                  <Text className="text-center">{dataState.data.lieu}</Text>
                </View>
                <View className="flex-col items-center justify-start gap-y-2 w-[33%]">
                  <View className="bg-blue-100 items-center justify-center w-[70px] h-[70px] p-3 rounded-full">
                    <FontAwesome5 name="user-friends" size="28" color="blue" />
                  </View>
                  <Text className="text-center">
                    {dataState.data.nb_personne}
                    {dataState.data.nb_personne > 1 ? " places" : " place"}
                  </Text>
                </View>
              </View>
            </View>
            <View className="w-full items-center gap-y-2">
              {/* Bouton postuler */}
              {!dataState.data.isPostuled ? (
                <Button
                  style={{
                    backgroundColor: "rgba(0,0,0,0.9)",
                    width: "89%",
                    height: 47,
                    borderRadius: 25,
                    fontSize: 30,
                    fontWeight: 600,
                    justifyContent: "center",
                  }}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  size="lg"
                  isLoadingText="Enregistrement..."
                  onPress={api}
                >
                  <Text
                    className="text-[19px] text-white tracking-widest"
                    style={{ fontWeight: 500 }}
                  >
                    Postuler
                  </Text>
                </Button>
              ) : (
                <></>
              )}

              {/* En attente */}
              {(dataState.data.isPostuled && !dataState.data.isAccepted) ||
              isPostuled ? (
                <View className="w-full items-center justify-center gap-y-3">
                  <View
                    className="bg-black py-2 w-[90%] flex-row items-center justify-center gap-x-5"
                    style={{ borderRadius: 20 }}
                  >
                    <Animatable.View
                      animation={Rotate}
                      iterationCount="infinite"
                    >
                      <FontAwesome name="hourglass-2" size="20" color="white" />
                    </Animatable.View>
                    <Text className="text-white text-center">
                      En attente d'approbation
                    </Text>
                  </View>
                  <Button
                    style={{
                      backgroundColor: "rgba(255,0,0,0.9)",
                      width: "89%",
                      height: 47,
                      borderRadius: 25,
                      fontSize: 30,
                      fontWeight: 600,
                      justifyContent: "center",
                    }}
                    isLoading={isLoading2}
                    isDisabled={isLoading2}
                    size="lg"
                    isLoadingText="En cours..."
                    onPress={() => {
                      setIsOpen(true);
                    }}
                  >
                    <Text
                      className="text-[17px] text-white tracking-widest"
                      style={{ fontWeight: 500 }}
                    >
                      Annuler la postulation
                    </Text>
                  </Button>
                </View>
              ) : (
                <></>
              )}

              {/* Accepte */}
              {dataState.data.isPostuled && dataState.data.isAccepted ? (
                <Button
                  style={{
                    backgroundColor: "white",
                    width: "90%",
                    height: 47,
                    borderRadius: 20,
                    borderWidth: 1,
                    fontSize: 30,
                    fontWeight: 600,
                    justifyContent: "center",
                  }}
                  size="lg"
                  onPress={() => {
                    Linking.openURL(`tel:${dataState.data.telephone}`);
                  }}
                >
                  <Text
                    className="text-[18px] text-black tracking-widest"
                    style={{ fontWeight: 500 }}
                  >
                    Appeler
                  </Text>
                </Button>
              ) : (
                <></>
              )}
            </View>
            <View className="h-3"></View>
          </ScrollView>
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default SingleOffre;
