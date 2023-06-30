import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppHeader } from "../components/AppHeader";
import { HomeTabs } from "./navTabs/HomeTabs";

export default function Root() {
  const Root = createNativeStackNavigator();

  return (
    <Root.Navigator>
      <Root.Screen
        name="Photo Mash"
        component={HomeTabs}
        options={{
          title: "Home",
          header: (props) => <AppHeader {...props} />,
        }}
      />
    </Root.Navigator>
  );
}
