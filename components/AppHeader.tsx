import React, { useContext } from "react";
import { useTheme, Appbar, TouchableRipple, Switch } from "react-native-paper";
import { ThemeContext } from "../context/themeContext";
import useUserTheme from "../hooks/useUserTheme";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

export const AppHeader = (props: NativeStackHeaderProps) => {
  const theme = useTheme();
  const { toggle, isThemeDark } = useContext(ThemeContext);

  return (
    <Appbar.Header
      theme={{
        colors: {
          primary: theme.colors.secondary,
        },
      }}
    >
      <Appbar.Content title={props.route?.name} />
      <Switch color={"red"} value={isThemeDark} onValueChange={toggle} />
    </Appbar.Header>
  );
};
