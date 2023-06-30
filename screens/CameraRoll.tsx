import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { SafeAreaView } from "react-native-safe-area-context";
const CameraRoll = ({}) => {
  const cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] =
    useState<boolean>(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState<boolean>(false);

  useEffect(() => {
    async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermissions =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(
        mediaLibraryPermissions.status === "granted"
      );
    };
  }, []);

  if (!hasCameraPermission) {
    return (
      <SafeAreaView>
        <View>
          <Text>Cannot take a photo!</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Camera style={styles.container}>
        <View>
          <Button icon="camera" mode="contained">
            Photo
          </Button>
        </View>
      </Camera>
    </SafeAreaView>
  );
};

export default CameraRoll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
