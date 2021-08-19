import React from "react";
import { Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { colors } from "./colors";
import { windowDimensions } from "./windowDimensions"
import { typography } from "../lib/typography"

// <AutoComplete data={autoComplete} onPress={setAdress} setShowAutoComplete={setShowAutoComplete} />
// ATTENTION : la fonction onPress attend un argument qui est l'index. Dans l'écriture de la fonction, on peut donc l'utiliser.

function AutoComplete(props) {

  // on met en forme les données de la flatList
  // et on charge les props envoyées dans les données qu'on passe à la flatList
  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <Pressable style={styles.itemTop} onPress={() => {
          props.onPress(item.properties.label); 
          props.regionSetter ? (props.regionSetter({
            latitude: item.geometry.coordinates[1],
            longitude: item.geometry.coordinates[0],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          })) : null;
          props.cityInfoSetter ? props.cityInfoSetter(item) : null; 
          props.setShowAutoComplete(false);
        }}>
          <Text style={styles.text}>{item.properties.label}</Text>
        </Pressable>
      )
    } else {
      return (
        <Pressable style={styles.item} onPress={() => {
          props.onPress(item.properties.label); 
          props.regionSetter ? (props.regionSetter({
            latitude: item.geometry.coordinates[1],
            longitude: item.geometry.coordinates[0],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          })):null; 
          props.cityInfoSetter ? props.cityInfoSetter(item) : null; 
          props.setShowAutoComplete(false);
        }}>
          <Text style={styles.text}>{item.properties.label}</Text>
        </Pressable>
      )
    }
  }

  return (
    <FlatList
      // on charge les props renvoyées dans la data de la flatList
      data={props.data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}

const styles = StyleSheet.create({
  itemTop: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: colors.grey,
    width: windowDimensions.width,
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftColor: colors.grey,
    borderRightColor: colors.grey,
    borderBottomColor: colors.grey,
    width: windowDimensions.width,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: typography.body.fontSize,
    fontFamily: typography.body.fontFamily
  }
});

export default AutoComplete;