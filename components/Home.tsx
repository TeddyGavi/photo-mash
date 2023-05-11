import { Button, StyleSheet, Text, SafeAreaView } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import React from "react";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Button
        title="Camera"
        onPress={() => navigation.navigate("Camera")}
      ></Button>
      <Button
        title="Gallery"
        onPress={() => navigation.navigate("Gallery")}
      ></Button>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
