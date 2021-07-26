import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  Text,
  Icon,
} from "react-native";
import { FontAwesome, AntDesign, Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import { windowDimensions } from "./windowDimensions";
import { colors } from "../lib/colors";

let Badges = (props) => {
  if (props.type === "green") {
    return (
      <View style={styles.green}>
        <Text style={styles.text}>Crème solaire</Text>
      </View>
    );
  } else if (props.type === "orange") {
    return (
      <View style={styles.orange}>
        <Text style={styles.text}>organisateur</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  green: {
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 100,
  },
  orange: {
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 100,
  },
  text: {
    fontFamily: "Lato_400Regular",
    fontSize: 12,
    color: colors.white,
  },
});

export { Badges };
