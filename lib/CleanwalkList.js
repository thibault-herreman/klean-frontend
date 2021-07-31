import React from "react";
import {
  StyleSheet,
  FlatList,
  Pressable,
  Text,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { windowDimensions } from "./windowDimensions";
import { typography } from "../lib/typography";
import changeDateFormat from '../lib/changeDateFormat';
import { connect } from 'react-redux';

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
  
  const goCW = (id) => {
    props.setIdCW(id);
    props.onPress();
  }

  let renderItem = ({ item }) => {
    return (

        <Pressable style={styles.container} onPress={() => goCW(item.id)}>
          <Text style={styles.title}> {item.title.substr(0, 30)}... </Text>
          <Text style={styles.date}> {changeDateFormat(item.date)} </Text>
          <FontAwesome name="chevron-right" size={16} color="#7f8fa6" />
        </Pressable>
    );
  };

  return (
    <FlatList
      data={props.listCWparticipate}
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

function mapDispatchToProps(dispatch) {
  return {
      setIdCW: function (cleanwalkId) {
          dispatch({ type: "setIdCW", cleanwalkId: cleanwalkId });
      }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CleanwalkList);