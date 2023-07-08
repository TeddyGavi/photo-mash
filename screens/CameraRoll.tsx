import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CameraCapturedPicture } from "expo-camera";
import {
  Camera,
  CameraDevice,
  CameraPermissionStatus,
  PhotoFile,
  useCameraDevices,
} from "react-native-vision-camera";
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
  const [photo, setPhoto] = useState<PhotoFile>();
  const isFocused = useIsFocused();
  const [devices, setDevices] = useState<CameraDevice>();
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const thisDevice = useCameraDevices();
  const device = thisDevice.back;

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      const devices = await Camera.getAvailableCameraDevices();
      const mediaLibraryPermissions =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission === "authorized");
      setHasMediaLibraryPermission(
        mediaLibraryPermissions.status === "granted"
      );
      setDevices(thisDevice.back);
    })();
  }, []);

  const onInitialized = useCallback(() => {
    console.log("Camera initialized!");
    setIsCameraInitialized(true);
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
  const takePic = async () => {
    setPhoto(
      await cameraRef.current?.takePhoto({
        qualityPrioritization: "balanced",
      })
    );
  };
  if (photo) {
    let sharePic = () => {
      shareAsync(photo.path).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.path).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.path }}
        />
        <Button onPress={sharePic}>Share</Button>
        {hasMediaLibraryPermission ? (
          <Button onPress={savePhoto}>Save</Button>
        ) : undefined}
        <Button onPress={() => setPhoto(undefined)}>Discard</Button>
      </SafeAreaView>
    );
  }
  if (devices === null) {
    return (
      <View>
        <Text>no device</Text>
      </View>
    );
  } else {
    return (
      // <></>
      <Camera
        style={styles.container}
        device={thisDevice.back}
        preset="medium"
        photo={true}
        ref={cameraRef}
        isActive={isFocused}
        onInitialized={onInitialized}
      >
        <View style={styles.buttonContainer}>
          <Button onPress={takePic}>Take pic</Button>
        </View>
        <StatusBar style="auto" />
      </Camera>
    );
  }
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
