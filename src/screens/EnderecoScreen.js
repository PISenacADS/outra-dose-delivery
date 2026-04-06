import * as React from "react";
import { ScrollView, Image, StyleSheet, View, Text, ImageBackground } from "react-native";
import FrameComponent from "../components/EnderecoComponent";
import FrameComponent1 from "../components/EnderecoComponent1";
import FrameComponent2 from "../components/EnderecoComponent2";

const Entrega = () => {
  return (
    <View style={styles.mainContainer}>
      {/* 1. Usamos ImageBackground para cobrir 100% da tela sem falhas */}
      <ImageBackground
        source={require("../../assets/images/Rectangle-14.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo / Ellipse centralizada */}
          <View style={styles.logoWrapper}>
            <Image
              style={styles.logoImage}
              resizeMode="contain"
              source={require("../../assets/images/Ellipse-1.png")}
            />
          </View>

          {/* Título Centralizado */}
          <Text style={styles.titleText}>
            ONDE VAMOS ENTREGAR?
          </Text>

          {/* Componentes de Conteúdo */}
          <View style={styles.contentWrapper}>
            <FrameComponent />
            <FrameComponent1 />
          </View>
          
          {/* Espaço extra para o conteúdo não ficar atrás do menu fixo */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* 2. Menu fixo FORA do ScrollView para colar no fundo */}
        <FrameComponent2 />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#000", // Evita clarão branco
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 40,
    alignItems: "center", 
  },
  logoWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  logoImage: {
    width: 250,
    height: 220,
  },
  titleText: {
    fontSize: 28, 
    fontFamily: "Acme",
    color: "#9f9018",
    textAlign: "center",
    width: "100%",
    marginBottom: 30,
  },
  contentWrapper: {
    width: "100%",
    paddingHorizontal: 10, 
  },
});

export default Entrega;