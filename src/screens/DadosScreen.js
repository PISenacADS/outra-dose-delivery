import * as React from "react";
import { 
  ScrollView, 
  Image, 
  StyleSheet, 
  View, 
  Text, 
  ImageBackground 
} from "react-native";
import FrameComponent2 from "../components/TabBarComponent2";  

const Perfil = () => {
 
  const usuario = {
    nome: "João Silva Sauro",
    dataNascimento: "15/05/1992",
    email: "joao.silva@email.com"
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("../../assets/images/Rectangle-14.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          
          <View style={styles.logoWrapper}>
            <Image
              style={styles.logoImage}
              resizeMode="contain"
              source={require("../../assets/images/Ellipse-1.png")}
            />
          </View>

          <Text style={styles.titleText}>MEUS DADOS</Text>

          <View style={styles.infoContainer}>
            
            <View style={styles.infoField}>
              <Text style={styles.label}>NOME COMPLETO</Text>
              <Text style={styles.value}>{usuario.nome}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoField}>
              <Text style={styles.label}>DATA DE NASCIMENTO</Text>
              <Text style={styles.value}>{usuario.dataNascimento}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoField}>
              <Text style={styles.label}>E-MAIL</Text>
              <Text style={styles.value}>{usuario.email}</Text>
            </View>

          </View>
          
          <View style={{ height: 120 }} />
        </ScrollView>

        <FrameComponent2 />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#000", 
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 40,
    alignItems: "center", 
  },
  logoWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  logoImage: {
    width: 200, 
    height: 180,
  },
  titleText: {
    fontSize: 28, 
    fontFamily: "Acme", 
    color: "#9f9018",
    textAlign: "center",
    width: "100%",
    marginBottom: 30,
  },
  infoContainer: {
    width: "90%",
    backgroundColor: "rgba(0, 0, 0, 0.75)", 
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "#9f9018", 
  },
  infoField: {
    marginVertical: 10,
  },
  label: {
    color: "#9f9018",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: 1,
  },
  value: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(159, 144, 24, 0.3)", 
    width: "100%",
    marginTop: 8,
  },
});

export default Perfil;