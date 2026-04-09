import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

const frameIconSource = require("../../assets/images/Inicio.svg");
const frame1IconSource = require("../../assets/images/Categorias.svg");
const frame2IconSource = require("../../assets/images/Cart-Profile-Icons.svg");
const cartProfileIconsSource = require("../../assets/images/perfil.svg");

const FrameComponent2 = () => {
  return (
    <View style={styles.navBarContainer}>
     
      <View style={styles.topBorder} />

      <View style={styles.menuWrapper}>
        
        
        <TouchableOpacity style={styles.menuItem}>
          <Image
            source={frameIconSource}
            style={styles.iconStyle}
            contentFit="contain"
          />
          <Text style={styles.menuText}>Inicio</Text>
        </TouchableOpacity>

       
        <TouchableOpacity style={styles.menuItem}>
          <Image
            source={frame1IconSource}
            style={styles.iconStyle}
            contentFit="contain"
          />
          <Text style={styles.menuText}>Categorias</Text>
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.menuItem}>
          <Image
            source={frame2IconSource}
            style={styles.iconStyle}
            contentFit="contain"
          />
          <Text style={styles.menuText}>Carrinho</Text>
        </TouchableOpacity>

      
        <TouchableOpacity style={styles.menuItem}>
          <Image
            source={cartProfileIconsSource}
            style={styles.iconStyle}
            contentFit="contain"
          />
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
  iconStyle: {
    width: 30,
    height: 30,
  },
  menuText: {
    color: "#fff",
    fontFamily: "Inter",
    fontSize: 12, 
    textAlign: "center",
  },
});

export default FrameComponent2;