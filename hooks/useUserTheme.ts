import { useCallback, useMemo, useState } from "react";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { NavigationTheme } from "react-native-paper/lib/typescript/src/types";

interface userPreference {
  toggle: () => void;
  isThemeDark: boolean;
}

interface useThemeAPI {
  userPreference: userPreference;
  currentTheme: NavigationTheme;
}
function useUserTheme(): useThemeAPI {
  const [isThemeDark, setIsThemeDark] = useState<boolean>(false);

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...DarkTheme.colors,
    },
  };

  const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
    },
  };

  const currentTheme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggle = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const userPreference = useMemo(
    () => ({
      toggle,
      isThemeDark,
    }),
    [toggle, isThemeDark]
  );

  return { userPreference, currentTheme };
}

export default useUserTheme;
