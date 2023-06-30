import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraCapturedPicture } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";

const CameraRoll = ({}) => {
  const cameraRef = useRef<Camera>(null);
  const [hasCameraPermission, setHasCameraPermission] =
    useState<boolean>(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState<boolean>(false);
  const [photo, setPhoto] = useState<CameraCapturedPicture>();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermissions =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(
        mediaLibraryPermissions.status === "granted"
      );
    })();
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

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current?.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <Button onPress={sharePic}>Share</Button>
        {hasMediaLibraryPermission ? (
          <Button onPress={savePhoto}>Save</Button>
        ) : undefined}
        <Button onPress={() => setPhoto(undefined)}>Discard</Button>
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Button onPress={takePic}>Take pic</Button>
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
};

export default CameraRoll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
