import * as React from "react";
import { ScrollView, Image, StyleSheet, View, Text } from "react-native";
import AcompanhamentoComponent1 from "../components/AcompanhamentoComponent1";
import FrameComponent2 from "../components/TabBarComponent2";

const AcompanhamentoPedidoScreen = () => {
  return (
    <View style={styles.containerPrincipal}>
      {/* Imagem de Fundo cobrindo 100% da tela */}
      <Image
        style={styles.acompanhemntoDoPedidoChild}
        resizeMode="cover"
        source={require("../../assets/images/Rectangle-14.png")}
      />
      
      <ScrollView
        style={styles.acompanhemntoDoPedido}
        contentContainerStyle={styles.acompanhemntoDoPedidoContent}
      >
        <View style={styles.acompanhemntoDoPedidoInner}>
          <View style={styles.frameParent}>
            <View style={styles.adobeExpressFile1Wrapper}>
              <Image
                style={styles.adobeExpressFile1}
                resizeMode="contain"
                source={require("../../assets/images/Adobe-Express-file-1.png")}
              />
            </View>
            <View style={styles.frameGroup}>
              <View style={styles.statusWrapper}>
                <Text style={styles.status}>STATUS</Text>
              </View>
              <Image
                style={styles.capturaDeTelaMapa1}
                resizeMode="cover"
                source={require("../../assets/images/Captura-de-tela-mapa-1.png")}
              />
            </View>
          </View>
        </View>

        {/* Linhas laranjas da lateral esquerda */}
        <View style={[styles.orderDetails, styles.orderPosition]} />
        <View style={[styles.orderDetails2, styles.orderPosition]} />
        <View style={[styles.orderDetails3, styles.orderPosition]} />

        <AcompanhamentoComponent1 />
      </ScrollView>

      {/* TabBar fixada no fundo da tela */}
      <FrameComponent2 />
    </View>
  );
};

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: "#fff",
  },
  acompanhemntoDoPedidoChild: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0, // Fica atrás de tudo
  },
  acompanhemntoDoPedido: {
    flex: 1,
    width: "100%",
  },
  acompanhemntoDoPedidoContent: {
    paddingTop: 40,
    paddingHorizontal: 20, // Dá um respiro nas laterais
    paddingBottom: 120, // Espaço para não bater na TabBar
    alignItems: "center", // Centraliza tudo no ScrollView
  },
  acompanhemntoDoPedidoInner: {
    width: "100%",
    alignItems: "center",
  },
  frameParent: {
    width: "100%",
    alignItems: "center",
    gap: 15,
  },
  adobeExpressFile1Wrapper: {
    width: "100%",
    alignItems: "center",
    height: 180,
  },
  adobeExpressFile1: {
    width: 200, // Tamanho fixo apenas para a moto
    height: "100%",
  },
  frameGroup: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  statusWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  status: {
    fontSize: 35,
    fontFamily: "Acme",
    color: "#a9981b",
    textAlign: "center", // Centraliza o texto
  },
  capturaDeTelaMapa1: {
    width: "100%", 
    height: 250,
    borderRadius: 20,
  },
  orderPosition: {
    borderRightWidth: 3,
    borderColor: "#c7511f",
    borderStyle: "solid",
    left: 28,
    height: 27,
    width: 3,
    zIndex: 2,
    position: "absolute",
  },
  orderDetails: {
    bottom: 273,
  },
  orderDetails2: {
    bottom: 223,
  },
  orderDetails3: {
    bottom: 179,
  },
});

export default AcompanhamentoPedidoScreen;