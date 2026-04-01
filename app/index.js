import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import LoginScreen from "../src/screens/LoginScreen";
import { initDatabase } from "../src/services/database";

export default function Index() {
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

  return <LoginScreen />;
}