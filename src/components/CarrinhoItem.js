import { Pressable, StyleSheet, Text, View } from "react-native";

const CarrinhoItem = ({ item, onAumentar, onDiminuir, onRemover }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={[styles.itemName, styles.acmeTypo]}>{item.nome}</Text>
        <Text style={styles.itemPrice}>
          R$ {item.preco.toFixed(2).replace('.', ',')}
        </Text>
      </View>

      <View style={styles.quantityControl}>
        <Pressable onPress={onDiminuir} style={styles.qtyButton}>
          <Text style={styles.qtyButtonText}>-</Text>
        </Pressable>
        
        <Text style={[styles.qtyText, styles.acmeTypo]}>{item.quantidade}</Text>
        
        <Pressable onPress={onAumentar} style={styles.qtyButton}>
          <Text style={styles.qtyButtonText}>+</Text>
        </Pressable>
      </View>

      <Pressable onPress={onRemover} style={styles.removeButton}>
        <Text style={styles.removeText}>X</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  acmeTypo: {
    fontFamily: "Acme", 
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15, 
  },
  itemInfo: {
    flex: 2,
  },
  itemName: {
    fontSize: 18,
    color: "#333",
  },
  itemPrice: {
    fontSize: 16,
    color: "#af4706",
    fontWeight: "bold",
    marginTop: 4,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  qtyButton: {
    paddingHorizontal: 10,
  },
  qtyButtonText: {
    fontSize: 20,
    color: "#af4706",
    fontWeight: "bold",
  },
  qtyText: {
    fontSize: 18,
    marginHorizontal: 10,
    color: "#333",
  },
  removeButton: {
    padding: 5,
  },
  removeText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CarrinhoItem;