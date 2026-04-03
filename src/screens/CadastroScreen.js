import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormFields from "../components/FormFields";
import FrameComponent12 from "../components/FrameComponent12";
import { createUsuario } from "../services/database";

const Cadastro = () => {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [dataDeNascimento, setDataDeNascimento] = useState(null);

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      await createUsuario(
        nome,
        email,
        null,
        senha,
        dataDeNascimento ? dataDeNascimento.toISOString().split("T")[0] : null,
      );
      Alert.alert("Sucesso", "Conta criada com sucesso!", [
        { text: "OK", onPress: () => router.push("/") },
      ]);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível criar a conta. O e-mail já pode estar em uso.",
      );
    }
  };

  return (
    <ImageBackground
      style={styles.cadastroIcon}
      source={require("../../assets/images/Cadastro.png")}
    >
      <KeyboardAwareScrollView
        style={styles.keyboardawarescrollview}
        contentContainerStyle={styles.cadastroScrollViewContent}
      >
        <View style={styles.presentationWrapper}>
          <View style={styles.presentation}>
            <Image
              style={styles.avatarIcon}
              contentFit="cover"
              source={require("../../assets/images/Avatar.png")}
            />
            <View style={styles.information}>
              <Text style={[styles.cadastro, styles.cadastroTypo]}>
                {" "}
                CADASTRO
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.form, styles.formSpaceBlock]}>
          <FormFields
            nome={nome}
            setNome={setNome}
            email={email}
            setEmail={setEmail}
            senha={senha}
            setSenha={setSenha}
            confirmarSenha={confirmarSenha}
            setConfirmarSenha={setConfirmarSenha}
            dataDeNascimento={dataDeNascimento}
            setDataDeNascimento={setDataDeNascimento}
          />
        </View>
        <View style={[styles.callToAction, styles.formSpaceBlock]}>
          <Pressable
            style={[styles.rectangleParent, styles.frameChildLayout]}
            onPress={handleCadastro}
          >
            <View style={[styles.frameChild, styles.frameChildLayout]} />
            <Text style={[styles.criarConta, styles.cadastroTypo]}>
              CRIAR CONTA
            </Text>
          </Pressable>
        </View>
        <FrameComponent12 />
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  cadastroScrollViewContent: {
    flexDirection: "column",
    paddingLeft: 38,
    paddingTop: 16,
    paddingRight: 33,
    paddingBottom: 62,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 29,
    height: 874,
    flex: 1,
  },
  cadastroTypo: {
    textAlign: "left",
    fontFamily: "Acme",
  },
  formSpaceBlock: {
    paddingLeft: 6,
    width: 320,
    flexDirection: "row",
    zIndex: null,
  },
  frameChildLayout: {
    backgroundColor: "#af4706",
    borderRadius: 49,
    width: 314,
    height: 50,
  },
  cadastroIcon: {
    height: "100%",
    width: "100%",
  },
  keyboardawarescrollview: {
    flex: 1,
    maxWidth: "100%",
    width: "100%",
  },
  presentationWrapper: {
    width: 287,
    height: 283,
    paddingLeft: 39,
    paddingBottom: 17,
    flexDirection: "row",
    zIndex: null,
  },
  presentation: {
    height: 266,
    width: 248,
    zIndex: null,
  },
  avatarIcon: {
    height: 221,
    width: 248,
  },
  information: {
    width: 227,
    paddingLeft: 20,
    height: 45,
    flexDirection: "row",
    zIndex: null,
  },
  cadastro: {
    width: 210,
    fontSize: 35,
    color: "#9f9018",
    height: 45,
  },
  form: {
    height: 277,
  },
  callToAction: {
    height: 62,
    paddingBottom: 12,
  },
  rectangleParent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  frameChild: {
    display: "none",
  },
  criarConta: {
    fontSize: 32,
    color: "#fff",
    zIndex: 1,
    textAlign: "center",
  },
});

export default Cadastro;
