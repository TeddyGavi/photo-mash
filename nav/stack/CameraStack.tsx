import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraRoll from "../../screens/CameraRoll";

export default function CameraStack() {
  const Cam = createNativeStackNavigator();

  return (
    <Cam.Navigator>
      <Cam.Screen
        name="CameraRoll"
        component={CameraRoll}
        options={{ headerShown: false }}
      />
    </Cam.Navigator>
  );
}
