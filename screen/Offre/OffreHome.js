import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LogoImage } from "../../assets";
import { Input, Menu, NativeBaseProvider, FormControl } from "native-base";
import UilTreePoint from "@iconscout/react-native-unicons/icons/uil-ellipsis-v";
import UilSearch from "@iconscout/react-native-unicons/icons/uil-search";
import OffreProfil from "../../components/OffreProfil";

const OffreHome = () => {
  const data = [
    {
      rowid: 1,
      job_category: "ing_genie_civil",
      title: "Recherche d'un ingenieur genie civil",
      description:
        "J'aurai besoin d'un plombier pour reparer la chasse de mes toilettes. Je crois qu'elle est bouchee.",
      date: "Aujourd'hui",
      lieu: "Douala",
      isPostuled: true,
      isAccepted: false,
    },
    {
      rowid: 2,
      job_category: "ferrailleur",
      title: "Recherche d'un ferrailleur experimente",
      description:
        "Besoin urgent d'e deux ferailleurs experimentes pour le tissage d'une dalle de 500M.",
      date: "Il y'a 2 jours",
      lieu: "Yaounde",
      isPostuled: false,
      isAccepted: true,
    },
    {
      rowid: 33,
      job_category: "other",
      title: "Besoin iminant d'un creuseur",
      description:
        "Nous recherchons un creuseur muscle et assez resistant. Pour creuser la fondation d'une maison de 2000M2",
      date: "Il y'a 1 semaine",
      lieu: "Bangue",
      isPostuled: false,
      isAccepted: false,
    },
    {
      rowid: 4,
      job_category: "menagere",
      title: "Demande d'une Nounou",
      description:
        "Besoin urgent d'une nounou qui prendra soin des enfants, la lessive, le menage, la vaisselle, et l'etude des enfants.",
      date: "Il y'a 1 mois",
      lieu: "Bonaberi",
      isPostuled: false,
      isAccepted: true,
    },
  ];

  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
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
              <Menu.Item>
                <Text className="text-lg">Offres postées</Text>
              </Menu.Item>
              <Menu.Item>
                <Text className="text-lg">Offres postulées</Text>
              </Menu.Item>
              <Menu.Item>
                <Text className="text-lg">Poster une offre</Text>
              </Menu.Item>
            </Menu>
          </View>
        </View>
        <ScrollView
          className="bg-white h-full w-full pb-14"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full px-4 py-4 gap-y-3">
            <Text className="text-[24px] tracking-wider pl-1 text-gray-800">
              Trouvez l'offre d'emploi 😊{"\n"}de votre choix
            </Text>

            <FormControl>
              <Input
                placeholder="Rechercher"
                type="text"
                className="text-base"
                name="userName"
                variant="rounded"
                InputRightElement={
                  <TouchableOpacity className="-translate-x-3">
                    <UilSearch size={30} color="blue" />
                  </TouchableOpacity>
                }
              />
            </FormControl>
            <Text className="pl-1 text-[15px] text-gray-500">
              Liste des emplois
            </Text>
          </View>

          {/* Liste des offres */}
          {data.map((item) => {
            return <OffreProfil {...item} key={item.rowid} />;
          })}

          <View className="h-14"></View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default OffreHome;
