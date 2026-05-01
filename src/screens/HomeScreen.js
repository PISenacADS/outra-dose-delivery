import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";

import FrameComponent2 from "../components/TabBarComponent2";

import wood from "../../assets/images/Rectangle-14.png";
import logo from "../../assets/images/Ellipse-1.png";

export default function HomeScreen() {
  const [endereco, setEndereco] = useState("");
  const router = useRouter(); 

  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={wood} style={styles.background} resizeMode="cover">
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <Image source={logo} style={styles.logo} />

          <View style={styles.addressBox}>
            <Text style={styles.addressIcon}>📍</Text>

            <TextInput
              placeholder="Digite seu endereço de entrega..."
              placeholderTextColor="#d8d8d8"
              value={endereco}
              onChangeText={setEndereco}
              style={styles.addressInput}
            />
          </View>

          <View style={styles.banner}>
            <View style={styles.bannerTextArea}>
              <Text style={styles.bannerTitle}>
                Happy Hour Outra Dose: 20% OFF em Cervejas Artesanais! 🔥
              </Text>

              <TouchableOpacity style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Aproveitar Agora!</Text>
              </TouchableOpacity>
            </View>

            <Image source={logo} style={styles.bannerImage} />
          </View>

          <View style={styles.dots}>
            <View style={styles.dotActive} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
            {categories.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.category} 
                onPress={() => router.push("/produtos")}
              >
                <View style={styles.categoryCircle}>
                  <Image source={logo} style={styles.categoryImage} />
                </View>
                <Text style={styles.categoryText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>As Mais Geladas!</Text>

          <View style={styles.productsContainer}>
            {products.map((item, index) => (
              <View key={index} style={styles.card}>
                <Image source={logo} style={styles.productImage} />

                <Text style={styles.productName}>{item.name}</Text>

                <View style={styles.bottom}>
                  <Text style={styles.price}>{item.price}</Text>

                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          
          <View style={{ height: 90 }} />
        </ScrollView>

        <FrameComponent2 />
      </ImageBackground>
    </View>
  );
}

const categories = ["Cervejas", "Vinhos", "Destilados", "Gelo & Extras", "Petiscos"];

const products = [
  { name: "Eisenbahn Pale Ale", price: "R$ 9,90" },
  { name: "Heineken 600ml", price: "R$ 12,90" },
  { name: "Budweiser 350ml", price: "R$ 5,90" },
  { name: "Skol 269ml", price: "R$ 3,99" },
  { name: "Corona Extra", price: "R$ 11,90" },
  { name: "Bombay Sapphire Gin", price: "R$ 89,90" },
  { name: "Whisky Jack Daniels", price: "R$ 182,49" },
  { name: "Whisky Red Label", price: "R$ 79,90" },
  { name: "Vinho Dom Bosco", price: "R$ 14,73" },
  { name: "Vinho Concha y Toro", price: "R$ 39,90" },
  { name: "Coca-Cola 1L", price: "R$ 7,49" },
  { name: "Guaraná Antarctica 2L", price: "R$ 8,99" },
];

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  background: {
    flex: 1,
    width: "100%",
  },

  container: {
    paddingTop: 45, 
    paddingHorizontal: 14,
    paddingBottom: 20,
  },

  logo: {
    width: 190,
    height: 62,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 12,
  },

  addressBox: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  addressIcon: {
    fontSize: 16,
    marginRight: 8,
  },

  addressInput: {
    flex: 1,
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    padding: 0,
  },

  banner: {
    height: 120,
    backgroundColor: "rgba(10,15,20,0.78)",
    borderRadius: 16,
    flexDirection: "row",
    overflow: "hidden",
    padding: 14,
    marginBottom: 10,
  },

  bannerTextArea: {
    flex: 1,
    justifyContent: "center",
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 12,
  },

  bannerButton: {
    backgroundColor: "#f7b24c",
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  bannerButtonText: {
    color: "#2b1607",
    fontSize: 11,
    fontWeight: "900",
  },

  bannerImage: {
    width: 105,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginBottom: 14,
  },

  dotActive: {
    width: 22,
    height: 6,
    backgroundColor: "#f7b24c",
    borderRadius: 10,
  },

  dot: {
    width: 6,
    height: 6,
    backgroundColor: "#555",
    borderRadius: 3,
  },

  categories: {
    marginBottom: 16,
  },

  category: {
    alignItems: "center",
    marginRight: 16,
  },

  categoryCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: "#f7a43a",
    backgroundColor: "rgba(20,25,30,0.8)",
    alignItems: "center",
    justifyContent: "center",
  },

  categoryImage: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
//ggg
  categoryText: {
    color: "#d7d7d7",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 6,
  },

  sectionTitle: {
    color: "#f7a43a",
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 10,
  },

  card: {
    width: "32%",
    backgroundColor: "rgba(18,28,38,0.92)",
    borderRadius: 12,
    padding: 5,
    marginBottom: 18,
  },

  productImage: {
    width: "100%",
    height: 105,
    borderRadius: 10,
    resizeMode: "contain",
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  productName: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "900",
    marginTop: 8,
    minHeight: 36,
  },

  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },

  price: {
    color: "#f7b24c",
    fontSize: 14,
    fontWeight: "900",
  },

  addButton: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: "#f7b24c",
    alignItems: "center",
    justifyContent: "center",
  },

  addText: {
    color: "#1a1a1a",
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 24,
  },

  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});