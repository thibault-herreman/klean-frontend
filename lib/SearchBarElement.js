import React from "react";
import { TextInput, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from "./colors";
import { processFontFamily } from "expo-font";

  //<SearchBarElement placeholder="Search ..."/>

function SearchBarElement(props) {

  return (
    <View
      style={styles.container}>
      <View
        style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={props.placeholder}
          value = {props.value}
          onChangeText = {props.onChangeText}
        />
        <FontAwesome name="search" size={17} color="#989898" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 328,
    backgroundColor: colors.grey,
    borderRadius: 3,
    paddingHorizontal: 9,
    paddingVertical: 4
  },
  input: {
    width: 280,
    fontSize: 12,
    fontFamily: "Lato_400Regular"
  }
});

export default SearchBarElement;