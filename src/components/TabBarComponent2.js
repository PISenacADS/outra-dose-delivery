import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; 

import InicioIcon from "../../assets/images/Inicio.svg";
import CategoriasIcon from "../../assets/images/Categorias.svg";
import CartProfileIcon from "../../assets/images/Cart-Profile-Icons.svg";
import PerfilIcon from "../../assets/images/perfil.svg";

const FrameComponent2 = () => {
  const router = useRouter(); 

  return (
    <View style={styles.navBarContainer}>
      
      <View style={styles.topBorder} />

      <View style={styles.menuWrapper}>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/home")}>
          <InicioIcon width={30} height={30} />
          <Text style={styles.menuText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/produtos")}>
          <CategoriasIcon width={30} height={30} />
          <Text style={styles.menuText}>Categorias</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/carrinho")}>
          <CartProfileIcon width={30} height={30} />
          <Text style={styles.menuText}>Carrinho</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/perfil")}>
          <PerfilIcon width={30} height={30} />
          <Text style={styles.menuText}>Perfil</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBarContainer: {
    backgroundColor: "#2D2D2D",
    width: '100%',
    height: 90,           
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,          
    elevation: 10,        
  },
  topBorder: {
    width: '100%',
    height: 2,
    backgroundColor: "#af4706",
  },
  menuWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: '100%',
    paddingBottom: 10, 
  },
  menuItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  menuText: {
    color: "#fff",
    fontFamily: "Inter",
    fontSize: 12, 
    textAlign: "center",
  },
});

export default FrameComponent2;