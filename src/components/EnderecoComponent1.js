import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";

const octagonIcon = require("../../assets/images/Octagon.svg");
const radioButtonIcon = require("../../assets/images/RadioButton.svg");

const FrameComponent1 = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Opções de Entrega</Text>

        {/* OPÇÃO PADRÃO */}
        <View style={styles.optionRow}>
          <View style={styles.iconContainer}>
            <Image
              source={octagonIcon}
              style={styles.iconBase}
              contentFit="contain"
            />
            <Image
              source={radioButtonIcon}
              style={styles.iconOverlay}
              contentFit="contain"
            />
          </View>
          <Text style={styles.optionText}>
            Padrão(30-45 min) - R$ 5,00
          </Text>
        </View>

        {/* OPÇÃO AGENDADA */}
        <View style={styles.optionRow}>
          <View style={styles.iconContainer}>
            <Image
              source={octagonIcon}
              style={styles.iconBase}
              contentFit="contain"
            />
          </View>
          <Text style={styles.optionText}>Agendada</Text>
        </View>
      </View>

      {/* BOTÃO CONTINUAR */}
      <Pressable style={styles.mainButton}>
        <Text style={styles.mainButtonText}>
          Continuar para pagamento
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingHorizontal: 25,
    marginTop: 20,
    gap: 25,
  },
  contentWrapper: {
    gap: 15,
  },
  title: {
    color: "#9f9018",
    fontFamily: "Acme",
    fontSize: 22,
    marginBottom: 5,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBase: {
    width: 30,
    height: 30,
    position: 'absolute',
  },
  iconOverlay: {
    width: 18,
    height: 18,
    position: 'absolute',
    zIndex: 2,
  },
  optionText: {
    color: "#fff",
    fontFamily: "Inter",
    fontSize: 18,
    flexShrink: 1, // Evita que o texto empurre tudo se for longo
  },
  mainButton: {
    backgroundColor: "#af4706",
    borderRadius: 56,
    height: 50, // Aumentei um pouco para caber melhor o texto de 25px
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  mainButtonText: {
    color: "#fff",
    fontFamily: "Acme",
    fontSize: 20, // Reduzi de 25 para 20 para garantir que não corte em telas menores
    textAlign: "center",
  },
});

export default FrameComponent1;