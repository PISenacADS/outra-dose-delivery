import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { adicionarAoCarrinho, getProdutos } from "../services/api";

const CATEGORIAS = ["Cervejas", "Vinhos", "Whiskey", "Combos"];

export default function ProdutoScreen() {
  const router = useRouter();
  const userId = 1;
  const [pesquisa, setPesquisa] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Cervejas");
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const data = await getProdutos();
      if (data.success) setProdutos(data.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdicionar = async (produto) => {
    try {
      await adicionarAoCarrinho(userId, {
        produtoId: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: 1,
      });
      alert(`${produto.nome} adicionado ao carrinho!`);
    } catch (error) {
      alert("Erro ao adicionar ao carrinho.");
    }
  };

  const produtosFiltrados = produtos.filter((p) => {
    const matchCategoria = p.categoria === categoriaAtiva;
    const matchPesquisa = p.nome.toLowerCase().includes(pesquisa.toLowerCase());
    return matchCategoria && matchPesquisa;
  });

  const renderProduto = ({ item }) => (
    <View style={styles.cardProduto}>
      <View style={styles.lixeiraContainer}>
        <Ionicons name="trash-outline" size={24} color="#d4a017" />
      </View>
      <View style={styles.produtoInfoContainer}>
        <Image source={{ uri: item.imagem_url }} style={styles.produtoImagem} />
        <View style={styles.produtoTextos}>
          <Text style={styles.produtoNome}>{item.nome}</Text>
          <Text style={styles.produtoPreco}>
            Preço: R$ {item.preco.toFixed(2).replace(".", ",")}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => handleAdicionar(item)}
        >
          <Text style={styles.textoBotaoAdicionar}>ADICIONAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundOverlay}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/Ellipse-1.png")}
            style={styles.logo}
          />
          <Text style={styles.titulo}>BEBIDAS</Text>
        </View>

        <View style={styles.buscaContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#000"
            style={styles.iconeBusca}
          />
          <TextInput
            style={styles.inputBusca}
            placeholder="Pesquise aqui..."
            placeholderTextColor="#666"
            value={pesquisa}
            onChangeText={setPesquisa}
          />
          <Ionicons
            name="mic-outline"
            size={20}
            color="#000"
            style={styles.iconeMic}
          />
        </View>

        <View style={styles.categoriasContainer}>
          {CATEGORIAS.map((cat) => (
            <TouchableOpacity key={cat} onPress={() => setCategoriaAtiva(cat)}>
              <Text
                style={[
                  styles.textoCategoria,
                  categoriaAtiva === cat && styles.textoCategoriaAtiva,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.separador} />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#d4a017"
            style={{ marginTop: 40 }}
          />
        ) : (
          <FlatList
            data={produtosFiltrados}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderProduto}
            contentContainerStyle={styles.listaProdutos}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#3a2318" },
  backgroundOverlay: { flex: 1, paddingHorizontal: 16, paddingTop: 40 },
  header: { alignItems: "center", marginBottom: 20 },
  logo: { width: 140, height: 140, resizeMode: "contain", marginBottom: 10 },
  titulo: {
    color: "#d4a017",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  buscaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d3d3d3",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    marginBottom: 15,
  },
  iconeBusca: { marginRight: 10 },
  inputBusca: { flex: 1, fontSize: 16, color: "#000" },
  iconeMic: { marginLeft: 10 },
  categoriasContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  textoCategoria: { color: "#a08b7d", fontSize: 16, fontWeight: "600" },
  textoCategoriaAtiva: { color: "#d4a017" },
  separador: {
    height: 1,
    backgroundColor: "#fff",
    opacity: 0.3,
    marginBottom: 15,
  },
  listaProdutos: { paddingBottom: 20 },
  cardProduto: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  lixeiraContainer: { marginRight: 10 },
  produtoInfoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10,
    paddingRight: 15,
  },
  produtoImagem: {
    width: 30,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  produtoTextos: { flex: 1 },
  produtoNome: { fontSize: 12, fontWeight: "bold", color: "#000" },
  produtoPreco: { fontSize: 10, color: "#000", marginTop: 2 },
  botaoAdicionar: {
    backgroundColor: "#b34700",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  textoBotaoAdicionar: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  emptyText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});
