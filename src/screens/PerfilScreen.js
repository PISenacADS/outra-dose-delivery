import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const HISTORICO_PEDIDOS = [
  {
    id: "#1020",
    data: "26/03/2026",
    itens: "2x cerveja Heineken",
    valor: "R$ 19,58",
    status: "Entregue",
  },
  {
    id: "#1020",
    data: "26/03/2026",
    itens: "1 x Vinho Dom bosco",
    valor: "R$ 14,73",
    status: "Entregue",
  },
];

export default function PerfilScreen() {

  const renderActionButton = (iconName, label, IconComponent) => (
    <TouchableOpacity style={styles.actionButton}>
      <View style={styles.actionIconContainer}>{IconComponent}</View>
      <Text style={styles.actionButtonText}>{label}</Text>
      <Ionicons
        name="chevron-forward"
        size={22}
        color="#666"
        style={styles.chevron}
      />
    </TouchableOpacity>
  );

  const renderHistoricoRow = (ped, index) => (
    <View key={index} style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.cellPed]} numberOfLines={1}>
        {ped.id}
      </Text>
      <Text style={[styles.tableCell, styles.cellData]} numberOfLines={1}>
        {ped.data}
      </Text>
      <Text style={[styles.tableCell, styles.cellItens]} numberOfLines={2}>
        {ped.itens}
      </Text>
      <Text style={[styles.tableCell, styles.cellValor]} numberOfLines={1}>
        {ped.valor}
      </Text>
      <Text
        style={[styles.tableCell, styles.cellStatus, styles.statusEntregue]}
        numberOfLines={1}
      >
        {ped.status}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {}
        <View style={styles.header}>
          <TouchableOpacity style={styles.exitButton}>
            <Text style={styles.exitText}>Sair</Text>
          </TouchableOpacity>

          {}
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../assets/images/Ellipse-1.png")}
              style={styles.logoBaseCircle}
            />
          </View>

          <Text style={styles.userName}>JOAO</Text>
        </View>

        {}
        <View style={styles.actionsContainer}>
          {renderActionButton(
            "person-circle-outline",
            "Meus dados",
            <Ionicons name="person-circle-outline" size={28} color="#666" />,
          )}
          {renderActionButton(
            "location-exit",
            "Meus Endereços",
            <MaterialCommunityIcons
              name="map-marker-radius"
              size={28}
              color="#666"
            />,
          )}
        </View>

        {}
        <View style={styles.historicoContainer}>
          <View style={styles.historicoHeaderRow}>
            <Text style={styles.historicoTitle}>Historico de Pedidos</Text>
            <TouchableOpacity style={styles.downloadButton}>
              <Ionicons name="download-outline" size={22} color="#d4a017" />
            </TouchableOpacity>
          </View>

          {}
          <View style={styles.tableContainer}>
            {}
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, styles.cellPed]}>Pedidos</Text>
              <Text style={[styles.headerCell, styles.cellData]}>Data</Text>
              <Text style={[styles.headerCell, styles.cellItens]}>Itens</Text>
              <Text style={[styles.headerCell, styles.cellValor]}>Valor</Text>
              <Text style={[styles.headerCell, styles.cellStatus]}>Status</Text>
            </View>

            {}
            {HISTORICO_PEDIDOS.map(renderHistoricoRow)}
          </View>
        </View>

        {}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3a2318",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
  header: {
    alignItems: "center",
    marginBottom: 25,
  },
  exitButton: {
    alignSelf: "flex-end",
    position: "absolute",
    right: 0,
    top: 5,
    padding: 5,
  },
  exitText: {
    color: "#d4a017",
    fontSize: 16,
    fontWeight: "bold",
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    marginTop: 20,
    position: "relative",
  },
  logoBaseCircle: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 75,
  },
  profileIconOverlay: {
    position: "absolute",

    transform: [{ translateY: 0 }],
  },
  userName: {
    color: "#d4a017",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 10,
    letterSpacing: 1.5,
  },
  actionsContainer: {
    marginBottom: 25,
    gap: 15,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 35,
    height: 65,
    paddingHorizontal: 20,

    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionIconContainer: {
    width: 35,
    alignItems: "center",
  },
  actionButtonText: {
    flex: 1,
    color: "#666",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 15,
  },
  chevron: {
    marginLeft: 10,
  },
  historicoContainer: {
    marginBottom: 25,
  },
  historicoHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8, // RN Moderno
    marginBottom: 15,
  },
  historicoTitle: {
    color: "#d4a017", // Dourado
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
  },
  downloadButton: {
    padding: 3,
  },
  tableContainer: {
    
  },
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
  tableCell: {
    color: "#fff",
    fontSize: 11,
    paddingHorizontal: 2,
  },

  cellPed: { width: "13%" },
  cellData: { width: "20%" },
  cellItens: { width: "38%" },
  cellValor: { width: "16%" },
  cellStatus: { width: "13%" },

  statusEntregue: {
    color: "#a0f0a0",
    fontWeight: "600",
  },
  buscaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d3d3d3", 
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    marginTop: 5,
    marginBottom: 10, 
  },
  iconeBusca: {
    marginRight: 10,
  },
  inputBusca: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});
