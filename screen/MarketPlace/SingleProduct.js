import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import UilArrow from "@iconscout/react-native-unicons/icons/uil-angle-left";
import { NativeBaseProvider, Button, AlertDialog } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { React, useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import axios from "axios";
import { NotFound } from "../../assets";
import * as Linking from "expo-linking";

const ProductImage = (props) => {
  const setImageUrl = () => {
    props.setImageView(props.imageUrl);
  };

  return (
    <TouchableOpacity
      className={
        props.imageUrl == props.productimageUrl
          ? "rounded-lg w-[60px] h-[60px] overflow-hidden border-blue-700 border-[3px]"
          : "rounded-lg w-[60px] h-[60px] overflow-hidden opacity-90"
      }
      onPress={() => setImageUrl()}
    >
      <Image source={{ uri: props.imageUrl }} className="w-full h-full" />
    </TouchableOpacity>
  );
};

const SingleProduct = (props) => {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [islike, setIsLike] = useState(false);
  const [isRecommend, setIsRecommend] = useState(false);
  const [isOver, setOver] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingOver, setIsLoadingOver] = useState(false);
  const [isLoadingRecommend, setIsLoadingRecommend] = useState(false);
  const [productimageUrl, setImageView] = useState("");
  const [dataState, setDataState] = useState({
    isLoading: true,
    data: [],
    error: false,
  });

  useEffect(() => {
    apiGet();
  }, []);

  const checkLike = () => {
    for (i = 0; i < props.OwnLike.length; i++) {
      if (props.OwnLike[i] == props.route.params.id) {
        arr = props.OwnLike;
        arr.splice(i, 1);
        props.setOwnLike(arr);
        setIsLike(false);
        likeApi("unlike");
        return true;
      }
    }
    // Ajouter au like
    setIsLike(true);
    likeApi("like");
    props.OwnLike.push(props.route.params.id);
  };

  const apiGet = () => {
    setDataState((prev) => {
      return { ...prev, isLoading: true, error: false };
    });
    axios({
      method: "GET",
      url: "https://chantier237.camencorp.com/API/MARKETPLACE/st_singleProduct.php",
      responseType: "json",
      headers: { "Access-Control-Allow-Origin": "*" },
      params: {
        product: props.route.params.id,
        id: props.idUser,
        action: "get",
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
          setIsLike(response.data.data.isLike);
          setIsRecommend(response.data.data.isRecommend);
          setImageView(response.data.data.imageUrl[0].imageUrl);
        }
        if (response.data.data.status == 1) {
          setOver(true);
        } else {
          setOver(false);
        }
      })
      .catch((error) => {
        console.log(error);
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

  const likeApi = (action) => {
    axios({
      method: "GET",
      url: "https://chantier237.camencorp.com/API/MARKETPLACE/st_likeProduct.php",
      responseType: "json",
      headers: { "Access-Control-Allow-Origin": "*" },
      params: {
        product: props.route.params.id,
        id: props.idUser,
        action: action,
      },
    });
  };

  const actionApi = (action) => {
    if (action == "recommend") {
      setIsLoadingRecommend(true);
    }
    if (action == "delete") {
      setIsLoadingDelete(true);
      setIsOpen(false);
    }
    if (action == "over" || action == "publy") {
      setIsLoadingOver(true);
    }
    axios({
      method: "GET",
      url: "https://chantier237.camencorp.com/API/MARKETPLACE/st_singleProduct.php",
      responseType: "json",
      headers: { "Access-Control-Allow-Origin": "*" },
      params: {
        product: props.route.params.id,
        id: props.idUser,
        action: action,
      },
    })
      .then((response) => {
        if (response.data.status == "ERROR") {
          if (action == "recommend") {
            stToast("Erreur lors de la recommadation");
          }
          if (action == "delete") {
            stToast("Erreur lors de la supression");
          }
          if (action == "over") {
            stToast("Erreur. Veuillez reessayer");
          }
          if (action == "publy") {
            stToast("Erreur. Veuillez reessayer");
          }
        } else {
          if (action == "recommend") {
            stToast("Recommendé");
            setIsRecommend(true);
          }
          if (action == "delete") {
            stToast("Suppression effectué");
            navigation.navigate("MarketPlaceHome");
          }
          if (action == "over") {
            stToast("Retiré de chantier237");
            setOver(false);
          }
          if (action == "publy") {
            stToast("Publié dans chantier237");
            setOver(true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        if (action == "recommend") {
          stToast("Erreur lors de la recommadation");
        }
        if (action == "delete") {
          stToast("Erreur lors de la supression");
        }
        if (action == "over") {
          stToast("Erreur. Veuillez reessayer");
        }
        if (action == "publy") {
          stToast("Erreur. Veuillez reessayer");
        }
      })
      .finally(() => {
        if (action == "recommend") {
          setIsLoadingRecommend(false);
        }
        if (action == "delete") {
          setIsLoadingDelete(false);
        }
        if (action == "over" || action == "publy") {
          setIsLoadingOver(false);
        }
      });
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

  return (
    <NativeBaseProvider>
      <SafeAreaView className="bg-white w-full h-max">
        <StatusBar backgroundColor="white" barStyle="dark-content" />

        {/* CHARGEMENT EN COURS */}

        {dataState.isLoading ? (
          <View className="flex-1 h-full items-center justify-center">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <></>
        )}

        {/* AUCUNE DONNEE TROUVE OU ERREUR */}

        {dataState.error ? (
          <View className="flex-1 h-full items-center justify-center gap-3">
            <Image source={NotFound} className="w-20 h-20" />
            <Text className="text-center">
              Aie aie aie! Verifier votre connexion et reessayer.
            </Text>
          </View>
        ) : (
          <></>
        )}

        {/* Affichage du produit */}

        {!dataState.isLoading && !dataState.error ? (
          <ScrollView
            className="flex-1 bg-white min-h-full"
            showsVerticalScrollIndicator={false}
          >
            <View className="w-full h-[340px] relative">
              <TouchableOpacity
                className="rounded-full w-4 h-4 absolute z-10 left-3 top-3 items-center justify-center p-4"
                style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <UilArrow size={30} color="white" />
              </TouchableOpacity>
              <Image
                source={{
                  uri: productimageUrl,
                }}
                className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-100"
              />
              <View className="w-full h-full items-center justify-end pt-3 pb-7">
                <View className="flex-row mb-4" style={{ gap: 15 }}>
                  {dataState.data.imageUrl.map((item) => {
                    return (
                      <ProductImage
                        {...item}
                        key={item.id}
                        productimageUrl={productimageUrl}
                        setImageView={setImageView}
                      />
                    );
                  })}
                </View>
              </View>
            </View>
            <View className="w-full bg-white rounded-2xl -translate-y-8 pt-5 px-5">
              <View className="w-full">
                <Text className="text-sm">
                  Catégorie {" >"}
                  {"  "}
                  <Text className="text-blue-700">
                    {dataState.data.category}
                  </Text>
                </Text>
                <View className="flex-row items-center justify-between w-full">
                  <Text
                    style={{ fontWeight: 600 }}
                    className="text-xl tracking-wider"
                  >
                    {dataState.data.name}
                  </Text>
                  <TouchableOpacity
                    className="items-center justify-center w-10 h-10"
                    onPress={() => checkLike()}
                  >
                    <Ionicons
                      name={islike ? "heart" : "heart-outline"}
                      size={islike ? 35 : 34}
                      mr="10"
                      color={islike ? "red" : "black"}
                    />
                  </TouchableOpacity>
                </View>
                <Text
                  className="text-gray-600 text-lg"
                  style={{ fontWeight: 600 }}
                >
                  {dataState.data.price} XAF
                </Text>
                <View className="gap-x-5 mt-4 flex-row items-center justify-start flex-wrap">
                  <View className="items-start justify-start gap-y-3">
                    <View className="flex-row items-center justify-start gap-x-2">
                      <Ionicons name="star" size={22} color="orange" />
                      <Text className="text-gray-700 text-sm">
                        {dataState.data.like} likes
                      </Text>
                    </View>
                    <View className="flex-row items-center justify-start gap-x-2">
                      <FontAwesome5 name="thumbs-up" size={20} color="blue" />
                      <Text className="text-gray-700 text-sm">
                        {dataState.data.recommandation} recommandations
                      </Text>
                    </View>
                  </View>
                  <View className="items-start justify-start gap-y-4">
                    <View className="flex-row items-center justify-start gap-x-2">
                      <FontAwesome5
                        name="calendar-alt"
                        size={20}
                        color="blue"
                      />
                      <Text className="text-gray-700 text-sm">
                        {dataState.data.date}
                      </Text>
                    </View>
                    <View className="flex-row items-center justify-start gap-x-2">
                      <FontAwesome5
                        name="map-marker-alt"
                        size={20}
                        color="blue"
                      />
                      <Text className="text-gray-700 text-sm">
                        {dataState.data.location}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text
                  className="text-lg mb-1 mt-5 text-blue-700 tracking-wide"
                  style={{ fontWeight: 600 }}
                >
                  Description
                </Text>
                <Text
                  style={{ fontWeight: 400, lineHeight: 18 }}
                  className="text-[16px] tracking-wide leading-10"
                >
                  {dataState.data.description}
                </Text>

                {props.idUser == dataState.data.user ? (
                  <View className="items-center justify-center flex-row mt-5 gap-x-5">
                    <Button
                      style={{
                        backgroundColor: "white",
                        width: "45%",
                        height: 47,
                        borderRadius: 20,
                        borderWidth: 1,
                        fontSize: 30,
                        fontWeight: 600,
                        justifyContent: "center",
                        color: "black",
                      }}
                      isLoading={isLoadingOver}
                      isDisabled={isLoadingOver}
                      size="lg"
                      isLoadingText="En cours..."
                      onPress={() => {
                        if (isOver) {
                          actionApi("over");
                        } else {
                          actionApi("publy");
                        }
                      }}
                    >
                      <Text
                        className="text-[18px] text-black tracking-widest"
                        style={{ fontWeight: 500 }}
                      >
                        {isOver ? "Retirer" : "Publier"}
                      </Text>
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "red",
                        width: "45%",
                        height: 47,
                        borderRadius: 20,
                        fontSize: 30,
                        fontWeight: 600,
                        justifyContent: "center",
                      }}
                      isLoading={isLoadingDelete}
                      isDisabled={isLoadingDelete}
                      size="lg"
                      isLoadingText="En cours..."
                      onPress={() => {
                        setIsOpen(true);
                      }}
                    >
                      <Text
                        className="text-[18px] text-white tracking-widest"
                        style={{ fontWeight: 500 }}
                      >
                        Supprimer
                      </Text>
                    </Button>
                  </View>
                ) : (
                  <View className="items-center justify-center flex-row mt-5 gap-x-5">
                    <Button
                      style={{
                        backgroundColor: "white",
                        width: "45%",
                        height: 47,
                        borderRadius: 20,
                        borderWidth: 1,
                        fontSize: 30,
                        fontWeight: 600,
                        justifyContent: "center",
                      }}
                      size="lg"
                      onPress={() => {
                        console.log(dataState);
                        Linking.openURL(`tel:${dataState.data.phone}`);
                      }}
                    >
                      <Text
                        className="text-[18px] text-black tracking-widest"
                        style={{ fontWeight: 500 }}
                      >
                        Appeler
                      </Text>
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "rgba(0,0,0,1)",
                        width: "45%",
                        height: 47,
                        borderRadius: 20,
                        fontSize: 30,
                        fontWeight: 600,
                        justifyContent: "center",
                      }}
                      isLoading={isLoadingRecommend}
                      isDisabled={isLoadingRecommend || isRecommend}
                      size="lg"
                      isLoadingText="en cours..."
                      onPress={() => {
                        actionApi("recommend");
                      }}
                    >
                      <Text
                        className="text-[18px] text-white tracking-widest"
                        style={{ fontWeight: 500 }}
                      >
                        {isRecommend ? "Recommandé" : "Recommander"}
                      </Text>
                    </Button>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        ) : (
          <></>
        )}
        <AlertDialog
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Supprimer l'article</AlertDialog.Header>
            <AlertDialog.Body>
              Etes vous sur de vouloir supprimer l'article ?
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  colorScheme="blue"
                  onPress={() => {
                    actionApi("delete");
                  }}
                  width="1/3"
                >
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
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default SingleProduct;
