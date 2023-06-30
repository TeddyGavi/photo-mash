import React, { useContext } from "react";
import { useTheme, Appbar, TouchableRipple, Switch } from "react-native-paper";
import { ThemeContext } from "../context/themeContext";
import useUserTheme from "../hooks/useUserTheme";

export const Header = ({ scene }) => {
  const theme = useTheme();
  const { toggle } = useContext(ThemeContext);
  const { isThemeDark } = useUserTheme();

  return (
    <Appbar.Header
      theme={{
        colors: {
          primary: theme?.colors.surface,
        },
      }}
    >
      <Appbar.Content title={scene.route?.name} />
      <Switch color={"red"} value={isThemeDark} onValueChange={toggle} />
    </Appbar.Header>
  );
};
