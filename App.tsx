import { NavigationContainer } from "@react-navigation/native";

import Root from "./nav/Root";
import { PaperProvider } from "react-native-paper";
import { ThemeContext } from "./context/themeContext";
import useUserTheme from "./hooks/useUserTheme";

export default function App() {
  const { userPreference, currentTheme } = useUserTheme();

  return (
    <ThemeContext.Provider value={userPreference}>
      <PaperProvider theme={currentTheme}>
        <NavigationContainer theme={currentTheme}>
          <Root />
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}
