import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AddProduct from "../screens/AddProduct/AddProduct";
import OnboardingScreen from "../screens/OnboardingScreen/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import SplashScreen from "../screens/SplashScreen/SplashScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen/ForgotPasswordScreen";
import EmailSentScreen from "../screens/EmailSentScreen/EmailSentScreen";
import NavigationDrawer from "../Components/NavigationDrawer/NavigationDrawer";

import { Icons } from "../environment/theme/Icons";
import { Colors } from "../environment/theme/Colors";

import { AuthContext } from "./AuthProvider";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "white" },
  headerTitleStyle: { color: "black" },
  headerTintColor: "black",
  headerTitleAlign: "center",
  headerForceInset: { top: "never", bottom: "never" },
};

const HomeScreenDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <NavigationDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: Colors.silver,
        drawerInactiveBackgroundColor: Colors.gallery,
        drawerActiveTintColor: Colors.ebonyClay,
        drawerInactiveTintColor: Colors.black,
        drawerType: "front",
      }}
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={HomeScreen}
        options={{ drawerIcon: Icons.Home, title: "Details" }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ drawerIcon: Icons.Profile }}
      />
    </Drawer.Navigator>
  );
};

export default function Routes() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
      <Stack.Screen name="EmailSent" component={EmailSentScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {user && (
        <Stack.Screen
          name="Home"
          component={HomeScreenDrawer}
          options={{
            headerShown: false,
          }}
        />
      )}
      <Stack.Screen
        name="Add Product"
        component={AddProduct}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
