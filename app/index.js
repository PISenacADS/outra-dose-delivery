import ProdutoScreen from "../src/screens/ProdutoScreen";
import HomeScreen from "../src/screens/HomeScreen";
import DadosScreen from "../src/screens/DadosScreen";

export default function Index() {
  /* ==========================================
     CÓDIGO ORIGINAL COMENTADO PARA TESTES
  =============================================
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    initDatabase().then(() => setDbReady(true));
  }, []);

  if (!dbReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  ============================================= */

  return <HomeScreen />;
}
