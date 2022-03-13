import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import AntDesign from "react-native-vector-icons/AntDesign";

import { auth, db, uniqueId } from "../../../firebase";
import { ref, set } from "firebase/database";

import FormInput from "../../Components/FormInput/FormInput";
import FormButton from "../../Components/FormButton/FormButton";
import Header from "../../Components/Header/Header";
import { HideKeyboard } from "../../Components/HideKeyboard/HideKeyboard";
import CompletionProductScreen from "../CompletionProductScreen/CompletionProductScreen";

import { Colors } from "../../environment/theme/Colors";
import { Icons } from "../../environment/theme/Icons";
import { Sizes } from "../../environment/sizes";

import { CATEGORIES } from "../../data/consts";
import { addProduct } from "../../store/actions/ProductActions";

import styles from "./AddProduct.style";

const AddProduct = ({ navigation }) => {
  const dispatch = useDispatch();

  const [productName, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [cartID, setCartId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [dropdownItems, setDropdownItems] = useState(CATEGORIES);
  const [isSubmited, setIsSubmited] = useState(false);

  useEffect(() => {
    CATEGORIES.map((category) => {
      if (category.value === dropdownValue && category.type) {
        setPrice((prevPrice) => "-" + prevPrice);
      }
    });
  }, [dropdownValue]);

  const createUserCart = (id, productName, price, amount, dropdownValue) => {
    const cartId = uniqueId();
    setCartId(cartId);
    set(ref(db, `usersList/${id}/personalCart/${cartId}`), {
      id,
      productName,
      price,
      amount,
      dropdownValue,
      cartId,
      date: getCurrentDate(),
    });
  };

  const getCurrentDate = () => {
    var date = new Date();
    console.log(
      date.getMonth() + 1 + "." + date.getDate() + "." + date.getFullYear()
    );

    return (
      date.getMonth() +
      1 +
      "." +
      date.getDate() +
      "." +
      date.getFullYear()
    ).toString();
  };

  const onSubmit = () => {
    createUserCart(
      auth.currentUser.uid,
      productName,
      price,
      amount,
      dropdownValue
    );

    const thisProduct = {
      cartID,
      productName,
      price,
      amount,
      dropdownValue,
      date: getCurrentDate(),
    };

    dispatch(addProduct(thisProduct));
  };

  return (
    <>
      {!isSubmited ? (
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
          <HideKeyboard hideDropdown={() => setDropdownOpen(false)}>
            <View style={styles.container}>
              {/* <Text style={styles.title}>Add your product</Text> */}
              <View style={styles.inputContainer}>
                <FormInput
                  labelValue={productName}
                  onChangeText={(text) => setProduct(text)}
                  placeHolderText="Product"
                  customIcon={<Icons.Product />}
                  maxLength={25}
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
                  placeHolderText="Amount"
                  customIcon={<Icons.Quantity fill={Colors.grey} />}
                  maxLength={25}
                  keyboardType="numeric"
                  autoCorrect={false}
                />
                <View style={{ minHeight: 120 }}>
                  <DropDownPicker
                    placeholder="Select a category"
                    open={dropdownOpen}
                    value={dropdownValue}
                    listMode="FLATLIST"
                    scrollViewProps={{
                      nestedScrollEnabled: true,
                    }}
                    style={{
                      paddingVertical: 10,
                      borderColor: Colors.silver,
                      color: Colors.grey,
                    }}
                    labelStyle={{ color: Colors.grey }}
                    textStyle={{ color: Colors.grey }}
                    containerStyle={{
                      height: 300,
                      color: Colors.grey,
                      borderColor: Colors.silver,
                    }}
                    dropDownContainerStyle={{
                      borderColor: Colors.silver,
                    }}
                    items={dropdownItems}
                    setOpen={setDropdownOpen}
                    setValue={setDropdownValue}
                    setItems={setDropdownItems}
                  />
                </View>
                {!dropdownOpen && (
                  <View style={styles.button}>
                    <FormButton
                      buttonTitle="Submit"
                      onPress={() => {
                        setIsSubmited(true);
                        getCurrentDate();
                        onSubmit();
                      }}
                    />
                  </View>
                )}
              </View>
              {!dropdownOpen && (
                <View style={styles.cart}>
                  <Icons.Cart fill={Colors.iron} />
                </View>
              )}
            </View>
          </HideKeyboard>
        </>
      ) : (
        <CompletionProductScreen navigation={navigation} />
      )}
    </>
  );
};

export default AddProduct;
