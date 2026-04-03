import DateTimePicker from "@react-native-community/datetimepicker";
import { Image } from "expo-image";
import { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const formatarData = (data) => {
  if (!data) return "Data de Nascimento";
  return data.toLocaleDateString("pt-BR");
};

const FormFields = ({
  nome,
  setNome,
  email,
  setEmail,
  senha,
  setSenha,
  confirmarSenha,
  setConfirmarSenha,
  dataDeNascimento,
  setDataDeNascimento,
}) => {
  const [mostrarPicker, setMostrarPicker] = useState(false);

  const showDatepicker = () => {
    setMostrarPicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    setMostrarPicker(Platform.OS === "ios");
    if (selectedDate) {
      setDataDeNascimento(selectedDate);
    }
  };

  return (
    <View style={styles.formFields}>
      <View style={styles.rectangleParent}>
        <View style={styles.frameChild} />
        <Image
          source={require("../../assets/images/Field-Items.svg")}
          style={[styles.fieldItemsIcon, { tintColor: "#9d6100" }]}
        />
        <View style={styles.fieldDetails}>
          <TextInput
            style={styles.nomeCompleto}
            placeholder="Nome Completo"
            placeholderTextColor="rgba(0, 0, 0, 0.63)"
            value={nome}
            onChangeText={setNome}
          />
        </View>
      </View>

      <Pressable
        style={[styles.rectangleParent, styles.groupSpaceBlock]}
        onPress={showDatepicker}
      >
        <View style={styles.frameChild} />
        <Image
          source={require("../../assets/images/calendar.png")}
          style={styles.calendarIcon}
        />
        <View style={styles.fieldDetails}>
          <Text
            style={[
              styles.nomeCompleto,
              !dataDeNascimento && { color: "rgba(0, 0, 0, 0.63)" },
            ]}
          >
            {formatarData(dataDeNascimento)}
          </Text>
        </View>
      </Pressable>

      {mostrarPicker && (
        <DateTimePicker
          value={dataDeNascimento || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
          locale="pt-BR"
        />
      )}

      <View style={[styles.rectangleGroup, styles.groupSpaceBlock]}>
        <View style={styles.frameChild} />
        <Image
          source={require("../../assets/images/Frame.svg")}
          style={[styles.frameIcon, { tintColor: "#9d6100" }]}
        />
        <View style={styles.fieldDetails}>
          <TextInput
            style={styles.nomeCompleto}
            placeholder="E-mail ou telefone"
            placeholderTextColor="rgba(0, 0, 0, 0.63)"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>

      <View style={[styles.rectangleContainer, styles.groupViewLayout]}>
        <View style={[styles.frameInner, styles.groupViewLayout]} />
        <Image
          source={require("../../assets/images/Frame1.svg")}
          style={[styles.frameIcon, { tintColor: "#9d6100" }]}
        />
        <View style={styles.novaSenhaWrapper}>
          <TextInput
            style={styles.nomeCompleto}
            placeholder="Nova Senha"
            placeholderTextColor="rgba(0, 0, 0, 0.63)"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>
      </View>

      <View style={[styles.groupView, styles.groupViewLayout]}>
        <View style={[styles.frameInner, styles.groupViewLayout]} />
        <Image
          source={require("../../assets/images/Frame2.svg")}
          style={[styles.frameIcon, { tintColor: "#9d6100" }]}
        />
        <View style={styles.fieldDetails}>
          <TextInput
            style={styles.nomeCompleto}
            placeholder="Confirmar Senha"
            placeholderTextColor="rgba(0, 0, 0, 0.63)"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangleParent: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    gap: 3,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 46,
    height: 45,
    width: 314,
    alignItems: "center",
  },
  calendarIcon: {
    width: 35,
    height: 35,
    tintColor: "#9d6100",
    zIndex: 1,
  },
  nomeCompleto: {
    width: 236,
    height: 40,
    fontFamily: "Acme",
    fontSize: 20,
    textAlign: "left",
    zIndex: 1,
    padding: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
    color: "#000",
  },
  iconClr: {
    color: "#9d6100",
    zIndex: 1,
  },
  groupSpaceBlock: {
    paddingBottom: 7,
    paddingTop: 5,
    flexDirection: "row",
  },
  groupViewLayout: {
    borderRadius: 49,
    backgroundColor: "#fff",
    height: 45,
    width: 314,
  },
  formFields: {
    height: 277,
    zIndex: null,
    gap: 13,
    width: 314,
  },
  frameChild: {
    display: "none",
    backgroundColor: "#fff",
    borderRadius: 46,
    height: 45,
    width: 314,
  },
  fieldItemsIcon: {
    height: 35,
    width: 35,
    zIndex: 1,
  },
  fieldDetails: {
    paddingTop: 4,
    height: 32,
    width: 233,
  },
  rectangleGroup: {
    paddingHorizontal: 18,
    paddingBottom: 7,
    gap: 3,
    backgroundColor: "#fff",
    borderRadius: 46,
    height: 45,
    width: 314,
    alignItems: "center",
  },
  frameIcon: {
    width: 32,
    height: 32,
    zIndex: 1,
  },
  rectangleContainer: {
    paddingBottom: 8,
    paddingTop: 5,
    borderRadius: 49,
    paddingHorizontal: 18,
    gap: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  frameInner: {
    display: "none",
  },
  novaSenhaWrapper: {
    height: 31,
    paddingTop: 3,
    width: 233,
  },
  groupView: {
    paddingHorizontal: 17,
    gap: 4,
    paddingBottom: 7,
    paddingTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default FormFields;
