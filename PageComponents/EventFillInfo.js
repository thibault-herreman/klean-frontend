import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../lib/colors";
import { windowDimensions } from "../lib/windowDimensions";
import { typography, Typography } from "../lib/typography";
import ButtonElement from "../lib/ButtonElement";
import InputElement from "../lib/InputElement";
import EventGuide from "../lib/EventGuide";

function EventFillInfo(props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainView}>
        <View style={styles.topBanner}>
          <View style={styles.backButton}>
            <ButtonElement
              typeButton="back"
              onPress={() => props.navigation.navigate("CreateEvent")}
            />
          </View>
          <View style={styles.title}></View>
        </View>

        {/* <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} > */}
        <ScrollView>
          <View style={styles.inputFields}>
            <InputElement placeholder="Titre" type="simpleInput"></InputElement>
            <InputElement
              placeholder="Ville"
              type="simpleInputDisabled"
            ></InputElement>
            <InputElement
              placeholder="Date et heure de début"
              type="simpleInput"
            ></InputElement>
            <InputElement
              placeholder="Date et heure de fin"
              type="simpleInput"
            ></InputElement>
            <InputElement
              placeholder="Description"
              type="multilineInput"
            ></InputElement>
            <InputElement
              placeholder="Matériel 1, matériel 2, matériel 3; ... (respecter la mise en forme)"
              type="multilineInput"
            ></InputElement>
            <View style={styles.guide}>
              <Text style={typography.body}>Guide pour l'organisateur</Text>
              <ButtonElement
                style={styles.infoIcon}
                // onPress={() => setModalVisible(!modalVisible)}
                typeButton="info"
              />
              {/* <EventGuide
                visible={modalVisible}
              ></EventGuide> */}
            </View>
          </View>

          <View style={styles.register}>
            <ButtonElement
              style={styles.registerButton}
              typeButton="middleSecondary"
              text="Organiser"
              onPress={() => props.navigation.navigate("Profil")}
            />
          </View> 
        </ScrollView>
        {/* </KeyboardAvoidingView> */}
      </View>
    </SafeAreaView>
  );

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
  title: {
    justifyContent: "center",
    alignItems: "center",
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
