import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AntDesign from "react-native-vector-icons/AntDesign";

import FormInput from "../../Components/FormInput/FormInput";
import Header from "../../Components/Header/Header";

import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";
import { Icons } from "../../environment/theme/Icons";

import styles from "./AddProduct.style";

const AddProduct = ({ navigation }) => {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  const completed = false;

  return (
    <>
      {!completed ? (
        <>
          <View style={{ paddingTop: Sizes.normalize(125) }}>
            <Header
              title="Add Product"
              headerLeft={
                <TouchableOpacity onPress={navigation.goBack}>
                  <AntDesign name="left" size={26} />
                </TouchableOpacity>
              }
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Add your product</Text>
            <View style={styles.inputContainer}>
              <FormInput
                labelValue={product}
                onChangeText={(text) => setProduct(text)}
                placeHolderText="Product"
                customIcon={<Icons.Product />}
                maxLength={25}
                keyboardType="numeric"
                autoCorrect={false}
              />
              <FormInput
                labelValue={price}
                onChangeText={(text) => setPrice(text)}
                placeHolderText="Price"
                customIcon={<Icons.PriceTag fill={Colors.grey} />}
                maxLength={25}
                keyboardType="numeric"
                autoCorrect={false}
              />
              <FormInput
                labelValue={amount}
                onChangeText={(text) => setAmount(text)}
                placeHolderText="Amount (Optional)"
                customIcon={<Icons.Quantity fill={Colors.grey} />}
                maxLength={20}
                keyboardType="numeric"
                autoCorrect={false}
              />
              <DropDownPicker
                placeholder="Select a category"
                items={[
                  { label: "Item 1", value: "item1" },
                  { label: "Item 2", value: "item2", selected: true },
                ]}
                defaultIndex={1}
                containerStyle={{ height: 40 }}
                onChangeItem={(item) => console.log(item.label, item.value)}
              />
            </View>
          </View>
        </>
      ) : (
        <View style={styles.completed}>
          <LottieView
            source={require("../../assets/product-added-completion-light.json")}
            autoPlay
            loop={false}
            resizeMode="cover"
            onAnimationFinish={navigation.goBack}
            style={styles.animation}
          />
        </View>
      )}
    </>
  );
};

export default AddProduct;
