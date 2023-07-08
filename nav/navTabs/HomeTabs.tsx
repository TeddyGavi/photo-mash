import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Gallery from "../../screens/Gallery";
import CameraRoll from "../../screens/CameraRoll";
import CameraStack from "../stack/CameraStack";

import React from "react";
import { View } from "react-native";

export function HomeTabs() {
  const HomeTabs = createMaterialBottomTabNavigator();
  return (
    <HomeTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Camera") {
            iconName = "camera";
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons
              name={`${iconName}`}
              size={26}
              color={color}
            />
          );
        },
      })}
    >
      <HomeTabs.Screen name="Home" component={Gallery} />
      <HomeTabs.Screen name="Camera" component={CameraRoll} />
    </HomeTabs.Navigator>
  );
}
