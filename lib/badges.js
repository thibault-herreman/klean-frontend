import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  Text,
  Icon,
} from "react-native";
import { colors } from "./colors";

let Badges = (props) => {

  const styles = StyleSheet.create({
    green: {
      padding: 10,
      backgroundColor: colors.primary,
      borderRadius: 100,
      marginBottom: 5,
      marginRight: props.margeR ? 5 : 0,
    },
    orange: {
      padding: 10,
      backgroundColor: colors.secondary,
      borderRadius: 100,
      marginBottom: 5
    },
    text: {
      fontFamily: "Lato_400Regular",
      fontSize: 12,
      color: colors.white,
    },
  });

  if (props.type === "green") {
    return (
      <View style={styles.green}>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    );
  } else if (props.type === "orange") {
    return (
      <View style={styles.orange}>
        <Text style={styles.text}>Organisateur</Text>
      </View>
    );
  }
};

export default Badges;