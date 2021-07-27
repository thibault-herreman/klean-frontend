import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { windowDimensions } from "./windowDimensions";

function EventGuide(props) {
  const styles = StyleSheet.create({
    modal: {
      display: props.visible ? "flex" : "none",
      height: windowDimensions.height * 0.7,
      borderRadius: 10,
      backgroundColor: "#000000",
      alignItems: "center",
    },
  });
  return (
    <View style={styles.modal}>
      <Modal
        animationType="slide"
        transparent={true}
        // visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          props.onPress;
          //   setModalVisible(!modalVisible);
        }}
      >
        <View>
          <View>
            <Text>Votre cleanwalk.</Text>
            <Text>
              lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
              ipsumlorem ipsumlorem ipsumlorem ipsum
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default EventGuide;
