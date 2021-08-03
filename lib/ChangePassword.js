import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import { colors } from "./colors";
import { windowDimensions } from "./windowDimensions";

const changePassword = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <TextInput
                name="holdPass"
                placeholder="ancien mot de passe"
                placeholderTextColor="#95a5a6"
                style={styles.textInput}
                onChangeText={props.onChangeText}
                value={props.value}
              />
              <TextInput
                name="newPass"
                placeholder="nouveau mot de passe"
                placeholderTextColor="#95a5a6"
                style={styles.textInput}
                onChangeText={props.onChangeText}
                value={props.value}
              />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => props.close()}
            >
              <Text style={styles.textStyle}>Sauvegarder</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: colors.secondary,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    height: 40,
    width: windowDimensions.width * 0.8,
    borderRadius: 3,
    backgroundColor: colors.grey,
    paddingLeft: 10,
    justifyContent: "center",
    marginTop: 13,
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default changePassword;
