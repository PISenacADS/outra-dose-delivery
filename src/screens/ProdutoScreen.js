import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  Image, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dados mockados baseados no seu design
const PRODUTOS = [
  { id: '1', nome: 'Cerveja Heineken 600ml', preco: '9,79', imagem: 'https://via.placeholder.com/50' },
  { id: '2', nome: 'Cerveja Original 269ml', preco: '2,49', imagem: 'https://via.placeholder.com/50' },
  { id: '3', nome: 'Vinho Nacional Dom Bosco', preco: '14,73', imagem: 'https://via.placeholder.com/50' },
  { id: '4', nome: 'Whiskey Jack Daniel\'s 375ml', preco: '182,49', imagem: 'https://via.placeholder.com/50' },
  { id: '5', nome: 'Whiskey Jack Daniels Honey 1l', preco: '162,49', imagem: 'https://via.placeholder.com/50' },
  { id: '6', nome: 'Coca-Cola 1l', preco: '7,49', imagem: 'https://via.placeholder.com/50' },
];

const CATEGORIAS = ['Vinhos', 'Cervejas', 'Whishey', 'Combos'];

export default function ProdutoScreen() {
  const [pesquisa, setPesquisa] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Cervejas');

  const renderProduto = ({ item }) => (
    <View style={styles.cardProduto}>
      <View style={styles.lixeiraContainer}>
        <Ionicons name="trash-outline" size={24} color="#d4a017" />
      </View>
      <View style={styles.produtoInfoContainer}>
        <Image source={{ uri: item.imagem }} style={styles.produtoImagem} />
        <View style={styles.produtoTextos}>
          <Text style={styles.produtoNome}>{item.nome}</Text>
          <Text style={styles.produtoPreco}>Preço: R$ {item.preco}</Text>
        </View>
        <TouchableOpacity style={styles.botaoAdicionar}>
          <Text style={styles.textoBotaoAdicionar}>ADICIONAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundOverlay}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          {/* Logo atualizada apontando para assets */}
          <Image 
            source={require('../../assets/images/Ellipse-1.png')} 
            style={styles.logo} 
          />
          <Text style={styles.titulo}>BEBIDAS</Text>
        </View>

        {/* Barra de Pesquisa */}
        <View style={styles.buscaContainer}>
          <Ionicons name="search" size={20} color="#000" style={styles.iconeBusca} />
          <TextInput
            style={styles.inputBusca}
            placeholder="Pesquise aqui..."
            placeholderTextColor="#666"
            value={pesquisa}
            onChangeText={setPesquisa}
          />
          <Ionicons name="mic-outline" size={20} color="#000" style={styles.iconeMic} />
        </View>

        {/* Categorias */}
        <View style={styles.categoriasContainer}>
          {CATEGORIAS.map((cat) => (
            <TouchableOpacity key={cat} onPress={() => setCategoriaAtiva(cat)}>
              <Text style={[
                styles.textoCategoria, 
                categoriaAtiva === cat && styles.textoCategoriaAtiva
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Linha separadora */}
        <View style={styles.separador} />

        {/* Lista de Produtos */}
        <FlatList
          data={PRODUTOS}
          keyExtractor={item => item.id}
          renderItem={renderProduto}
          contentContainerStyle={styles.listaProdutos}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3a2318', 
  },
  backgroundOverlay: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 140, // Ajuste o tamanho conforme necessário
    height: 140,
    resizeMode: 'contain', // Garante que a imagem não fique distorcida
    marginBottom: 10,
  },
  titulo: {
    color: '#d4a017',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    marginBottom: 15,
  },
  iconeBusca: {
    marginRight: 10,
  },
  inputBusca: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  iconeMic: {
    marginLeft: 10,
  },
  categoriasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  textoCategoria: {
    color: '#a08b7d',
    fontSize: 16,
    fontWeight: '600',
  },
  textoCategoriaAtiva: {
    color: '#d4a017',
  },
  separador: {
    height: 1,
    backgroundColor: '#fff',
    opacity: 0.3,
    marginBottom: 15,
  },
  listaProdutos: {
    paddingBottom: 20,
  },
  cardProduto: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  lixeiraContainer: {
    marginRight: 10,
  },
  produtoInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    paddingRight: 15,
  },
  produtoImagem: {
    width: 30,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  produtoTextos: {
    flex: 1,
  },
  produtoNome: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  produtoPreco: {
    fontSize: 10,
    color: '#000',
    marginTop: 2,
  },
  botaoAdicionar: {
    backgroundColor: '#b34700',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  textoBotaoAdicionar: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});