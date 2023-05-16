import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://accurate.id/wp-content/uploads/2022/08/accurate.id-Berbagai-Perlengkapan-Laundry-yang-Harus-Dipersiapkan.jpg",
    "https://lokalsupportlokal.id/wp-content/uploads/2020/11/usaha-laundry-kiloan-untuk-pemula-usaha-laundry-kiloan-di-rumah-usaha-laundry-kiloan-dengan-modal-kecil-usaha-laundry-kiloan-franchise-626x385.jpg",  ];
  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor={"#13274F"}
        inactiveDotColor={"#90A4AE"}
        ImageComponentStyle={{
          borderRadius: 6,
          width: "94%",
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
