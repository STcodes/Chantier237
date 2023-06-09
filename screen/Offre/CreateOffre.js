import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Platform,
} from "react-native";
import Toast from "react-native-root-toast";
import { React, useState } from "react";
import {
  Input,
  Menu,
  NativeBaseProvider,
  FormControl,
  Select,
  Button,
  TextArea,
} from "native-base";
import { LogoImage } from "../../assets";
import UilTreePoint from "@iconscout/react-native-unicons/icons/uil-ellipsis-v";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const CreateOffre = ({ idUser }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    jobCategory: "",
    location: "",
    nbPers: 0,
    salaire: 0,
    salaireFrequence: "",
    saliereNegoci: "",
    libelle: "",
    description: "",
    temps: "",
    idUser: idUser,
  });

  const [isDataEmpty, setIsDataEmpty] = useState({
    jobCategory: false,
    location: false,
    nbPers: false,
    salaire: false,
    salaireFrequence: false,
    saliereNegoci: false,
    libelle: false,
    description: false,
    temps: false,
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

  const api = () => {
    setIsLoading(true);
    axios({
      method: "POST",
      url: "https://chantier237.camencorp.com/API/OFFER/st_createOffer.php",
      responseType: "json",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: data,
    })
      .then((response) => {
        if (response.data.status == "ERROR") {
          //TOAST THE ERROR
          stToast(response.data.message);
        }
        if (response.data.status == "OK") {
          stToast(response.data.message);
        }
      })
      .catch((error) => {
        // toat error
        stToast("Erreur lors de l'enregistrement. Veuillez reessayer.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const submitData = () => {
    if (
      data.jobCategory != "" &&
      data.location != "" &&
      data.nbPers != 0 &&
      data.salaire != 0 &&
      data.salaireFrequence != "" &&
      data.saliereNegoci != "" &&
      data.libelle != "" &&
      data.description != "" &&
      data.temps != ""
    ) {
      api();
    } else {
      if (data.jobCategory == "") {
        setIsDataEmpty((prev) => {
          return { ...prev, jobCategory: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, jobCategory: false };
        });
      }
      if (data.location == "") {
        setIsDataEmpty((prev) => {
          return { ...prev, location: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, location: false };
        });
      }
      if (data.nbPers == 0) {
        setIsDataEmpty((prev) => {
          return { ...prev, nbPers: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, nbPers: false };
        });
      }
      if (data.salaire == 0) {
        setIsDataEmpty((prev) => {
          return { ...prev, salaire: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, salaire: false };
        });
      }
      if (data.salaireFrequence == "") {
        setIsDataEmpty((prev) => {
          return { ...prev, salaireFrequence: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, salaireFrequence: false };
        });
      }
      if (data.saliereNegoci == "") {
        setIsDataEmpty((prev) => {
          return { ...prev, saliereNegoci: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, saliereNegoci: false };
        });
      }
      if (data.libelle == "") {
        setIsDataEmpty((prev) => {
          return { ...prev, libelle: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, libelle: false };
        });
      }
      if (data.description == "") {
        setIsDataEmpty((prev) => {
          return { ...prev, description: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, description: false };
        });
      }
      if (data.temps == "") {
        setIsDataEmpty((prev) => {
          return { ...prev, temps: true };
        });
      } else {
        setIsDataEmpty((prev) => {
          return { ...prev, temps: false };
        });
      }
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView className="bg-white w-full">
        <StatusBar backgroundColor="white" barStyle="dark-content" />
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
                  navigation.navigate("OffreHome");
                }}
              >
                <Text className="text-lg">Liste des offres</Text>
              </Menu.Item>
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
            </Menu>
          </View>
        </View>
        <ScrollView
          className="bg-white h-full w-full pb-14 px-5"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-[24px] tracking-wider pl-1 text-gray-800 text-left my-5">
            Poster une offre d'emploi 🤑
          </Text>

          {/* Job category */}
          <Text className="mb-2 text-base">Categorie de l'emploi</Text>
          <FormControl isInvalid={isDataEmpty.jobCategory} mb="5">
            <Select
              accessibilityLabel="Categorie de l'emploi"
              placeholder="Categorie de l'emploi"
              className="text-sm"
              _selectedItem={{
                bg: "teal.600",
              }}
              onValueChange={(value) =>
                setData({ ...data, jobCategory: value })
              }
            >
              <Select.Item
                label="Ingenieur genie civil"
                value="ing_genie_civil"
              />
              <Select.Item label="Staffeur" value="staffeur" />
              <Select.Item label="Macons" value="macon" />
              <Select.Item label="Manoeuvre" value="manoeuvre" />
              <Select.Item label="Crepisseur" value="crepisseur" />
              <Select.Item label="Livreur d'eau" value="livreur_eau" />
              <Select.Item
                label="Travailleurs d'etancheite"
                value="etancheite"
              />
              <Select.Item label="Plombiers" value="plombier" />
              <Select.Item label="Electricien" value="electricien" />
              <Select.Item label="Ferrailleur" value="ferrailleur" />
              <Select.Item label="Travailleur de fouille" value="fouille" />
              <Select.Item label="Carreleur" value="carreleur" />
              <Select.Item label="Menuisier" value="menuisier" />
              <Select.Item label="Charpentier" value="charpentier" />
              <Select.Item label="Menagere" value="menagere" />
              <Select.Item label="Autre" value="other" />
            </Select>
            <FormControl.ErrorMessage>
              Ce champ ne doit pas etre vide.
            </FormControl.ErrorMessage>
          </FormControl>

          {/* Location */}
          <Text className="mb-2 text-base">Lieu de travail</Text>
          <FormControl isInvalid={isDataEmpty.location} mb="5">
            <Input
              placeholder="Lieu de travail"
              type="text"
              className="text-sm"
              onChangeText={(value) => setData({ ...data, location: value })}
            />
            <FormControl.ErrorMessage>
              Ce champ ne doit pas etre vide.
            </FormControl.ErrorMessage>
          </FormControl>

          {/* Nombre de personnes */}
          <Text className="mb-2 text-base">Nombre de places pour l'offre</Text>
          <FormControl isInvalid={isDataEmpty.nbPers} mb="5">
            <Input
              placeholder="Nombre de personnes souhaites"
              type="text"
              className="text-sm"
              keyboardType="numeric"
              onChangeText={(value) => setData({ ...data, nbPers: value })}
            />
            <FormControl.ErrorMessage>
              Ce champ ne doit pas etre vide.
            </FormControl.ErrorMessage>
            <FormControl.HelperText>Entrer un nombre</FormControl.HelperText>
          </FormControl>

          {/* Temps */}
          <Text className="mb-2 text-base">Periode de travail</Text>
          <FormControl isInvalid={isDataEmpty.temps} mb="5">
            <Select
              placeholder="Periode de travail"
              className="text-sm"
              _selectedItem={{
                bg: "teal.600",
              }}
              onValueChange={(value) => setData({ ...data, temps: value })}
            >
              <Select.Item label="Temps plein" value="temps plein" />
              <Select.Item label="Temps partiel" value="temps partielle" />
            </Select>
            <FormControl.ErrorMessage>
              Ce champ ne doit pas etre vide.
            </FormControl.ErrorMessage>
          </FormControl>

          {/* Salaire */}
          <Text className="mb-2 text-base">Salaire</Text>
          <FormControl isInvalid={isDataEmpty.salaire} mb="5">
            <Input
              placeholder="Salaire"
              type="text"
              className="text-sm"
              keyboardType="numeric"
              InputRightElement={
                <Text className="text-bold text-[16px]">FCFA </Text>
              }
              onChangeText={(value) => setData({ ...data, salaire: value })}
            />
            <FormControl.HelperText>Entrer un nombre</FormControl.HelperText>
            <FormControl.ErrorMessage>
              Ce champ ne doit pas etre vide.
            </FormControl.ErrorMessage>
          </FormControl>

          {/* frequence de paiement */}
          <Text className="mb-2 text-base">Frequence de paiement</Text>
          <FormControl isInvalid={isDataEmpty.salaireFrequence} mb="5">
            <Select
              accessibilityLabel="Frequence de paiement"
              placeholder="Frequence de paiement"
              className="text-sm"
              _selectedItem={{
                bg: "teal.600",
              }}
              onValueChange={(value) =>
                setData({ ...data, salaireFrequence: value })
              }
            >
              <Select.Item label="par heure" value="par heure" />
              <Select.Item label="par jour" value="par jour" />
              <Select.Item label="par semaine" value="par semaine" />
              <Select.Item label="par mois" value="par mois" />
            </Select>
            <FormControl.ErrorMessage>
              Ce champ ne doit pas etre vide.
            </FormControl.ErrorMessage>
          </FormControl>

          {/* Negociabilite du salaire */}
          <Text className="mb-2 text-base">Negociabilite du salaire</Text>
          <FormControl isInvalid={isDataEmpty.saliereNegoci} mb="5">
            <Select
              accessibilityLabel="Negociabilite du salaire"
              placeholder="Negociabilite du salaire"
              className="text-sm"
              _selectedItem={{
                bg: "teal.600",
              }}
              onValueChange={(value) =>
                setData({ ...data, saliereNegoci: value })
              }
            >
              <Select.Item label="Négociable" value="Négociable" />
              <Select.Item label="Non négociable" value="Non négociable" />
            </Select>
            <FormControl.ErrorMessage>
              Ce champ ne doit pas etre vide.
            </FormControl.ErrorMessage>
          </FormControl>

          {/* Libelle */}
          <Text className="mb-2 text-base">Libelle</Text>
          <FormControl isInvalid={isDataEmpty.libelle} mb="5">
            <Input
              placeholder="Recherche d'un crepisseur"
              type="text"
              className="text-sm"
              onChangeText={(value) => setData({ ...data, libelle: value })}
            />
            <FormControl.ErrorMessage>
              Ce champ ne doit pas etre vide.
            </FormControl.ErrorMessage>
            <FormControl.HelperText>
              Libelle de recherche d'emploi. Soyez bref et precis.
            </FormControl.HelperText>
          </FormControl>

          {/* Description */}

          <Text className="mb-2 text-base">Description de l'offre</Text>
          <TextArea
            totalLines={15}
            isInvalid={isDataEmpty.description}
            placeholder="Description de l'emploi"
            onChangeText={(value) => setData({ ...data, description: value })}
          />

          <Button
            style={{
              backgroundColor: "rgba(0,0,0,0.9)",
              width: "100%",
              height: 60,
              borderRadius: 7,
              fontSize: 25,
              marginTop: 20,
            }}
            onPress={submitData}
            size="lg"
            colorScheme="black"
            isLoading={isLoading}
            disabled={isLoading}
            isLoadingText="Enregistrement..."
          >
            <Text className="text-white text-lg" style={{ fontWeight: 600 }}>
              Poster l'offre
            </Text>
          </Button>

          <View className="h-20"></View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default CreateOffre;
