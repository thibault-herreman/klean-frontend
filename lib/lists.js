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

let CleanWalkList = (props) => {
  let container = {
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
  };
  let title = {
    color: "#273c75",
  };
  let date = {
    fontStyle: "italic",
  };

  let DATA = [{ id: "faezfvzegzerg", title: "blabla" }, { id: "dskvnnbe2436457", title: "totototo" }];

  let renderItem = ({ obj }) => {
    <View style={container}>
      <Text style={title}> nettoyage de la plage </Text>
      <Text style={date}> 08/09/2021 </Text>
      <FontAwesome name="chevron-right" size={16} color="#7f8fa6" />
    </View>;
  };

  console.log("obj", obj)

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export { CleanWalkList };
