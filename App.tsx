import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Gallery from "./screens/Gallery";
import CameraRoll from "./screens/CameraRoll";
import { PaperProvider } from "react-native-paper";
import { ThemeContext } from "./context/themeContext";
import useUserTheme from "./hooks/useUserTheme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tabs = createMaterialBottomTabNavigator();

export default function App() {
  const { userPreference, currentTheme } = useUserTheme();

  return (
    <ThemeContext.Provider value={userPreference}>
      <PaperProvider theme={currentTheme}>
        <NavigationContainer theme={currentTheme}>
          <Tabs.Navigator
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
            {/* <Tabs.Screen
            name="Home"
            component={Home}
            options={{ title: "Welcome" }}
          /> */}
            <Tabs.Screen name="Home" component={Gallery} />
            <Tabs.Screen name="Camera" component={CameraRoll} />
          </Tabs.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}
