import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  ToastAndroid,
  Platform,
  Pressable,
} from "react-native";
import { React, useState, useEffect } from "react";
import {
  Menu,
  NativeBaseProvider,
  Input,
  FormControl,
  Select,
  Button,
  TextArea,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { LogoImage } from "../../assets";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import UilTreePoint from "@iconscout/react-native-unicons/icons/uil-ellipsis-v";
import UilArrowRight from "@iconscout/react-native-unicons/icons/uil-angle-right";
import UilArrowDown from "@iconscout/react-native-unicons/icons/uil-angle-down";
import DatePicker from "../../components/DatePicker";
import axios from "axios";

const EditProfil = (props) => {
  const navigation = useNavigation();
  const [isPassword, setIsPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [show, setShow] = useState({
    oldPassword: false,
    password: false,
    confirmPassword: false,
  });
  const [dataInfo, setDataInfo] = useState({
    user: props.userId,
    action: "data",
    userName: props.dataUser.userName,
    lastName: props.dataUser.lastName,
    email: props.dataUser.email,
    jobCategory: props.dataUser.jobCategory,
    job: props.dataUser.job,
    phone: props.dataUser.phone,
    experience: props.dataUser.experience,
    sexe: props.dataUser.sexe,
    dateNaiss: props.dataUser.dateNaiss,
    description: props.dataUser.description,
  });
  const [passwordInfo, setPasswordInfo] = useState({
    user: props.userId,
    action: "password",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [isDataInfoEmpty, setDataInfoEmpty] = useState({
    userName: false,
    lastName: false,
    email: false,
    job: false,
    jobCategory: false,
    sexe: false,
    phone: false,
    experience: false,
    dateNaiss: false,
    description: false,
  });
  const [isPasswordInfoEmpty, setIsPasswordInfoEmpty] = useState({
    oldPassword: false,
    password: false,
    confirmPassword: false,
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

  const isDataEmpty = () => {
    for (const [cle, valeur] of Object.entries(dataInfo)) {
      if (valeur === "") {
        stToast("Veuillez entrer tous les champs");
        setDataInfoEmpty((prev) => {
          return { ...prev, [cle]: true };
        });
        return false;
      } else {
        setDataInfoEmpty((prev) => {
          return { ...prev, [cle]: false };
        });
      }
    }
    return true;
  };

  const isPasswordEmpty = () => {
    for (const [cle, valeur] of Object.entries(passwordInfo)) {
      if (valeur === "" || valeur.length < 8) {
        stToast("Veuillez entrer tous les champs");
        setIsPasswordInfoEmpty((prev) => {
          return { ...prev, [cle]: true };
        });
        return false;
      } else {
        setIsPasswordInfoEmpty((prev) => {
          return { ...prev, [cle]: false };
        });
      }
    }
    if (passwordInfo.password != passwordInfo.confirmPassword) {
      stToast("Veuillez confirmer le mot de passe");
      return false;
    }
    return true;
  };

  const submitData = () => {
    if (isDataEmpty()) {
      // Api pour informations personnelles
      setIsLoading(true);
      axios({
        method: "POST",
        url: "https://chantier237.camencorp.com/API/PROFIL/st_editProfil.php",
        responseType: "json",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: dataInfo,
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.status == "ERROR") {
            stToast("Erreur lors de la modification. Veuillez reessayer.");
          } else if (response.data.status == "OK") {
            stToast("Modification effectué");
            navigation.navigate("ProfilHome");
          }
        })
        .catch((error) => {
          stToast("Erreur lors de la modification. Veuillez reessayer.");
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const submitPassword = () => {
    if (isPasswordEmpty()) {
      // Api pour le mot de passe
      setIsLoadingPassword(true);
      axios({
        method: "POST",
        url: "https://chantier237.camencorp.com/API/PROFIL/st_editProfil.php",
        responseType: "json",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: passwordInfo,
      })
        .then((response) => {
          if (response.data.status == "ERROR") {
            stToast("Erreur lors de la modification. Veuillez reessayer.");
          } else if (response.data.status == "PASSWORD_INCORRECT") {
            stToast("Mot de passe incorrect !");
          } else if (response.data.status == "OK") {
            stToast("Mot de passe modifié");
            navigation.navigate("ProfilHome");
          }
        })
        .catch((error) => {
          stToast("Erreur lors de la modification. Veuillez reessayer.");
        })
        .finally(() => {
          setIsLoadingPassword(false);
        });
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
              Chantier237
            </Text>
          </View>
          <View>
            <Menu
              w="220"
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
                  navigation.navigate("ProfilHome");
                }}
              >
                <Text className="text-lg">Votre profil</Text>
              </Menu.Item>
              <Menu.Item
                onPress={() => {
                  navigation.navigate("About");
                }}
              >
                <Text className="text-lg">A propos</Text>
              </Menu.Item>
              <Menu.Item
                onPress={() => {
                  props.shareApp();
                }}
              >
                <Text className="text-lg">Partager l'application</Text>
              </Menu.Item>
              <Menu.Item
                onPress={() => {
                  props.logOut();
                }}
              >
                <Text className="text-lg">Se deconnecter</Text>
              </Menu.Item>
            </Menu>
          </View>
        </View>
        {isPassword ? (
          // Mot de passe
          <ScrollView
            className="bg-white h-full w-full pb-14 px-5"
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              className="items-center justify-between flex-row w-full mt-4"
              onPress={() => {
                setIsPassword(false);
              }}
            >
              <Text className="text-[24px] tracking-wider pl-1 text-gray-800 text-left">
                <Text className="text-[30px] text-blue-700">I</Text>nformations
                personnelles
              </Text>
              <UilArrowRight color="black" size={30} />
            </TouchableOpacity>
            <View className="items-center justify-between flex-row w-full">
              <Text className="text-[24px] tracking-wider pl-1 text-gray-800 text-left my-5">
                <Text className="text-[30px] text-blue-700">M</Text>odifier le
                mot de passe
              </Text>
              <UilArrowDown color="black" size={30} />
            </View>

            {/* Ancien mot de passe */}
            <Text className="mb-2 text-base">Ancien mot de passe</Text>
            <FormControl isInvalid={isPasswordInfoEmpty.oldPassword} mb="5">
              <Input
                type={show.oldPassword ? "text" : "password"}
                className="text-base"
                onChangeText={(value) =>
                  setPasswordInfo({ ...passwordInfo, oldPassword: value })
                }
                InputRightElement={
                  <Pressable
                    onPress={() =>
                      setShow((prev) => ({
                        ...prev,
                        oldPassword: !prev.oldPassword,
                      }))
                    }
                  >
                    <MaterialIcons
                      name={show.oldPassword ? "visibility" : "visibility-off"}
                      size={25}
                      mr="2"
                      color="black"
                      style={{ marginRight: 13 }}
                    />
                  </Pressable>
                }
              />
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide et doit avoir minimum 8
                caracteres.
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Nouveau mot de passe */}
            <Text className="mb-2 text-base">Ancien mot de passe</Text>
            <FormControl isInvalid={isPasswordInfoEmpty.password} mb="5">
              <Input
                type={show.password ? "text" : "password"}
                className="text-base"
                onChangeText={(value) =>
                  setPasswordInfo({ ...passwordInfo, password: value })
                }
                InputRightElement={
                  <Pressable
                    onPress={() =>
                      setShow((prev) => ({
                        ...prev,
                        password: !prev.password,
                      }))
                    }
                  >
                    <MaterialIcons
                      name={show.password ? "visibility" : "visibility-off"}
                      size={25}
                      mr="2"
                      color="black"
                      style={{ marginRight: 13 }}
                    />
                  </Pressable>
                }
              />
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide et doit avoir minimum 8
                caracteres.
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Confirmez mot de passe */}
            <Text className="mb-2 text-base">Confirmez le mot de passe</Text>
            <FormControl isInvalid={isPasswordInfoEmpty.confirmPassword} mb="5">
              <Input
                type={show.confirmPassword ? "text" : "password"}
                className="text-base"
                onChangeText={(value) =>
                  setPasswordInfo({ ...passwordInfo, confirmPassword: value })
                }
                InputRightElement={
                  <Pressable
                    onPress={() =>
                      setShow((prev) => ({
                        ...prev,
                        confirmPassword: !prev.confirmPassword,
                      }))
                    }
                  >
                    <MaterialIcons
                      name={
                        show.confirmPassword ? "visibility" : "visibility-off"
                      }
                      size={25}
                      mr="2"
                      color="black"
                      style={{ marginRight: 13 }}
                    />
                  </Pressable>
                }
              />
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide et doit avoir minimum 8
                caracteres.
              </FormControl.ErrorMessage>
            </FormControl>

            <Button
              style={{
                backgroundColor: "rgba(0,0,0,0.9)",
                width: "100%",
                height: 60,
                borderRadius: 7,
                fontSize: 25,
                marginTop: 20,
              }}
              onPress={submitPassword}
              size="lg"
              colorScheme="black"
              isLoading={isLoadingPassword}
              disabled={isLoadingPassword}
              isLoadingText="Modification..."
            >
              <Text className="text-white text-lg" style={{ fontWeight: 600 }}>
                Modifier
              </Text>
            </Button>
          </ScrollView>
        ) : (
          // Informations personnelles
          <ScrollView
            className="bg-white h-full w-full pb-14 px-5"
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              className="items-center justify-between flex-row w-full mt-4"
              onPress={() => {
                setIsPassword(true);
              }}
            >
              <Text className="text-[24px] tracking-wider pl-1 text-gray-800 text-left">
                <Text className="text-[30px] text-blue-700">M</Text>odifier le
                mot de passe
              </Text>
              <UilArrowRight color="black" size={30} />
            </TouchableOpacity>
            <View className="items-center justify-between flex-row w-full">
              <Text className="text-[24px] tracking-wider pl-1 text-gray-800 text-left my-5">
                <Text className="text-[30px] text-blue-700">I</Text>nformations
                personnelles
              </Text>
              <UilArrowDown color="black" size={30} />
            </View>

            {/* Nom d'utilisateur */}
            <Text className="mb-2 text-base">Nom d'utilisateur</Text>
            <FormControl isInvalid={isDataInfoEmpty.userName} mb="5">
              <Input
                placeholder="Nom d'utilisateur"
                value={dataInfo.userName}
                type="text"
                className="text-sm"
                name="userName"
                onChangeText={(value) =>
                  setDataInfo({ ...dataInfo, userName: value })
                }
              />
              <FormControl.HelperText>
                Veuillez renseigner un seul nom
              </FormControl.HelperText>
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide.
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Nom */}
            <Text className="mb-2 text-base">Votre nom</Text>
            <FormControl isInvalid={isDataInfoEmpty.lastName} mb="5">
              <Input
                placeholder="Votre nom"
                value={dataInfo.lastName}
                type="text"
                className="text-sm"
                onChangeText={(value) =>
                  setDataInfo({ ...dataInfo, lastName: value })
                }
              />
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide.
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Email */}
            <Text className="mb-2 text-base">Votre email</Text>
            <FormControl isInvalid={isDataInfoEmpty.email} mb="5">
              <Input
                placeholder="Votre email"
                value={dataInfo.email}
                type="text"
                className="text-sm"
                onChangeText={(value) =>
                  setDataInfo({ ...dataInfo, email: value })
                }
              />
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide.
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Selectionner votre categorie */}
            <Text className="mb-2 text-base">Selectionner votre categorie</Text>
            <FormControl isInvalid={isDataInfoEmpty.jobCategory} mb="5">
              <Select
                accessibilityLabel="Selectionner votre categorie"
                placeholder="Selectionner votre categorie"
                className="text-sm"
                _selectedItem={{
                  bg: "teal.600",
                }}
                selectedValue={dataInfo.jobCategory}
                mt="1"
                onValueChange={(value) =>
                  setDataInfo({ ...dataInfo, jobCategory: value })
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
              </Select>
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide.
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Emploi */}
            <Text className="mb-2 text-base">Votre emploi</Text>
            <FormControl isInvalid={isDataInfoEmpty.job} mb="5">
              <Input
                placeholder="Nom de votre metier"
                value={dataInfo.job}
                type="text"
                className="text-sm"
                onChangeText={(value) =>
                  setDataInfo({ ...dataInfo, job: value })
                }
              />
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide.
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Numero de telephone */}
            <Text className="mb-2 text-base">Numero de téléphone</Text>
            <FormControl isInvalid={isDataInfoEmpty.phone} mb="5">
              <Input
                placeholder="Numero de téléphone"
                value={`${dataInfo.phone}`}
                type="text"
                keyboardType="numeric"
                className="text-sm"
                onChangeText={(value) =>
                  setDataInfo({ ...dataInfo, phone: value })
                }
              />
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide.
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Anneés d'experience */}
            <Text className="mb-2 text-base">Anneés d'experience</Text>
            <FormControl isInvalid={isDataInfoEmpty.experience} mb="5">
              <Input
                placeholder="Années d'expérience"
                value={`${dataInfo.experience}`}
                type="text"
                keyboardType="numeric"
                className="text-sm"
                onChangeText={(value) =>
                  setDataInfo({ ...dataInfo, experience: value })
                }
              />
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide.
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Sexe */}
            <Text className="mb-2 text-base">Sexe</Text>
            <FormControl isInvalid={isDataInfoEmpty.sexe} mb="5">
              <Select
                accessibilityLabel="Votre sexe"
                placeholder="Selectionner votre sexe"
                className="text-sm"
                _selectedItem={{
                  bg: "teal.600",
                }}
                mt="1"
                selectedValue={dataInfo.sexe}
                onValueChange={(value) =>
                  setDataInfo({ ...dataInfo, sexe: value })
                }
              >
                <Select.Item label="Homme" value="homme" />
                <Select.Item label="Femme" value="femme" />
                <Select.Item label="Neutre" value="neutre" />
              </Select>
              <FormControl.ErrorMessage>
                Ce champ ne doit pas etre vide.
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Date de naissance ************************************* */}
            <Text className="mb-2 text-base">Date de naissance</Text>
            <DatePicker
              defaultDate={dataInfo.dateNaiss}
              onDateChange={(value) => {
                setDataInfo({
                  ...dataInfo,
                  dateNaiss: `${value.getFullYear()}-${
                    value.getMonth() + 1
                  }-${value.getDate()}`,
                });
              }}
            />
            {isDataInfoEmpty.dateNaiss && (
              <Text className="mb-5 text-red-500 text-sm text-left">
                Ce champ ne doit pas etre vide
              </Text>
            )}

            {/* Description */}
            <Text className="mb-2 text-base mt-5">Description</Text>
            <TextArea
              totalLines={20}
              isInvalid={isDataInfoEmpty.description}
              placeholder="Votre descriptif"
              value={dataInfo.description}
              onChangeText={(value) =>
                setDataInfo({ ...dataInfo, description: value })
              }
            />
            {isDataInfoEmpty.description && (
              <Text className="mb-5 text-red-500 text-sm text-left mt-2">
                Ce champ ne doit pas etre vide
              </Text>
            )}

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
              isLoadingText="Modification..."
            >
              <Text className="text-white text-lg" style={{ fontWeight: 600 }}>
                Modifier
              </Text>
            </Button>

            <View className="h-20"></View>
          </ScrollView>
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default EditProfil;
