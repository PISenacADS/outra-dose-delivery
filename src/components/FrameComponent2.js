import * as React from "react";
import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
import { Image } from "expo-image";

const FrameComponent2 = () => {
  return (
    <View style={[styles.loginInner, styles.loginInnerLayout]}>
      <View style={[styles.frameParent, styles.loginInnerLayout]}>
        <View style={styles.loginFormWrapper}>
          <View style={styles.loginForm}>
            <View style={[styles.rectangleParent, styles.frameChildLayout]}>
              <View style={[styles.frameChild, styles.frameChildLayout]} />
              <Image
                style={styles.frameItem}
                contentFit="cover"
                source={require("../../assets/images/Rectangle-5.png")}
              />
              <View style={styles.eMailOuTelefoneWrapper}>
                <TextInput
                  style={[styles.eMailOuTelefone, styles.entrarTypo]}
                  placeholder="E-mail ou Telefone"
                  placeholderTextColor="rgba(0, 0, 0, 0.63)"
                />
              </View>
            </View>
            <View style={[styles.rectangleGroup, styles.frameInnerLayout]}>
              <View style={[styles.frameInner, styles.frameInnerLayout]} />
              <Image
                style={styles.rectangleIcon}
                contentFit="cover"
                source={require("../../assets/images/Rectangle-4.png")}
              />
              <View style={styles.senhaWrapper}>
                <TextInput
                  style={[styles.eMailOuTelefone, styles.entrarTypo]}
                  placeholder="Senha"
                  placeholderTextColor="rgba(0, 0, 0, 0.63)"
                />
              </View>
            </View>
            <Pressable
              style={[styles.rectangleContainer, styles.rectangleLayout]}
            >
              <View style={[styles.rectangleView, styles.rectangleLayout]} />
              <Text style={[styles.entrar, styles.entrarTypo]}>ENTRAR</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.frameGroup}>
          <View style={[styles.esqueceuASenhaWrapper, styles.wrapperLayout]}>
            <Text style={[styles.esqueceuASenha, styles.noTenhoUmaTypo]}>
              Esqueceu a senha?
            </Text>
          </View>
          <View style={[styles.frameContainer, styles.wrapperLayout]}>
            <View style={[styles.noTenhoUmaContaWrapper, styles.wrapperLayout]}>
              <Text style={[styles.noTenhoUma, styles.noTenhoUmaTypo]}>
                Não tenho uma conta?
              </Text>
            </View>
            <Text style={styles.cadastraSe}>Cadastra-se</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginInnerLayout: {
    height: 352,
    zIndex: null,
  },
  frameChildLayout: {
    backgroundColor: "#fff",
    borderRadius: 56,
    height: 64,
    width: 319,
  },
  entrarTypo: {
    zIndex: 1,
    textAlign: "left",
    fontFamily: "Acme",
  },
  frameInnerLayout: {
    height: 63,
    backgroundColor: "#fff",
    borderRadius: 56,
    width: 319,
  },
  rectangleLayout: {
    backgroundColor: "#af4706",
    height: 65,
    borderRadius: 56,
    width: 319,
  },
  wrapperLayout: {
    height: 30,
    zIndex: null,
  },
  noTenhoUmaTypo: {
    color: "#9f9018",
    fontSize: 24,
    height: 30,
    textAlign: "left",
    fontFamily: "Acme",
  },
  loginInner: {
    width: 371,
    paddingLeft: 30,
    flexDirection: "row",
  },
  frameParent: {
    gap: 44,
    width: 341,
  },
  loginFormWrapper: {
    width: 330,
    paddingLeft: 11,
    height: 233,
    flexDirection: "row",
    zIndex: null,
  },
  loginForm: {
    gap: 20,
    width: 319,
    height: 233,
    zIndex: null,
  },
  rectangleParent: {
    paddingLeft: 29,
    paddingTop: 11,
    paddingRight: 25,
    paddingBottom: 5,
    gap: 15,
    flexDirection: "row",
  },
  frameChild: {
    display: "none",
  },
  frameItem: {
    height: 47,
    width: 17,
    zIndex: 2,
  },
  eMailOuTelefone: {
    width: 236,
    height: 35, 
    fontSize: 27,
    padding: 0, 
  },
  rectangleGroup: {
    paddingHorizontal: 21,
    paddingVertical: 12,
    gap: 7,
    flexDirection: "row",
  },
  frameInner: {
    display: "none",
  },
  rectangleIcon: {
    height: 39,
    width: 33,
    zIndex: 2,
  },
  senhaWrapper: {
    height: 34,
    paddingTop: 6,
    width: 233,
  },
  rectangleContainer: {
    paddingHorizontal: 85,
    paddingBottom: 16,
    paddingTop: 6,
    flexDirection: "row",
  },
  rectangleView: {
    display: "none",
  },
  entrar: {
    height: 42,
    width: 152,
    fontSize: 40,
    lineHeight: 42,
    color: "#fff",
  },
  frameGroup: {
    height: 75,
    gap: 15,
    width: 341,
    zIndex: null,
  },
  esqueceuASenhaWrapper: {
    width: 262,
    paddingLeft: 80,
    flexDirection: "row",
  },
  esqueceuASenha: {
    width: 185,
  },
  frameContainer: {
    width: 341,
    flexDirection: "row",
  },
  noTenhoUmaContaWrapper: {
    width: 215,
    paddingRight: 0,
  },
  noTenhoUma: {
    marginRight: -3,
    width: 230,
  },
  cadastraSe: {
    width: 126,
    color: "#ffaf7d",
    fontSize: 24,
    height: 30,
    textAlign: "left",
    fontFamily: "Acme",
  },
});

export default FrameComponent2;
