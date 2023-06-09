import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";
import img from "../assets/bs.png"
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";


const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart)
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "We are Loading Your Location..."
  );
  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location Services are not Enabled ",
        "Please enable the location Services ",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    } else {
      setlocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied ",
        "Allow the app to use the Location services  ",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      // console.log(coords)
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // console.log(response)

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setdisplayCurrentAddress(address);
      }
    }
  };

  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;
    const fetchProducts = () => {
      services.map((service, index) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);

  const services = [
    {
      id: "0",
      image: "https://img.freepik.com/premium-vector/laundry-illustration_75802-67.jpg?w=2000",
      name: "Cuci & Setrika /Kg",
      quantity: 0,
      price: 5000,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/512/1216/1216449.png",
      name: "Cuci Aja /Kg",
      quantity: 0,
      price: 3500,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/512/4737/4737778.png",
      name: "Setrika Aja /Kg",
      quantity: 0,
      price: 3500,
    },
   
   

  ];
          <View>
            <Text style = {{ fontWeight : "bold" , fontSize : 18 , marginBottom: 7}}>Daftar Paketan</Text>
          </View>



  return (
    <>
      <ScrollView
        style={{ backgroundColor: "#EFC7F3", flex: 1, marginTop: 15 }}
      >
        <View
          style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
        >
          <Image source={img} style={{ width: 70, height: 70}} /> 
          <View>
            <Text style={styles.title}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>

          <Pressable onPress={() => navigation.navigate("Profile")} style={{ marginLeft: "auto", marginRight: 9 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://asset-a.grid.id/crop/0x0:1186x951/x/photo/2022/06/10/webpnet-resizeimage-2022-06-0-20220610121849.jpg",
              }}
            />
          </Pressable>
        </View>

        {/*  Search bar */}

        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 1.0,
            borderColor: "#C0C0C0",
            borderRadius: 7,
          }}
        >
          <TextInput placeholder="Mencari Item Lain" />
          <Feather name="search" size={24} color="#fd5c63" />
        </View>

        {/* Image  Carousel  */}
        <Carousel />

      


        {/* Render all the products1  */}
          <View>
            <Text style = {{ fontWeight : "bold" , fontSize : 18 , marginBottom: 7}}>Daftar Paketan</Text>
          </View>

        {product.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}

      </ScrollView>
      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            marginBottom: 30,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style ={{fontSize:15 , fontWeight:"800" , color: "white" }}>{cart.length} items | Rp. {total} </Text>
            <Text style={{fontSize:13, fontWeight:"400" , color : "white" ,marginVertical :6  }}>Tambahan item </Text>
          </View>
          <Pressable onPress={() => navigation.navigate("PickUp")
         }>
            <Text style ={{fontSize: 17 , fontWeight:"bold" , color : "white"}}>Proses Pemesanan</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
