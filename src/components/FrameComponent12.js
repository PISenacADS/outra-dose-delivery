import * as React from "react";
import { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Checkbox } from "react-native-paper";

const FrameComponent12 = () => {
  const [agreementContainerchecked, setAgreementContainerchecked] =
    useState(false);

  return (
    <View style={styles.authContainerParent}>
      <View style={[styles.authContainer, styles.authLayout]}>
        <View style={[styles.authPrompt, styles.authLayout]}>
          <View style={[styles.authLinks, styles.authLayout]}>
            <Text style={[styles.jTemUma, styles.entreTypo]}>
              Já tem uma conta?
            </Text>
          </View>
          <Text style={[styles.entre, styles.entreTypo]}>Entre</Text>
        </View>
      </View>
      <View style={[styles.agreementContainerParent, styles.agreementLayout]}>
        <View style={styles.agreementContainer}>
          <Checkbox
            status={agreementContainerchecked ? "checked" : "unchecked"}
            onPress={() =>
              setAgreementContainerchecked(!agreementContainerchecked)
            }
            color="#000"
          />
        </View>
        <View style={[styles.agreementLabel, styles.agreementLayout]}>
          <Text style={[styles.liEConcordo, styles.liEConcordoTypo]}>
            Li e concordo com os
          </Text>
        </View>
        <Text style={[styles.termosDeUso, styles.liEConcordoTypo]}>
          Termos de Uso
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authLayout: {
    height: 30,
    zIndex: null,
  },
  entreTypo: {
    textAlign: "left",
    fontFamily: "Acme",
    fontSize: 24,
    height: 30,
  },
  agreementLayout: {
    height: 28,
    zIndex: null,
  },
  liEConcordoTypo: {
    fontSize: 20,
    height: 28,
    textAlign: "left",
    fontFamily: "Acme",
  },
  authContainerParent: {
    height: 87,
    gap: 29,
    zIndex: null,
    width: "100%", 
  },
  authContainer: {
    width: "100%", 
    paddingLeft: 39,
    flexDirection: "row",
  },
  authPrompt: {
    width: "100%", 
    flexDirection: "row",
    gap: 10, 
  },
  authLinks: {
    paddingRight: 0,
  },
  jTemUma: {
    color: "#9f9018",
    
  },
  entre: {
    color: "#ffaf7d",
   
  },
  agreementContainerParent: {
    flexDirection: "row",
    width: "100%", 
    height: 28,
    alignItems: "center", 
    gap: 5, 
  },
  agreementContainer: {
    width: 24,
    height: 24, 
    justifyContent: "center",
    alignItems: "center",
  },
  agreementLabel: {
    paddingRight: 0,
  },
  liEConcordo: {
    color: "#fff",
    
  },
  termosDeUso: {
    color: "#ffaf7d",
    
  },
});
export default FrameComponent12;
