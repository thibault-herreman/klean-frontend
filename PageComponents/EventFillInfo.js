import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../lib/colors";
import { windowDimensions } from "../lib/windowDimensions";
import { typography } from "../lib/typography";
import ButtonElement from "../lib/ButtonElement";
import InputElement from "../lib/InputElement";
import EventGuide from "../lib/EventGuide";
import PROXY from "../proxy";
import SearchBarElement from "../lib/SearchBarElement";

function EventFillInfo(props) {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [startingDate, setStartingDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [tool, setTool] = useState("");

  const [error, setError] = useState();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setCity(props.cityInfo.cityName);
  }, []);

  function modal() {
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

  var addCW = async () => {
    const dataCW = await fetch(PROXY + "/create-cw", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `title=${title}&city=${JSON.stringify(
        props.cityInfo
      )}&startingDate=${startingDate}&endingDate=${endingDate}&description=${description}&tool=${tool}&token=${props.tokenObj.token}`,
    });

    let body = await dataCW.json();
    setError(body.error);

    if (body.result == true) {
      props.navigation.navigate("Profil");
    }
  };

  let errors = (
    <View>
      <Text>{error}</Text>
    </View>
  );

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
            placeholder="Titre *"
            type="simpleInput"
            name="title"
            setState={changeState}
            value={title}
          />
          <InputElement
            placeholder="Ville *"
            type="simpleInputDisabled"
            name="city"
            setState={changeState}
            value={city}
          />
          <SearchBarElement
            type="date"
            dateSearch={startingDate}
            setDateSearch={setStartingDate}
          />
          <SearchBarElement
            type="time"
            dateSearch={startingDate}
            setDateSearch={setStartingDate}
          />

          <SearchBarElement
            type="date"
            dateSearch={endingDate}
            setDateSearch={setEndingDate}
          />
          <SearchBarElement
            type="time"
            dateSearch={endingDate}
            setDateSearch={setEndingDate}
          />

          <InputElement
            placeholder="Description *"
            type="multilineInput"
            name="description"
            setState={changeState}
            value={description}
          />
          <InputElement
            placeholder="Matériel 1, matériel 2, matériel 3; ... (respecter la mise en forme) *"
            type="multilineInput"
            name="tool"
            setState={changeState}
            value={tool}
          />

          {errors}

          <View style={styles.guide}>
            <Text style={typography.body}>Guide pour l'organisateur</Text>
            <ButtonElement
              style={styles.infoIcon}
              onPress={() => setModalVisible(true)}
              typeButton="info"
            />
            <EventGuide visible={modalVisible} close={modal} />
          </View>
        </View>

        <View style={styles.register}>
          <ButtonElement
            style={styles.registerButton}
            typeButton="middleSecondary"
            text="Organiser"
            onPress={() => {
              addCW();
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
  return { tokenObj: state.tokenObj, cityInfo: state.cityInfo };
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
