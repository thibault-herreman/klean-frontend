import React, { useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView } from "react-native";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../lib/colors";
import { windowDimensions } from "../lib/windowDimensions";
import { typography } from "../lib/typography";
import ButtonElement from "../lib/ButtonElement";
import InputElement from "../lib/InputElement";
import EventGuide from "../lib/EventGuide";
import PROXY from "../proxy";

function EventFillInfo(props) {

  const [title, setTitle] = useState ("");
  const [city, setCity] = useState ("");
  const [startingDate, setStartingDate] = useState ("");
  const [endingDate, setEndingDate] = useState ("");
  const [description, setDescription] = useState ("");
  const [tool, setTool] = useState ([]);

  const [modalVisible, setModalVisible] = useState(false);

  function modal(){
    setModalVisible(false);
  }

  let changeState = (name, value) => {
    if (name == "title") {
      setTitle(value);
    } else if (name == "city") {
      setCity(value);
    } else if (name == "startingDate") {
      setStartingDate(value);
    } else if (name == "endingDate") {
      setEndingDate(value);
    } else if (name == "description") {
      setDescription(value);
    } else if (name == "tool") {
      setTool(value);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>

        <View style={styles.topBanner}>
          <View style={styles.backButton}>
            <ButtonElement
              typeButton="back"
              onPress={() => props.navigation.navigate("CreateEvent")}
            />
          </View>
        </View>

        {/* <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} > */}
        <ScrollView>
          <View style={styles.inputFields}>

            <InputElement 
              placeholder="Titre" 
              type="simpleInput"
              name="title"
              setState={changeState}
              value={title}
              
            />
            <InputElement
              placeholder="Ville"
              type="simpleInputDisabled"
              name="city"
              setState={changeState}
              value={city}
            />
            <InputElement
              placeholder="Date et heure de début"
              type="simpleInput"
              name="startingDate"
              setState={changeState}
              value={startingDate}
            />
            <InputElement
              placeholder="Date et heure de fin"
              type="simpleInput"
              name="endingDate"
              setState={changeState}
              value={endingDate}
            />
            <InputElement
              placeholder="Description"
              type="multilineInput"
              name="description"
              setState={changeState}
              value={description}
            />
            <InputElement
              placeholder="Matériel 1, matériel 2, matériel 3; ... (respecter la mise en forme)"
              type="multilineInput"
              name="tool"
              setState={changeState}
              value={tool}
            />

            <View style={styles.guide}>
              <Text style={typography.body}>Guide pour l'organisateur</Text>
              <ButtonElement
                style={styles.infoIcon}
                onPress={() => setModalVisible(true)}
                typeButton="info"
              />
              <EventGuide visible={modalVisible} close={modal}/>
            </View>

          </View>

          <View style={styles.register}>
            <ButtonElement
              style={styles.registerButton}
              typeButton="middleSecondary"
              text="Organiser"
              onPress={() => {
                submitCW()
                props.navigation.navigate("Profil")
              }}
            />
          </View> 

        </ScrollView>
        {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    login: function (token) {
      dispatch({ type: "login", token });
    },
    signOut: function () {
      dispatch({ type: "signOut" });
    },
  };
}

function mapStateToProps(state) {
  return { tokenObj: state.tokenObj };
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  topBanner: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: windowDimensions.width,
    height: windowDimensions.height * 0.1,
    marginBottom: 11,
  },
  backButton: {
    position: "absolute",
    left: 10,
    zIndex: 10,
  },
  inputFields: {
    justifyContent: "center",
    alignItems: "center",
  },
  register: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: "center",
  },
  guide: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  infoIcon: {
    backgroundColor: "#000000",
    marginHorizontal: 100,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventFillInfo);


  // <View style={styles.container}>
  //     <Text>EventFillInfo</Text>
  //     <Text>{`${props.token}`}</Text>
  //     <Button title="login" onPress={() => props.login("monsupertokenchercheenbdd")} />
  //     <Button title="signOut" onPress={() => props.signOut()} />
  //     <Button title="CreateEvent"
  //         onPress={() => props.navigation.navigate('CreateEvent')} />
  //     <Button title="EventFillInfo"
  //         onPress={() => props.navigation.navigate('EventFillInfo')} />
  // </View>
