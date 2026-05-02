import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import FrameComponent2 from "../components/TabBarComponent2";
import DadosScreen from "./DadosScreen";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getPedidos } from "../services/api";

export default function PerfilScreen() {
  const router = useRouter();
  const userId = 1;
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    try {
      const data = await getPedidos(userId);
      if (data.success) setPedidos(data.data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderHistoricoRow = (ped, index) => (
    <View key={index} style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.cellPed]} numberOfLines={1}>
        {ped.compraId?.split("-")[1] || "-"}
      </Text>
      <Text style={[styles.tableCell, styles.cellData]} numberOfLines={1}>
        {ped.dataHoraFormatada?.split(",")[0] || "-"}
      </Text>
      <Text style={[styles.tableCell, styles.cellItens]} numberOfLines={2}>
        {ped.produtos
          ?.map((p) => `${p.quantidade}x ${p.nomeProduto}`)
          .join(", ") || "-"}
      </Text>
      <Text style={[styles.tableCell, styles.cellValor]} numberOfLines={1}>
        {ped.resumo?.valorTotalFormatado || "-"}
      </Text>
      <Text
        style={[styles.tableCell, styles.cellStatus, styles.statusEntregue]}
        numberOfLines={1}
      >
        {ped.pagamento?.status || "-"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.exitButton}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.exitText}>Sair</Text>
          </TouchableOpacity>

          <View style={styles.avatarContainer}>
            <Image
              source={require("../../assets/images/Ellipse-1.png")}
              style={styles.logoBaseCircle}
            />
          </View>

          <Text style={styles.userName}>JOÃO</Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/Dados")}>
            <View style={styles.actionIconContainer}>
              <Ionicons name="person-circle-outline" size={28} color="#666" />
            </View>
            <Text style={styles.actionButtonText}>Meus dados</Text>
            <Ionicons
              name="chevron-forward"
              size={22}
              color="#666"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/endereco")}
          >
            <View style={styles.actionIconContainer}>
              <MaterialCommunityIcons
                name="map-marker-radius"
                size={28}
                color="#666"
              />
            </View>
            <Text style={styles.actionButtonText}>Meus Endereços</Text>
            <Ionicons
              name="chevron-forward"
              size={22}
              color="#666"
              style={styles.chevron}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.historicoContainer}>
          <View style={styles.historicoHeaderRow}>
            <Text style={styles.historicoTitle}>Histórico de Pedidos</Text>
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#d4a017"
              style={{ marginTop: 20 }}
            />
          ) : (
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, styles.cellPed]}>Pedido</Text>
                <Text style={[styles.headerCell, styles.cellData]}>Data</Text>
                <Text style={[styles.headerCell, styles.cellItens]}>Itens</Text>
                <Text style={[styles.headerCell, styles.cellValor]}>Valor</Text>
                <Text style={[styles.headerCell, styles.cellStatus]}>
                  Status
                </Text>
              </View>

              {pedidos.length === 0 ? (
                <Text style={styles.emptyText}>Nenhum pedido encontrado.</Text>
              ) : (
                pedidos.map(renderHistoricoRow)
              )}
            </View>
          )}
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
          />
        </View>
        
      </ScrollView>
      <FrameComponent2 />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#3a2318" },
  scrollContent: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 30 },
  header: { alignItems: "center", marginBottom: 25 },
  exitButton: {
    alignSelf: "flex-end",
    position: "absolute",
    right: 0,
    top: 5,
    padding: 5,
  },
  exitText: { color: "#d4a017", fontSize: 16, fontWeight: "bold" },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    marginTop: 20,
  },
  logoBaseCircle: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 75,
  },
  userName: {
    color: "#d4a017",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 10,
    letterSpacing: 1.5,
  },
  actionsContainer: { marginBottom: 25, gap: 15 },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 35,
    height: 65,
    paddingHorizontal: 20,
  },
  actionIconContainer: { width: 35, alignItems: "center" },
  actionButtonText: {
    flex: 1,
    color: "#666",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 15,
  },
  chevron: { marginLeft: 10 },
  historicoContainer: { marginBottom: 25 },
  historicoHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  historicoTitle: {
    color: "#d4a017",
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableContainer: {},
  tableHeader: {
    flexDirection: "row",
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    marginBottom: 8,
  },
  headerCell: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 2,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  tableCell: { color: "#fff", fontSize: 11, paddingHorizontal: 2 },
  cellPed: { width: "13%" },
  cellData: { width: "20%" },
  cellItens: { width: "38%" },
  cellValor: { width: "16%" },
  cellStatus: { width: "13%" },
  statusEntregue: { color: "#a0f0a0", fontWeight: "600" },
  emptyText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  buscaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d3d3d3",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    marginTop: 5,
  },
  iconeBusca: { marginRight: 10 },
  inputBusca: { flex: 1, fontSize: 16, color: "#000" },
});
