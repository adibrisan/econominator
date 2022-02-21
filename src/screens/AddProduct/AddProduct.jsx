import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import Header from "../../Components/Header/Header";

import styles from "./AddProduct.style";

const AddProduct = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header
        title="Add Product"
        headerLeft={
          <TouchableOpacity onPress={navigation.goBack}>
            <AntDesign name="left" size={26} />
          </TouchableOpacity>
        }
      />
      <Text>AddProduct</Text>
    </View>
  );
};

export default AddProduct;
