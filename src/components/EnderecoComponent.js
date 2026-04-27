import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

import MapPinIcon from "../../assets/images/MapPin.svg";
import OctagonIcon from "../../assets/images/Octagon.svg";
import RadioButtonIcon from "../../assets/images/RadioButton.svg";

const FrameComponent = () => {
  const CardEndereco = ({ titulo, endereco, preco, iconStyle }) => (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        {/* 2. Usando a tag do SVG ao invés do <Image> */}
        <MapPinIcon style={[styles.mappinIcon, iconStyle]} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.enderecoText}>{endereco}</Text>
        <Text style={styles.precoText}>Preço: {preco}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CardEndereco 
        titulo="Casa" 
        endereco="Rua Galvão, 24, JD. Grajaú, Santo Amaro" 
        preco="R$ 10,00" 
      />
      <CardEndereco 
        titulo="Trabalho" 
        endereco="Rua Mario, 24, JD. Alina, Morumbi" 
        preco="R$ 15,00" 
      />
      <CardEndereco 
        titulo="Localização atual" 
        endereco="Rua Mario, 24, JD. Alina, Morumbi" 
        preco="R$ 8,00" 
      />

      <View style={styles.btnAdicionar}>
        <Text style={styles.btnText}>+ Adicionar novo endereço</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
  flex: 1,
  width: '100%',
},
backgroundImage: {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100%',
  height: '100%',
},
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    flexDirection: "row", // Alinha ícone e texto lado a lado
    padding: 15,
    marginBottom: 12,
    alignItems: "center",
    // Sombra para destacar do fundo de madeira
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconContainer: {
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  mappinIcon: {
    width: 35,
    height: 35,
  },
  textContainer: {
    flex: 1, // Faz o texto ocupar o resto da largura
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 2,
  },
  enderecoText: {
    fontSize: 14,
    color: "#444444", // Cinza escuro para leitura fácil
    lineHeight: 18,
  },
  precoText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333", // Quase preto para destacar
    marginTop: 2,
  },
  btnAdicionar: {
    backgroundColor: "#A64500",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 5,
    width: "90%",
    alignSelf: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  contentContainer: {
  flex: 1,
  paddingHorizontal: 0, // Garante que nada empurre as bordas para dentro
},
});

export default FrameComponent;