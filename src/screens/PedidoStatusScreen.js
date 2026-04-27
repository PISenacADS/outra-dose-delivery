import * as React from "react";
import { ScrollView, Image, StyleSheet, View, Text, ImageBackground } from "react-native";
import FrameComponent6 from "../components/FrameComponent6";
import FrameComponent2 from "../components/FrameComponent2";

const AcompanhemntoDoPedido = () => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={styles.background}
        resizeMode="cover"
        source={require("../../assets/images/Rectangle-14.png")}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Superior */}
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={require("../../assets/images/Adobe-Express-file-1.png")}
            />
          </View>

          {/* Seção de Status e Mapa */}
          <View style={styles.statusSection}>
            <Text style={styles.statusTitle}>STATUS</Text>
            <Image
              style={styles.mapa}
              resizeMode="cover"
              source={require("../../assets/images/Captura-de-tela-mapa-1.png")}
            />
          </View>

          <FrameComponent6 />
          
          <View style={{ height: 100 }} />
        </ScrollView>

        <FrameComponent2 />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  background: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 20,
  },
  logoContainer: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 260,
    height: 210,
  },
  statusSection: {
    width: "90%",
    alignItems: "flex-start",
    marginTop: 10,
  },
  statusTitle: {
    fontSize: 35,
    fontFamily: "Acme",
    color: "#a9981b",
    marginBottom: 10,
  },
  mapa: {
    width: "100%",
    height: 250,
    borderRadius: 20,
  },
});

export default AcompanhemntoDoPedido;