import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
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
import { processarPagamento } from "../services/api";

const Finalizacao = () => {
  const router = useRouter();
  const [metodoSelecionado, setMetodoSelecionado] = useState("pix");
  const [loading, setLoading] = useState(false);

  // Futuramente vem do contexto/carrinho
  const userId = 1;
  const itensCarrinho = [
    {
      produtoId: 1,
      nome: "Cerveja Heineken 600ml",
      preco: 9.79,
      quantidade: 2,
    },
  ];

  const handlePagar = async () => {
    try {
      setLoading(true);
      const data = await processarPagamento(userId, itensCarrinho, {
        email: "cliente@outra-dose.com",
        nome: "Cliente",
      });

      if (data.success) {
        Alert.alert(
          "Pagamento confirmado!",
          `Pedido: ${data.compraId}\nMétodo: ${metodoSelecionado}\nModo: ${data.modo}`,
          [{ text: "OK", onPress: () => router.push("/acompanhamento") }],
        );
      } else {
        Alert.alert("Erro", "Não foi possível processar o pagamento.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

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
                placeholder="MM/AA"
                placeholderTextColor="#777"
                style={[styles.input, styles.inputMenor]}
              />
            </View>
            <TouchableOpacity style={styles.botaoSalvarCartao}>
              <Text style={styles.textoSalvarCartao}>
                + dados do cartão para próxima compra
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

          {/* BOTÃO PAGAR */}
          <TouchableOpacity
            style={[styles.botaoPagar, loading && { opacity: 0.7 }]}
            onPress={handlePagar}
            disabled={loading}
          >
            <Text style={styles.textoBotaoPagar}>
              {loading ? "Processando..." : "Pagar Agora"}
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.menuInferior}>
          <TouchableOpacity
            style={styles.itemMenu}
            onPress={() => router.push("/home")}
          >
            <Ionicons name="home-outline" size={24} color="#f28a2e" />
            <Text style={styles.textoMenu}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemMenu}
            onPress={() => router.push("/produtos")}
          >
            <Ionicons name="menu" size={24} color="#f28a2e" />
            <Text style={styles.textoMenu}>Categorias</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemMenu}
            onPress={() => router.push("/carrinho")}
          >
            <Ionicons name="cart-outline" size={24} color="#f28a2e" />
            <Text style={styles.textoMenu}>Carrinho</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemMenu}
            onPress={() => router.push("/perfil")}
          >
            <Ionicons name="person-outline" size={24} color="#f28a2e" />
            <Text style={styles.textoMenu}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, backgroundColor: "rgba(0,0,0,0.10)" },
  scroll: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 30 },
  logoContainer: { alignItems: "center", marginTop: 8, marginBottom: 14 },
  logoImagem: { width: 230, height: 230 },
  titulo: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "900",
    color: "#9f9018",
    marginBottom: 22,
  },
  cardOpcao: {
    backgroundColor: "#f2f2f2",
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 18,
  },
  cardSelecionado: { borderWidth: 2, borderColor: "#d36c10" },
  linhaOpcao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  esquerdaOpcao: { flexDirection: "row", alignItems: "center", gap: 12 },
  tituloOpcao: { fontSize: 21, fontWeight: "700", color: "#333" },
  subtituloOpcao: { fontSize: 14, color: "#666" },
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
  row: { flexDirection: "row", gap: 10 },
  inputMenor: { flex: 1 },
  botaoSalvarCartao: {
    marginTop: 18,
    backgroundColor: "#c7640a",
    borderRadius: 18,
    paddingVertical: 11,
    alignItems: "center",
  },
  textoSalvarCartao: { color: "#fff", fontSize: 13, fontWeight: "600" },
  botaoPagar: {
    marginTop: 18,
    backgroundColor: "#c7640a",
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
  },
  textoBotaoPagar: { color: "#fff", fontSize: 26, fontWeight: "bold" },
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
  itemMenu: { alignItems: "center" },
  textoMenu: { color: "#fff", fontSize: 12, marginTop: 4 },
});

export default Finalizacao;
