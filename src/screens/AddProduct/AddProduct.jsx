import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useFormik } from "formik";
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
import { addProductValidationSchema } from "../../validations/RegisterValidation";

import { Colors } from "../../environment/theme/Colors";
import { Icons } from "../../environment/theme/Icons";
import { Sizes } from "../../environment/sizes";

import { CATEGORIES } from "../../data/consts";
import { addProduct } from "../../store/actions/ProductActions";

import styles from "./AddProduct.style";

const AddProduct = ({ navigation, route }) => {
  const { pickedDate } = route.params;
  const dispatch = useDispatch();

  const [cartID, setCartId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [dropdownItems, setDropdownItems] = useState(CATEGORIES);
  const [isSubmited, setIsSubmited] = useState(false);

  const formData = {
    productName: "",
    price: "",
    amount: "",
  };

  const {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: formData,
    validationSchema: addProductValidationSchema,
  });

  useEffect(() => {
    CATEGORIES.map((category) => {
      if (category.value === dropdownValue && category.type) {
        setFieldValue("price", "-" + values.price);
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
      date: pickedDate,
    });
  };

  const onSubmit = () => {
    createUserCart(
      auth.currentUser.uid,
      values.productName,
      values.price * values.amount,
      values.amount,
      dropdownValue
    );

    const thisProduct = {
      cartID,
      productName: values.productName,
      price: values.price * values.amount,
      amount: values.amount,
      dropdownValue,
      date: pickedDate,
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
              <View style={styles.inputContainer}>
                <FormInput
                  isProduct
                  labelValue={values.productName}
                  onChangeText={handleChange("productName")}
                  error={errors.productName}
                  touched={touched.productName}
                  onBlur={() => {
                    if (!touched.productName) {
                      setFieldTouched("productName", true);
                    }
                    handleBlur("productName");
                  }}
                  placeHolderText="Product"
                  customIcon={<Icons.Product />}
                  maxLength={25}
                  autoCorrect={false}
                />
                <FormInput
                  isProduct
                  labelValue={values.price}
                  onChangeText={handleChange("price")}
                  error={errors.price}
                  touched={touched.price}
                  onBlur={() => {
                    if (!touched.price) {
                      setFieldTouched("price", true);
                    }
                    handleBlur("price");
                  }}
                  placeHolderText="Price per unit"
                  customIcon={<Icons.PriceTag fill={Colors.grey} />}
                  maxLength={25}
                  keyboardType="numeric"
                  autoCorrect={false}
                />
                <FormInput
                  isProduct
                  labelValue={values.amount}
                  onChangeText={handleChange("amount")}
                  error={errors.amount}
                  touched={touched.amount}
                  onBlur={() => {
                    if (!touched.amount) {
                      setFieldTouched("amount", true);
                    }
                    handleBlur("amount");
                  }}
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
                      disabled={!isValid}
                      buttonTitle="Submit"
                      onPress={() => {
                        setIsSubmited(true);
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
