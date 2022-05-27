import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import AntDesign from "react-native-vector-icons/AntDesign";

import { auth, db, uniqueId } from "../../../firebase";
import { ref, set } from "firebase/database";
import { onAuthStateChanged } from "@firebase/auth";

import FormInput from "../../Components/FormInput/FormInput";
import FormButton from "../../Components/FormButton/FormButton";
import Header from "../../Components/Header/Header";
import { HideKeyboard } from "../../Components/HideKeyboard/HideKeyboard";
import CompletionProductScreen from "../CompletionProductScreen/CompletionProductScreen";
import { addProductValidationSchema } from "../../validations/ProductValidation";

import { Colors } from "../../environment/theme/Colors";
import { Icons } from "../../environment/theme/Icons";
import { Sizes } from "../../environment/sizes";
import { showToast } from "../../navigation/AuthProvider";

import { CATEGORIES } from "../../data/consts";
import { addProduct } from "../../store/actions/ProductActions";

import styles from "./AddProduct.style";

const AddProduct = ({ navigation, route }) => {
  const ocrProducts = route?.params?.ocrProducts;
  const pickedDate = route?.params?.pickedDate;
  const product = route?.params?.product;
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [dropdownItems, setDropdownItems] = useState(CATEGORIES);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isDropdownValid, setIsDopdrownValid] = useState(true);

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
    if (product) {
      setFieldValue("productName", product?.productName);
      setFieldValue(
        "price",
        `${product?.price.toString() / product?.amount.toString()}`
      );
      setFieldValue("amount", product?.amount);
    }
    if (ocrProducts) {
      setFieldValue("productName", ocrProducts?.products?.replace("\n", ""));
      setFieldValue("price", ocrProducts?.totalPrice);
      setFieldValue("amount", "1");
    }
  }, []);

  useEffect(() => {
    if (dropdownValue !== null) {
      setIsDopdrownValid(true);
    }
  }, [dropdownValue]);

  useEffect(() => {
    CATEGORIES.map((category) => {
      if (
        category.value === dropdownValue &&
        category.type &&
        values.price.charAt(0) !== "-"
      ) {
        setFieldValue("price", "-" + values.price);
      }
      if (
        category.value === dropdownValue &&
        category.type === undefined &&
        values.price.charAt(0) === "-"
      ) {
        setFieldValue("price", values.price.replace("-", ""));
      }
    });
  }, [dropdownValue]);

  const createUserCart = (id, productName, price, amount, dropdownValue) => {
    const cartId = !product ? uniqueId() : undefined;

    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        set(
          ref(
            db,
            `usersList/${id}/personalCart/${!product ? cartId : product.id}`
          ),
          {
            id,
            productName,
            price,
            amount,
            dropdownValue,
            cartId: !product ? cartId : product.id,
            date: !product ? pickedDate : product.addedTime,
          }
        );
      }
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
      productName: values.productName,
      price: values.price * values.amount,
      amount: values.amount,
      dropdownValue,
      date: !product ? pickedDate : product.addedTime,
    };
    dispatch(addProduct(thisProduct));
  };

  return (
    <>
      {!isSubmited ? (
        <>
          <View style={{ paddingTop: Sizes.normalize(125) }}>
            <Header
              title={!product?.id ? "Add your Product" : "Edit this product"}
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
                      borderColor: isDropdownValid
                        ? Colors.silver
                        : Colors.outrageousOrange,
                      color: Colors.grey,
                    }}
                    labelStyle={{ color: Colors.grey }}
                    textStyle={{
                      color: isDropdownValid
                        ? Colors.grey
                        : Colors.outrageousOrange,
                    }}
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
                      disabled={product === null ? !isValid : !dropdownValue}
                      buttonTitle="Submit"
                      onPress={() => {
                        if (
                          dropdownValue !== null &&
                          values.productName !== "" &&
                          values.price !== "" &&
                          values.amount !== ""
                        ) {
                          setIsSubmited(true);
                          onSubmit();
                        } else {
                          showToast(
                            "error",
                            "Fields not completed !",
                            "Please , fill all the fields ."
                          );
                        }
                        if (!dropdownValue) {
                          setIsDopdrownValid(false);
                        }
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
