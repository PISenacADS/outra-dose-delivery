/*


==================
API MERCADO PAGO
==================

Mudar

import * as React from "react";
import { ScrollView, Image, StyleSheet, View } from "react-native";
import FrameComponent5 from "../components/FrameComponent5";
import FrameComponent3 from "../components/FrameComponent3";
import FrameComponent4 from "../components/FrameComponent4";

const Finalizao = () => {
  return (
    <ScrollView
      style={styles.pagamentofinalizao}
      contentContainerStyle={styles.finalizaoScrollViewContent}
    >
      <Image
        style={styles.backgroundIcon}
        resizeMode="cover"
        source={require("../assets/Background.png")}
      />
      <View style={styles.paymentArea}>
        <Image
          style={styles.circleIcon}
          resizeMode="cover"
          source={require("../assets/Ellipse-1.png")}
        />
      </View>
      <FrameComponent5 />
      <View style={styles.buttonContainer}>
        <FrameComponent3 />
        <FrameComponent4 />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  finalizaoScrollViewContent: {
    flexDirection: "column",
    paddingTop: 16,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 874,
    flex: 1,
  },
  pagamentofinalizao: {
    width: "100%",
    backgroundColor: "#fff",
    flex: 1,
    maxWidth: "100%",
  },
  backgroundIcon: {
    width: 415,
    height: 874,
    position: "absolute",
    bottom: -874,
    left: -7,
  },
  paymentArea: {
    zIndex: 1,
    width: 325,
    flexDirection: "row",
    paddingLeft: 77,
    height: 221,
  },
  circleIcon: {
    width: 248,
    zIndex: 1,
    height: 221,
  },
  buttonContainer: {
    width: 402,
    height: 322,
    zIndex: null,
    alignItems: "flex-end",
    gap: 54,
  },
});

export default Finalizao;
*/