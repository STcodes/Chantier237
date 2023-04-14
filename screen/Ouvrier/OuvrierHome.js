import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import UilConstructor from "@iconscout/react-native-unicons/icons/uil-constructor";
import UilBolt from "@iconscout/react-native-unicons/icons/uil-bolt-alt";
import UilLaptop from "@iconscout/react-native-unicons/icons/uil-laptop-cloud";
import UilWheel from "@iconscout/react-native-unicons/icons/uil-wheel-barrow";
import UilTear from "@iconscout/react-native-unicons/icons/uil-tear";
import OuvrierProfil from "../../components/OuvrierProfil";
import { LogoImage } from "../../assets/";
import { React, useState } from "react";

const OuvrierHome = () => {
  const [categorie, setCategory] = useState("genie civil");
  const data = [
    {
      id: 0,
      name: "Thierry SITIO",
      imageUrl:
        "https://img.freepik.com/premium-psd/african-descent-man-male-studio-concept_53876-22459.jpg?w=740",
      description: "Je suis tres competent alors n'hesitez pas a me contactez",
      evaluation: 5,
    },
    {
      id: 1,
      name: "steve KAZOCK",
      imageUrl:
        "https://img.freepik.com/free-photo/portrait-african-american-model_23-2149072141.jpg?w=360&t=st=1681147874~exp=1681148474~hmac=ca169f0350782494d43219890b45a65bb3daf9953892226f355248c227785ad0",
      description: "Je suis tres competent alors ",
      evaluation: 4,
    },
    {
      id: 2,
      name: "Cynthia Mermont",
      imageUrl:
        "https://img.freepik.com/free-photo/beautiful-brunette-woman-portrait-smiling-face_53876-137688.jpg?size=626&ext=jpg",
      description: "Je suis tres competent alors n'hesitez pas a me contactez",
      evaluation: 3,
    },
    {
      id: 3,
      name: "Audrey Yves",
      imageUrl:
        "https://img.freepik.com/free-photo/medium-shot-smiley-woman-posing_23-2149439882.jpg?size=626&ext=jpg",
      description: "Je suis tres competent alors n'hesitez pas a me contactez",
      evaluation: 3,
    },
    {
      id: 4,
      name: "Chris Alexandre",
      imageUrl:
        "https://img.freepik.com/free-photo/dremy-blue-eyed-male-with-positive-expression-broad-smile-shows-white-teeth-looks-into-distance-thinks-about-something-wears-elegant-shirt-isolated-white-wall-with-blank-space_176532-6511.jpg?size=626&ext=jpg",
      description: "Je suis tres competent alors n'hesitez pas a me contactez",
      evaluation: 2,
    },
    {
      id: 5,
      name: "Selena Gomez",
      imageUrl:
        "https://img.freepik.com/free-photo/alluring-woman-posing-alone_23-2148708975.jpg?size=626&ext=jpg",
      description: "Je suis tres competent alors n'hesitez pas",
      evaluation: 1,
    },
  ];

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <ScrollView
        className="bg-white flex-1 px-2 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full flex-row items-center justify-start gap-2 pl-2">
          <Image source={LogoImage} className="w-16 h-16" />
          <Text className="text-bold text-[23px]">Chantier 237</Text>
        </View>

        <View className="flex-col items-start justify-center mb-5 mt-6 px-3 w-full ">
          <Text className="text-bold text-[25px] text-blue-900 mb-1">
            Categories
          </Text>
          <Text className="mb-3">Choisir la categorie des travailleurs</Text>
          <ScrollView
            horizontal
            className="gap-3 py-2"
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              className={
                categorie == "genie civil"
                  ? "rounded-xl p-3 items-center justify-center bg-blue-600 w-28 gap-2"
                  : "rounded-xl p-3 items-center justify-center bg-orange-100 w-28 gap-2 "
              }
              onPress={() => {
                setCategory("genie civil");
              }}
            >
              <UilConstructor
                size="50"
                color={categorie == "genie civil" ? "white" : "black"}
              />

              <Text
                className={
                  categorie == "genie civil"
                    ? "text-white text-center text-bold"
                    : "text-black text-center text-bold"
                }
              >
                Genie civil
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={
                categorie == "genie informatique"
                  ? "rounded-xl p-3 items-center justify-center bg-blue-600 w-28 gap-2"
                  : "rounded-xl p-3 items-center justify-cente bg-orange-100 w-28 gap-2"
              }
              onPress={() => {
                setCategory("genie informatique");
              }}
            >
              <UilLaptop
                size="50"
                color={categorie == "genie informatique" ? "white" : "black"}
              />
              <Text
                className={
                  categorie == "genie informatique"
                    ? "text-white text-center text-bold"
                    : "text-black text-center text-bold"
                }
              >
                Genie Informatique
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={
                categorie == "genie electrique"
                  ? "rounded-xl p-3 items-center justify-center bg-blue-600 w-28 gap-2"
                  : "rounded-xl p-3 items-center justify-center bg-orange-100 w-28 gap-2"
              }
              onPress={() => {
                setCategory("genie electrique");
              }}
            >
              <UilBolt
                size="50"
                color={categorie == "genie electrique" ? "white" : "black"}
              />
              <Text
                className={
                  categorie == "genie electrique"
                    ? "text-white text-center text-bold"
                    : "text-black text-center text-bold"
                }
              >
                Genie electrique
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={
                categorie == "plomberie"
                  ? "rounded-xl p-3 items-center justify-center bg-blue-600 w-28 gap-2"
                  : "rounded-xl p-3 items-center justify-center bg-orange-100 w-28 gap-2"
              }
              onPress={() => {
                setCategory("plomberie");
              }}
            >
              <UilTear
                size="50"
                color={categorie == "plomberie" ? "white" : "black"}
              />
              <Text
                className={
                  categorie == "plomberie"
                    ? "text-white text-center text-bold"
                    : "text-black text-center text-bold"
                }
              >
                Plomberie
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={
                categorie == "maconnerie"
                  ? "rounded-xl p-3 items-center justify-center bg-blue-600 w-28 gap-2"
                  : "rounded-xl p-3 items-center justify-center bg-orange-100 w-28 gap-2"
              }
              onPress={() => {
                setCategory("maconnerie");
              }}
            >
              <UilWheel
                size="50"
                color={categorie == "maconnerie" ? "white" : "black"}
              />
              <Text
                className={
                  categorie == "maconnerie"
                    ? "text-white text-center text-bold"
                    : "text-black text-center text-bold"
                }
              >
                Maconnerie
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View className="flex-col px-1 w-full mb-4">
          <Text className="text-semibold text-[15px] mb-5">
            {"  "}Travailleurs de la categorie
          </Text>
          <View className="w-full gap-2 items-center justify-center">
            {data.map((item) => {
              return <OuvrierProfil {...item} key={item.id} />;
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OuvrierHome;
