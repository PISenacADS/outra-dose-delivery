import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Finalizacao = () => {
  const [metodoSelecionado, setMetodoSelecionado] = useState("pix");

  return (
    <ImageBackground
      source={require("../../assets/images/cadastro-bg.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/avatar-bg.png")}
              style={styles.logoImagem}
              resizeMode="contain"
            />
          </View>

          {/* Título */}
          <Text style={styles.titulo}>PAGAMENTOS</Text>

          {/* PIX */}
          <TouchableOpacity
            style={[
              styles.cardOpcao,
              metodoSelecionado === "pix" && styles.cardSelecionado,
            ]}
            onPress={() => setMetodoSelecionado("pix")}
          >
            <View style={styles.linhaOpcao}>
              <View style={styles.esquerdaOpcao}>
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={28}
                  color="#9f9018"
                />
                <View>
                  <Text style={styles.tituloOpcao}>Pix</Text>
                  <Text style={styles.subtituloOpcao}>QR e código code</Text>
                </View>
              </View>

              <MaterialCommunityIcons name="qrcode" size={30} color="#9f9018" />
            </View>
          </TouchableOpacity>

          {/* CARTÃO */}
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.cardCartao,
              metodoSelecionado === "cartao" && styles.cardSelecionado,
            ]}
            onPress={() => setMetodoSelecionado("cartao")}
          >
            <View style={styles.topoCartao}>
              <FontAwesome5 name="credit-card" size={22} color="#9f9018" />
              <Text style={styles.tituloOpcao}>Cartão de Crédito</Text>
            </View>

            <TextInput
              placeholder="Número de Card"
              placeholderTextColor="#777"
              style={styles.input}
            />

            <View style={styles.row}>
              <TextInput
                placeholder="CVV"
                placeholderTextColor="#777"
                style={[styles.input, styles.inputMenor]}
              />
              <TextInput
                placeholder=""
                placeholderTextColor="#777"
                style={[styles.input, styles.inputMenor]}
              />
            </View>

            <TouchableOpacity style={styles.botaoSalvarCartao}>
              <Text style={styles.textoSalvarCartao}>
                + dados do cartão para proxima compra
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* DINHEIRO */}
          <TouchableOpacity
            style={[
              styles.cardOpcao,
              metodoSelecionado === "dinheiro" && styles.cardSelecionado,
            ]}
            onPress={() => setMetodoSelecionado("dinheiro")}
          >
            <View style={styles.esquerdaOpcao}>
              <FontAwesome5 name="money-bill-wave" size={22} color="#9f9018" />
              <Text style={styles.tituloOpcao}>Dinheiro</Text>
            </View>
          </TouchableOpacity>

          {/* BOTÃO */}
          <TouchableOpacity style={styles.botaoPagar}>
            <Text style={styles.textoBotaoPagar}>Pagar Agora</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* MENU INFERIOR */}
        <View style={styles.menuInferior}>
          <TouchableOpacity style={styles.itemMenu}>
            <Ionicons name="home-outline" size={24} color="#f28a2e" />
            <Text style={styles.textoMenu}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemMenu}>
            <Ionicons name="menu" size={24} color="#f28a2e" />
            <Text style={styles.textoMenu}>Categorias</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemMenu}>
            <Ionicons name="cart-outline" size={24} color="#f28a2e" />
            <Text style={styles.textoMenu}>Carrinho</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemMenu}>
            <Ionicons name="person-outline" size={24} color="#f28a2e" />
            <Text style={styles.textoMenu}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.10)",
  },

  scroll: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 30,
  },

  // LOGO
  logoContainer: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 14,
  },

  logoImagem: {
    width: 230,
    height: 230,
  },

  // TÍTULO
  titulo: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "900",
    color: "#9f9018",
    marginBottom: 22,
  },

  // CARDS
  cardOpcao: {
    backgroundColor: "#f2f2f2",
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 18,
  },

  cardSelecionado: {
    borderWidth: 2,
    borderColor: "#d36c10",
  },

  linhaOpcao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  esquerdaOpcao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  tituloOpcao: {
    fontSize: 21,
    fontWeight: "700",
    color: "#333",
  },

  subtituloOpcao: {
    fontSize: 14,
    color: "#666",
  },

  // CARTÃO
  cardCartao: {
    backgroundColor: "#f2f2f2",
    borderRadius: 30,
    padding: 18,
    marginBottom: 18,
  },

  topoCartao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#9f9018",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 10,
    fontSize: 15,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  inputMenor: {
    flex: 1,
  },

  botaoSalvarCartao: {
    marginTop: 18,
    backgroundColor: "#c7640a",
    borderRadius: 18,
    paddingVertical: 11,
    alignItems: "center",
  },

  textoSalvarCartao: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  // PAGAR
  botaoPagar: {
    marginTop: 18,
    backgroundColor: "#c7640a",
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
  },

  textoBotaoPagar: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },

  // MENU INFERIOR
  menuInferior: {
    height: 80,
    backgroundColor: "#2f2f2f",
    borderTopWidth: 1,
    borderTopColor: "#555",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 8,
  },

  itemMenu: {
    alignItems: "center",
  },

  textoMenu: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
});

export default Finalizacao;
