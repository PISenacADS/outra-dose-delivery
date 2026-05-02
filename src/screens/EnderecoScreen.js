import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
import {
  definirEnderecoPadrao,
  getEnderecosByUsuario,
  salvarEnderecoLocal,
} from "../services/database";

export default function EnderecoScreen() {
  const router = useRouter();
  const userId = 1;

  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [label, setLabel] = useState("Casa");
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enderecosSalvos, setEnderecosSalvos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    carregarEnderecos();
  }, []);

  const carregarEnderecos = async () => {
    try {
      const data = await getEnderecosByUsuario(userId);
      setEnderecosSalvos(data);
    } catch (error) {
      console.error("Erro ao carregar endereços:", error);
    }
  };

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
      Alert.alert("Sucesso", "Endereço salvo com sucesso!");
      setCep("");
      setNumero("");
      setComplemento("");
      setEndereco(null);
      setMostrarFormulario(false);
      carregarEnderecos();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o endereço.");
    }
  };

  const handleDefinirPadrao = async (enderecoId) => {
    try {
      await definirEnderecoPadrao(enderecoId, userId);
      carregarEnderecos();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível definir o endereço padrão.");
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

        {/* Lista de endereços salvos */}
        {enderecosSalvos.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Endereços salvos</Text>
            {enderecosSalvos.map((end) => (
              <View
                key={end.id}
                style={[
                  styles.enderecoCard,
                  end.padrao === 1 && styles.enderecoCardPadrao,
                ]}
              >
                <View style={styles.enderecoCardInfo}>
                  <View style={styles.enderecoCardHeader}>
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={18}
                      color={end.padrao === 1 ? "#d4a017" : "#999"}
                    />
                    <Text style={styles.enderecoCardLabel}>{end.label}</Text>
                    {end.padrao === 1 && (
                      <View style={styles.padraoTag}>
                        <Text style={styles.padraoTagText}>Padrão</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.enderecoCardText}>
                    {end.rua}, {end.numero}
                    {end.complemento ? `, ${end.complemento}` : ""}
                  </Text>
                  <Text style={styles.enderecoCardSub}>
                    {end.bairro} — {end.cidade} — CEP: {end.cep}
                  </Text>
                </View>
                {end.padrao !== 1 && (
                  <TouchableOpacity
                    style={styles.btnPadrao}
                    onPress={() => handleDefinirPadrao(end.id)}
                  >
                    <Text style={styles.btnPadraoText}>Usar</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Botão adicionar novo */}
        <TouchableOpacity
          style={styles.btnAdicionar}
          onPress={() => setMostrarFormulario(!mostrarFormulario)}
        >
          <Ionicons
            name={mostrarFormulario ? "close" : "add"}
            size={20}
            color="#fff"
          />
          <Text style={styles.btnAdicionarText}>
            {mostrarFormulario ? "Cancelar" : "Adicionar novo endereço"}
          </Text>
        </TouchableOpacity>

        {/* Formulário */}
        {mostrarFormulario && (
          <View style={styles.formulario}>
            <Text style={styles.label}>Tipo de endereço</Text>
            <View style={styles.labelRow}>
              {["Casa", "Trabalho", "Outro"].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.labelBtn,
                    label === item && styles.labelBtnAtivo,
                  ]}
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

            <Text style={styles.label}>Número</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 123"
              placeholderTextColor="#999"
              value={numero}
              onChangeText={setNumero}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Complemento (opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Apto 42, Bloco B"
              placeholderTextColor="#999"
              value={complemento}
              onChangeText={setComplemento}
            />

            <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar}>
              <Text style={styles.btnSalvarText}>SALVAR ENDEREÇO</Text>
            </TouchableOpacity>
          </View>
        )}
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
  section: { marginBottom: 20 },
  sectionTitle: {
    color: "#d4a017",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  enderecoCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  enderecoCardPadrao: {
    borderColor: "#d4a017",
    backgroundColor: "rgba(212,160,23,0.15)",
  },
  enderecoCardInfo: { flex: 1 },
  enderecoCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  enderecoCardLabel: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  padraoTag: {
    backgroundColor: "#d4a017",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  padraoTagText: { color: "#fff", fontSize: 11, fontWeight: "bold" },
  enderecoCardText: { color: "#ddd", fontSize: 13 },
  enderecoCardSub: { color: "#999", fontSize: 12, marginTop: 2 },
  btnPadrao: {
    backgroundColor: "#af4706",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  btnPadraoText: { color: "#fff", fontWeight: "bold", fontSize: 13 },
  btnAdicionar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#af4706",
    borderRadius: 12,
    padding: 15,
    justifyContent: "center",
    marginBottom: 20,
  },
  btnAdicionarText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  formulario: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
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
    marginTop: 20,
  },
  btnSalvarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Acme",
  },
});
