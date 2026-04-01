import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as React from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { getUsuarioByEmail } from "../services/database";

const FrameComponent = () => {
  const router = useRouter();
  
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha o e-mail e a senha.");
      return;
    }

    try {
      const usuario = await getUsuarioByEmail(email);

      if (!usuario) {
        Alert.alert("Erro", "Usuário não encontrado.");
        return;
      }

      if (usuario.senha_hash !== senha) {
        Alert.alert("Erro", "Senha incorreta.");
        return;
      }

      // Login deu certo! Vai para a home.
      router.push("/home");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível fazer o login.");
    }
  };

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
                  value={email}
                  onChangeText={setEmail}
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
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry
                />
              </View>
            </View>
            <Pressable
              style={[styles.rectangleContainer, styles.rectangleLayout]}
              onPress={handleLogin}
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
            <Pressable onPress={() => router.push("/cadastro")}>
              <Text style={styles.cadastraSe}>Cadastra-se</Text>
            </Pressable>
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
    fontFamily: "Acme-Regular",
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
    fontFamily: "Acme-Regular",
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
  eMailOuTelefoneWrapper: {
    height: 35,
    paddingTop: 7,
    width: 233,
  },
  eMailOuTelefone: {
    width: 236,
    height: 44,
    fontSize: 23,
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
    width: 285,
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
    //width: 221,
  },
  cadastraSe: {
    //width: 126,
    color: "#ffaf7d",
    fontSize: 24,
    //height: 30,
    textAlign: "left",
    fontFamily: "Acme-Regular",
  },
});

export default FrameComponent;
