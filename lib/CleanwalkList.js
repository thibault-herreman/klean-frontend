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
import { typography } from "../lib/typography"

function CleanwalkList(props) {
  let DATA = [
    { id: "faezfvzegzerg", title: "blabla", date: "03/09/2020" },
    { id: "dskvnnb'(436457", title: "totototo", date: "08/01/2021" },
    { id: "dskvnnbfg36457", title: "totototo", date: "08/01/2021" },
    { id: "g;dd,dj", title: "totototo", date: "08/01/2021" },
    { id: "ddhdhjfhj", title: "totototo", date: "08/01/2021" },
    { id: "dndjdlfj,fn", title: "totototo", date: "08/01/2021" },
    { id: "djd;kfnfkdhsdjkdhdkfjfk", title: "totototo", date: "08/01/2021" },
    { id: "sgsjsg", title: "totototo", date: "08/01/2021" },
    { id: "gztjdbsdjs", title: "totototo", date: "08/01/2021" },
    { id: "dskvnnbe2dshdj36457", title: "totototo", date: "08/01/2021" },
    { id: "dskvnnbe24sjsk6457", title: "totototo", date: "08/01/2021" },
    { id: "dskshjziknnbe2436457", title: "totototo", date: "08/01/2021" },
    { id: "dskvndjdkdbe2436457", title: "totototo", date: "08/01/2021" },
  ];

  let renderItem = ({ item }) => {
    return (

        <Pressable style={styles.container} onPress={props.onPress}>
          <Text style={styles.title}> {item.title} </Text>
          <Text style={styles.date}> {item.date} </Text>
          <FontAwesome name="chevron-right" size={16} color="#7f8fa6" />
        </Pressable>
    );
  };

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      keyExtractor={(item) => item.id}
      style={styles.flatList}
    />
  );
}

const styles = StyleSheet.create({
  flatList:{
    marginTop: 10,
  },
  container: {
    backgroundColor: "#F3F3F3",
    width: windowDimensions.width ,
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    color: "#000000",
  },
  date: {
    fontFamily: typography.bodyLight.fontFamily,
    fontSize: typography.bodyLight.fontSize
  },
});

export default CleanwalkList;
