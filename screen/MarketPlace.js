import { React, useState } from "react";
import CreateProduct from "./MarketPlace/CreateProduct";
import ListOwnProduct from "./MarketPlace/ListOwnProduct";
import MarketPlaceHome from "./MarketPlace/MarketPlaceHome";
import SingleProduct from "./MarketPlace/SingleProduct";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const MarketPlace = ({ route }) => {
  const [OwnLike, setOwnLike] = useState([]);

  return (
    <Stack.Navigator initialRouteName="OffreHome">
      <Stack.Screen name="MarketPlaceHome" options={{ headerShown: false }}>
        {(props) => (
          <MarketPlaceHome
            {...props}
            idUser={route.params.stateUser.userId}
            OwnLike={OwnLike}
            setOwnLike={setOwnLike}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="CreateProduct" options={{ headerShown: false }}>
        {(props) => (
          <CreateProduct {...props} idUser={route.params.stateUser.userId} />
        )}
      </Stack.Screen>

      <Stack.Screen name="ListOwnProduct" options={{ headerShown: false }}>
        {(props) => (
          <ListOwnProduct
            {...props}
            idUser={route.params.stateUser.userId}
            OwnLike={OwnLike}
            setOwnLike={setOwnLike}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="SingleProduct" options={{ headerShown: false }}>
        {(props) => (
          <SingleProduct
            {...props}
            idUser={route.params.stateUser.userId}
            OwnLike={OwnLike}
            setOwnLike={setOwnLike}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default MarketPlace;
