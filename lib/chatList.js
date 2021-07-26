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

function ChatList(props) {
  let DATA = [
    {
      id: "faezfvzegzerg",
      message:
        "hey ça va? lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsumlorem ipsumlorem ipsum",
      username: "Gougou",
    },
    { id: "dskvnnbe2436457", message: "bien et toi?", username: "Fafa" },
    {
      id: "jbjhcfhcxkjbkvkjvb",
      message: "ouais ça va et hier la pluie du soleil blabla",
      username: "Gougou",
    },
  ];

  let renderItem = ({ item }) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.message}> {item.message} </Text>
          <Text style={styles.username}> {item.username} </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.flatList}
    />
  );
}

const styles = StyleSheet.create({
  flatList:{
    marginTop: 50,
  },
  container: {
    backgroundColor: "#EEEEEE",
    borderRadius: 100,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: "flex-end",
  },
  message: {
    fontFamily: "Lato_300Light",
    color: "#000000",
  },
  username: {
    fontFamily: "Lato_400Regular",
  },
});

export { ChatList };
