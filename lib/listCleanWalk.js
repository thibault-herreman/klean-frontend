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

function CleanWalkList(props) {
  let DATA = [
    { id: "faezfvzegzerg", title: "blabla", date: "03/09/20120" },
    { id: "dskvnnbe2436457", title: "totototo", date: "08/01/2021" },
  ];

  let renderItem = ({ item }) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.title}> {item.title} </Text>
          <Text style={styles.date}> {item.date} </Text>
          <FontAwesome name="chevron-right" size={16} color="#7f8fa6" />
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7f8fa6",
    width: "85%",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    color: "#273c75",
  },
  date: {
    fontStyle: "italic",
  },
});

export { CleanWalkList };
