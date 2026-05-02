import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { buscarEnderecoPorCep } from "../services/api";
import { salvarEnderecoLocal } from "../services/database";

export default function EnderecoScreen() {
  const router = useRouter();
  const userId = 1;

  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [label, setLabel] = useState("Casa");
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBuscarCep = async () => {
    if (cep.replace(/\D/g, "").length !== 8) {
      Alert.alert("Atenção", "Digite um CEP válido com 8 números.");
      return;
    }

    try {
      setLoading(true);
      const data = await buscarEnderecoPorCep(cep);
      if (data.success) {
        setEndereco(data.data);
      } else {
        Alert.alert("Erro", data.error || "CEP não encontrado.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar o CEP.");
    } finally {
      setLoading(false);
    }
  };

  const handleSalvar = async () => {
    if (!endereco) {
      Alert.alert("Atenção", "Busque um CEP primeiro.");
      return;
    }
    if (!numero) {
      Alert.alert("Atenção", "Informe o número do endereço.");
      return;
    }

    try {
      await salvarEnderecoLocal(
        userId,
        label,
        endereco.rua,
        numero,
        complemento,
        endereco.bairro,
        endereco.cidade,
        cep,
      );
      Alert.alert("Sucesso", "Endereço salvo com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o endereço.");
    }
  };

  const formatarCep = (text) => {
    const nums = text.replace(/\D/g, "");
    if (nums.length <= 5) return nums;
    return `${nums.slice(0, 5)}-${nums.slice(5, 8)}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#d4a017" />
          </TouchableOpacity>
          <Text style={styles.titulo}>MEUS ENDEREÇOS</Text>
        </View>

        {/* Label do endereço */}
        <Text style={styles.label}>Tipo de endereço</Text>
        <View style={styles.labelRow}>
          {["Casa", "Trabalho", "Outro"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.labelBtn, label === item && styles.labelBtnAtivo]}
              onPress={() => setLabel(item)}
            >
              <Text
                style={[
                  styles.labelBtnText,
                  label === item && styles.labelBtnTextAtivo,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CEP */}
        <Text style={styles.label}>CEP</Text>
        <View style={styles.cepRow}>
          <TextInput
            style={styles.inputCep}
            placeholder="00000-000"
            placeholderTextColor="#999"
            value={cep}
            onChangeText={(t) => setCep(formatarCep(t))}
            keyboardType="numeric"
            maxLength={9}
          />
          <TouchableOpacity
            style={styles.btnBuscar}
            onPress={handleBuscarCep}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnBuscarText}>Buscar</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Resultado do CEP */}
        {endereco && (
          <View style={styles.enderecoBox}>
            <View style={styles.enderecoRow}>
              <MaterialCommunityIcons
                name="map-marker"
                size={20}
                color="#d4a017"
              />
              <Text style={styles.enderecoText}>
                {endereco.rua}, {endereco.bairro}
              </Text>
            </View>
            <Text style={styles.enderecoSubText}>
              {endereco.cidade} — {endereco.estado}
            </Text>
          </View>
        )}

        {/* Número */}
        <Text style={styles.label}>Número</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 123"
          placeholderTextColor="#999"
          value={numero}
          onChangeText={setNumero}
          keyboardType="numeric"
        />

        {/* Complemento */}
        <Text style={styles.label}>Complemento (opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Apto 42, Bloco B"
          placeholderTextColor="#999"
          value={complemento}
          onChangeText={setComplemento}
        />

        {/* Botão salvar */}
        <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar}>
          <Text style={styles.btnSalvarText}>SALVAR ENDEREÇO</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#3a2318" },
  scroll: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  backButton: { marginRight: 15 },
  titulo: { fontSize: 28, color: "#d4a017", fontFamily: "Acme" },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
  },
  labelRow: { flexDirection: "row", gap: 10 },
  labelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d4a017",
  },
  labelBtnAtivo: { backgroundColor: "#d4a017" },
  labelBtnText: { color: "#d4a017", fontWeight: "600" },
  labelBtnTextAtivo: { color: "#fff" },
  cepRow: { flexDirection: "row", gap: 10 },
  inputCep: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  btnBuscar: {
    backgroundColor: "#d4a017",
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  btnBuscarText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  enderecoBox: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#d4a017",
  },
  enderecoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  enderecoText: { color: "#fff", fontSize: 15, fontWeight: "600", flex: 1 },
  enderecoSubText: {
    color: "#ccc",
    fontSize: 13,
    marginTop: 4,
    marginLeft: 28,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  btnSalvar: {
    backgroundColor: "#af4706",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 30,
  },
  btnSalvarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Acme",
  },
});
