import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AntDesign from "react-native-vector-icons/AntDesign";

import FormInput from "../../Components/FormInput/FormInput";
import Header from "../../Components/Header/Header";
import { HideKeyboard } from "../../Components/HideKeyboard/HideKeyboard";

import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";
import { Icons } from "../../environment/theme/Icons";

import { CATEGORIES } from "../../data/consts";

import styles from "./AddProduct.style";

const AddProduct = ({ navigation }) => {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(CATEGORIES);

  const completed = false;

  return (
    <>
      {!completed ? (
        <>
          <View style={{ paddingTop: Sizes.normalize(125) }}>
            <Header
              title="Add your Product"
              headerLeft={
                <TouchableOpacity onPress={navigation.goBack}>
                  <AntDesign name="left" size={26} />
                </TouchableOpacity>
              }
              headerRight={<View style={{ width: Sizes.normalize(100) }} />}
            />
          </View>
          <HideKeyboard>
            <View style={styles.container}>
              {/* <Text style={styles.title}>Add your product</Text> */}
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
                  maxLength={25}
                  keyboardType="numeric"
                  autoCorrect={false}
                />
                <DropDownPicker
                  placeholder="Select a product"
                  open={open}
                  value={value}
                  style={{
                    paddingVertical: 10,
                    borderColor: Colors.silver,
                    color: Colors.grey,
                  }}
                  labelStyle={{ color: Colors.grey }}
                  textStyle={{ color: Colors.grey }}
                  containerStyle={{
                    minHeight: Sizes.windowHeight,
                    color: Colors.grey,
                    borderColor: Colors.silver,
                  }}
                  dropDownContainerStyle={{
                    borderColor: Colors.silver,
                  }}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                />
              </View>
            </View>
          </HideKeyboard>
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
