import * as React from "react";
import { ScrollView, StyleSheet, ImageBackground } from "react-native";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FrameComponent from "../components/FrameComponent";

const Login = () => {
  return (
    <ImageBackground
      style={styles.loginIcon}
      source={require("../../assets/images/Login.png")}
    >
      <KeyboardAwareScrollView
        style={styles.keyboardawarescrollview}
        contentContainerStyle={styles.loginScrollViewContent}
      >
        <Image
          style={styles.loginChild}
          contentFit="cover"
          source={require("../../assets/images/Ellipse-1.png")}
        />
        <FrameComponent />
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loginScrollViewContent: {
    flexDirection: "column",
    paddingTop: 67,
    paddingBottom: 70,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 15,
    height: 874,
    flex: 1,
  },
  loginIcon: {
    width: 402,
    height: "100%",
  },
  keyboardawarescrollview: {
    width: "100%",
    flex: 1,
    maxWidth: 402,
  },
  loginChild: {
    marginLeft: -3,
    width: 408,
    height: 370,
  },
});

export default Login;
