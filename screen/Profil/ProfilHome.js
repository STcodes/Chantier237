import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Menu, NativeBaseProvider } from "native-base";
import UilTreePoint from "@iconscout/react-native-unicons/icons/uil-ellipsis-v";
import { useNavigation } from "@react-navigation/native";
import StarContainer from "../../components/StarContainer";
import UilCalendar from "@iconscout/react-native-unicons/icons/uil-calender";
import UilPhone from "@iconscout/react-native-unicons/icons/uil-phone";
import UilEmail from "@iconscout/react-native-unicons/icons/uil-envelope";

const ProfilHome = (props) => {
  const navigation = useNavigation();
  const user = props.userId;

  return (
    <NativeBaseProvider>
      <ScrollView
        className="flex-1 bg-white w-full h-full"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full h-[240px] bg-slate-500 rounded-b-3xl overflow-hidden">
          <Image
            source={{
              uri: "https://img.freepik.com/free-photo/beautiful-landscape-mother-nature_23-2148992408.jpg?w=740&t=st=1689963168~exp=1689963768~hmac=8277dce5260a1fa5ef62f60dea0d652cd3dd9c8a6303db1d2a3650eb940bc72b",
            }}
            className="w-full h-full object-cover opacity-90"
          />
          <View className="absolute right-2 top-[50px] pt-1 pb-1 pl-1 pr-1 bg-white rounded-full">
            <Menu
              w="220"
              trigger={(triggerProps) => {
                return (
                  <TouchableOpacity
                    accessibilityLabel="More options menu"
                    {...triggerProps}
                  >
                    <UilTreePoint color="black" size={30} />
                  </TouchableOpacity>
                );
              }}
            >
              <Menu.Item
                onPress={() => {
                  navigation.navigate("EditProfil");
                }}
              >
                <Text className="text-lg">Modifier votre profil</Text>
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
        <View className="items-center justify-center w-full h-fit">
          <View className="bg-white w-28 h-28 p-2 rounded-full items-center justify-center z-20 -translate-y-12 -mb-12">
            <View className="w-5 h-5 rounded-full bg-white absolute top-[10px] right-[10px] z-10 items-center justify-center">
              <View className="w-[11px] h-[11px] bg-blue-600 rounded-full"></View>
            </View>
            <Image
              source={{
                uri: "https://img.freepik.com/free-photo/high-fashion-look-glamor-closeup-portrait-beautiful-sexy-stylish-blond-caucasian-young-woman-model-with-bright-makeup-with-red-lips-with-perfect-clean-skin-with-colorful-accessories_158538-13718.jpg?w=360&t=st=1689960998~exp=1689961598~hmac=d6a2537740df09154f7c2b8757a2e0bc35ef492bf84881336e65a9a9e3f91650",
              }}
              className="w-full h-full rounded-full"
            />
          </View>
          <Text className="text-2xl mb-2" style={{ fontWeight: 600 }}>
            Diana Melanie
          </Text>
          <Text className="text-sm text-center mb-2">
            designer web{" "}
            <Text className="text-blue-600">@Developpement web</Text>
          </Text>
          <Text className="text-sm text-center mb-2">
            02 an(s) d'experience
          </Text>
          <StarContainer evaluation={3} />
          <View className="flex-row items-start justify-center mt-5 mb-6 w-full px-4">
            <View className="flex-col items-center justify-start gap-y-2 w-[33%]">
              <View className="bg-blue-100 items-center justify-center p-3 rounded-full">
                <UilEmail size={30} color="blue" />
              </View>
              <Text className="text-center text-xs">MeDiana@gmail.com</Text>
            </View>
            <View className="flex-col items-center justify-start gap-y-2 w-[33%]">
              <View className="bg-blue-100 items-center justify-center p-3 rounded-full">
                <UilPhone size={30} color="blue" />
              </View>
              <Text className="text-center text-xs">+237 671895623</Text>
            </View>
            <View className="flex-col items-center justify-start gap-y-2 w-[33%]">
              <View className="bg-blue-100 items-center justify-center p-3 rounded-full">
                <UilCalendar size={30} color="blue" />
              </View>
              <Text className="text-center text-xs">07 Juin 2023</Text>
            </View>
          </View>
          <View className="w-full items-start px-4 mb-5">
            <Text className="text-xl mb-2" style={{ fontWeight: 600 }}>
              Description
            </Text>
            <Text style={{ fontWeight: 400, lineHeight: 18 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              pariatur saepe tenetur eaque autem culpa rerum maxime, nesciunt
              quis cum natus consectetur nostrum doloremque officiis distinctio
              dolor magnam cupiditate laboriosam vero ut dolorem quam. Voluptate
              ullam iusto facilis doloremque dolorem earum deserunt similique,
              magni, nesciunt eum ut architecto adipisci dolore !
            </Text>
          </View>
        </View>
        <View className="w-full items-start px-4">
          <Text className="text-xl mb-4" style={{ fontWeight: 600 }}>
            Vos réalisations
          </Text>
          <View className="w-full item-center justify-around gap-5 flex-row flex-wrap">
            <Image
              source={{
                uri: "https://img.freepik.com/free-photo/architecture-nature-merge-modern-design-generative-ai_188544-9636.jpg?w=826&t=st=1689968211~exp=1689968811~hmac=58451e77678dad420398a2db25b359a866e0d3dde78ad1873053329ce25ff961",
              }}
              className="rounded-2xl w-[44%] h-[180px]"
            />
            <Image
              source={{
                uri: "https://img.freepik.com/free-photo/3d-electric-car-building_23-2148972401.jpg?w=826&t=st=1689968091~exp=1689968691~hmac=f55663795ad30499d0c2e4e2635711ef8aa5d39f4a830737f3436b799c1830f8",
              }}
              className="rounded-2xl w-[44%] h-[180px]"
            />
            <Image
              source={{
                uri: "https://img.freepik.com/free-photo/modern-residential-district-with-green-roof-balcony-generated-by-ai_188544-10276.jpg?w=826&t=st=1689968149~exp=1689968749~hmac=28fc622133f3b632787aca6dba16d314e53c5814eb7ae43e78a48d168968ac0e",
              }}
              className="rounded-2xl w-[44%] h-[180px]"
            />
            <Image
              source={{
                uri: "https://img.freepik.com/free-photo/interior-shot-modern-house-kitchen-with-large-windows_181624-24368.jpg?w=740&t=st=1689968185~exp=1689968785~hmac=0ecec209f58a156170810f5bd52347e9cbe9334ca79a9265bd6459da846427c9",
              }}
              className="rounded-2xl w-[44%] h-[180px]"
            />
          </View>
        </View>
        <View className="h-5"></View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default ProfilHome;
