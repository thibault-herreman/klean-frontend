import React from "react";
import { Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { colors } from "./colors";
import { windowDimensions } from "./windowDimensions"


// <AutoComplete data={data} onPress={onPress}/>
// ATTENTION : la fonction onPress attend un argument qui est l'index. Dans l'écriture de la fonction, on peut donc l'utiliser.

function AutoComplete(props) {

  /*let DATA = [
    {
      properties: { label: "26 rue jean Maridor" }
    },
    {
      properties: { label: "26 rue jean Maridor" }
    },
    {
      properties: { label: "26 rue jean Maridor" }
    }]*/
    

  const renderItem = ({item, index}) => {
    if (index === 0) {
      return (
        <Pressable style={styles.itemTop} onPress={props.OnPress(index)}>
          <Text style={styles.text}>{item.properties.label}</Text>
        </Pressable>
      )
    } else {
      return (
        <Pressable style={styles.item} onPress={props.OnPress(index)}>
          <Text style={styles.text}>{item.properties.label}</Text>
        </Pressable>
      )
    }
  }

  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  itemTop: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: colors.grey,
    width: 1 * windowDimensions.width,
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
    width: 1 * windowDimensions.width,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 12,
    fontFamily: "Lato_400Regular"
  }
});

export default AutoComplete;