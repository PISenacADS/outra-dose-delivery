import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { useRouter } from "expo-router";

import OctagonIcon from "../../assets/images/Octagon.svg";
import RadioButtonIcon from "../../assets/images/RadioButton.svg";

const FrameComponent1 = () => {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Opções de Entrega</Text>

        <View style={styles.optionRow}>
          <View style={styles.iconContainer}>
          
            <OctagonIcon style={styles.iconBase} />
            <RadioButtonIcon style={styles.iconOverlay} />
          </View>
          <Text style={styles.optionText}>
            Padrão(30-45 min) - R$ 5,00
          </Text>
        </View>

        {}
        <View style={styles.optionRow}>
          <View style={styles.iconContainer}>
           
            <OctagonIcon style={styles.iconBase} />
          </View>
          <Text style={styles.optionText}>Agendada</Text>
        </View>
      </View>

      {}
      <Pressable style={styles.mainButton} onPress={() => router.push("/pagamento")}>
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
    flexShrink: 1, 
  },
  mainButton: {
    backgroundColor: "#af4706",
    borderRadius: 56,
    height: 50, 
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
    fontSize: 20, 
    textAlign: "center",
  },
});

export default FrameComponent1;