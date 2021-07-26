import React from "react";
import { TextInput, View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from "./colors";

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
  }
});

export default SearchBarElement;