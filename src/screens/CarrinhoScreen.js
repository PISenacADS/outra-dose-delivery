import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FrameComponent2 from "../components/TabBarComponent2";
import { getCarrinho, removerDoCarrinho } from "../services/api";

const CarrinhoScreen = () => {
  const router = useRouter();

  const userId = 1;
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarCarrinho();
  }, []);

  const carregarCarrinho = async () => {
    try {
      const data = await getCarrinho(userId);
      if (data.success) {
        setItensCarrinho(data.data.itens);
      }
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
    }
  };

  const aumentarQuantidade = (id) => {
    setItensCarrinho(
      itensCarrinho.map((item) =>
        item.produtoId === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item,
      ),
    );
  };

  const diminuirQuantidade = (id) => {
    setItensCarrinho(
      itensCarrinho.map((item) =>
        item.produtoId === id && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item,
      ),
    );
  };

  const removerItem = async (id) => {
    try {
      await removerDoCarrinho(userId, id);
      setItensCarrinho(itensCarrinho.filter((item) => item.produtoId !== id));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover o item.");
    }
  };

  const calcularTotal = () => {
    return itensCarrinho
      .reduce((total, item) => total + item.preco * item.quantidade, 0)
      .toFixed(2);
  };

  const handleFinalizarPedido = () => {
    if (itensCarrinho.length === 0) {
      Alert.alert(
        "Atenção",
        "Seu carrinho está vazio. Adicione bebidas antes de finalizar.",
      );
      return;
    }
    router.push("/finalizacao");
  };

  return (
    <ImageBackground
      style={styles.backgroundIcon}
      source={require("../../assets/images/Cadastro.png")}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, styles.acmeTypo]}>SEU CARRINHO</Text>
        </View>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
        >
          {itensCarrinho.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma bebida no carrinho.</Text>
          ) : (
            itensCarrinho.map((item) => (
              <View key={item.produtoId} style={styles.cartItem}>
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemName, styles.acmeTypo]}>
                    {item.nome}
                  </Text>
                  <Text style={styles.itemPrice}>
                    R$ {item.preco.toFixed(2).replace(".", ",")}
                  </Text>
                </View>

                <View style={styles.quantityControl}>
                  <Pressable
                    onPress={() => diminuirQuantidade(item.produtoId)}
                    style={styles.qtyButton}
                  >
                    <Text style={styles.qtyButtonText}>-</Text>
                  </Pressable>
                  <Text style={[styles.qtyText, styles.acmeTypo]}>
                    {item.quantidade}
                  </Text>
                  <Pressable
                    onPress={() => aumentarQuantidade(item.produtoId)}
                    style={styles.qtyButton}
                  >
                    <Text style={styles.qtyButtonText}>+</Text>
                  </Pressable>
                </View>

                <Pressable
                  onPress={() => removerItem(item.produtoId)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeText}>X</Text>
                </Pressable>
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={[styles.totalLabel, styles.acmeTypo]}>TOTAL:</Text>
            <Text style={[styles.totalValue, styles.acmeTypo]}>
              R$ {calcularTotal().replace(".", ",")}
            </Text>
          </View>

          <Pressable
            style={[styles.actionButton, styles.buttonLayout]}
            onPress={handleFinalizarPedido}
            disabled={loading}
          >
            <Text style={[styles.actionButtonText, styles.acmeTypo]}>
              FINALIZAR PEDIDO
            </Text>
          </Pressable>
        </View>
      </View>

      <FrameComponent2 />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  acmeTypo: {
    textAlign: "left",
    fontFamily: "Acme",
  },
  buttonLayout: {
    backgroundColor: "#af4706",
    borderRadius: 49,
    width: 314,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  backgroundIcon: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 110,
  },
  header: {
    width: "100%",
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 38,
    color: "#f5d76e",
    fontFamily: "Acme",
    textAlign: "center",
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 15,
    paddingBottom: 20,
  },
  emptyText: {
    color: "#fff",
    fontFamily: "Acme",
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemInfo: {
    flex: 2,
  },
  itemName: {
    fontSize: 18,
    color: "#333",
  },
  itemPrice: {
    fontSize: 16,
    color: "#af4706",
    fontWeight: "bold",
    marginTop: 4,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  qtyButton: {
    paddingHorizontal: 10,
  },
  qtyButtonText: {
    fontSize: 20,
    color: "#af4706",
    fontWeight: "bold",
  },
  qtyText: {
    fontSize: 18,
    marginHorizontal: 10,
    color: "#333",
  },
  removeButton: {
    padding: 5,
  },
  removeText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    width: "90%",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 95,
    backgroundColor: "rgba(17, 17, 17, 0.57)",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#af4706",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 314,
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 24,
    color: "#fff",
  },
  totalValue: {
    fontSize: 24,
    color: "#9f9018",
  },
  actionButtonText: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "Acme",
    textAlign: "center",
  },
});

export default CarrinhoScreen;
