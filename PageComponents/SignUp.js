import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Button,
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
import LogoKlean from "../assets/imagesKlean/LogoKlean.png";
import PROXY from "../proxy";

function SignUp(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");

  const [userExists, setUserExists] = useState(false);
  const [listErrorSignup, setListErrorSignup] = useState([]);
  const [listErrorRegister, setListErrorRegister] = useState([]);
  const [listErrorNetwork, setListErrorNetwork] = useState([]);

  let bodyWithoutID = `firstNameFromFront=${firstName}&lastNameFromFront=${lastName}&emailFromFront=${email}&cityFromFront=${city}&passwordFromFront=${password}`;
  let bodyWithId = `firstNameFromFront=${firstName}&lastNameFromFront=${lastName}&emailFromFront=${email}&cityFromFront=${city}&passwordFromFront=${password}&cleanwalkIdFromFront=${props.idCleanwalk}`;
  let finalBody;

  async function register() {
    if(props.idCleanwalk == null){
      finalBody = bodyWithoutID
    }
    if (props.idCleanwalk != null){
      finalBody = bodyWithId
    }
    let data = await fetch(PROXY + "/users/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: finalBody,
    });
    

    let body = await data.json();
    //console.log("body: ", body)
    if (body.result == true) {
      setUserExists(true);
      props.login(body.token);
    } else {
      setListErrorSignup(body.error);
    }
  }

  let errorsRegister = listErrorSignup.map((error, i) => {
    return <Text key={`error${i}`}>{error}</Text>;
  });

  let changeState = (name, value) => {
    if (name == "firstName") {
      setFirstName(value);
    } else if (name == "lastName") {
      setLastName(value);
    } else if (name == "email") {
      setEmail(value);
    } else if (name == "city") {
      setCity(value);
    } else if (name == "password") {
      setPassword(value);
    }
  };

  let button;
  if (props.idCleanwalk == null) {
    button = (
      <ButtonElement
        style={styles.registerButton}
        typeButton="middleSecondary"
        text="M'inscrire"
        onPress={() => register()}
      />
    );
  }
  if (props.idCleanwalk) {
    button = (
      <ButtonElement
        style={styles.registerButton}
        typeButton="middleSecondary"
        text="M'inscrire et rejoindre"
        onPress={() => register()}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.mainView}>
          <View style={styles.topBanner}>
            <View style={styles.backButton}>
              <ButtonElement
                typeButton="back"
                onPress={() => props.navigation.navigate("InvitedMapScreen")}
              />
            </View>
            <View style={styles.title}>
              <Text style={typography.h1}>INSCRIPTION</Text>
            </View>
          </View>

          {/* <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} > */}
          <ScrollView>
            <View style={styles.inputFields}>
              <InputElement
                name="firstName"
                setState={changeState}
                placeholder="Prénom"
                type="simpleInput"
              ></InputElement>
              <InputElement
                name="lastName"
                setState={changeState}
                placeholder="Nom"
                type="simpleInput"
              ></InputElement>
              <InputElement
                name="email"
                setState={changeState}
                placeholder="Email"
                type="simpleInput"
              ></InputElement>
              <InputElement
                name="city"
                setState={changeState}
                placeholder="Ville"
                type="simpleInput"
              ></InputElement>
              <InputElement
                name="password"
                setState={changeState}
                placeholder="Password"
                type="simpleInput"
              ></InputElement>
            </View>
            <View style={styles.error}>{errorsRegister}</View>

            <View style={styles.register}>
              {button}
              <View style={styles.textContainer}>
                <Text style={typography.body}>Vous avez déjà un compte?</Text>
                <Text
                  style={(typography.body, styles.link)}
                  onPress={() => props.navigation.navigate("Login")}
                >
                  Se connecter
                </Text>
              </View>
            </View>
          </ScrollView>
          {/* </KeyboardAvoidingView> */}

          <View style={styles.logoContainer}>
            <Image source={LogoKlean} style={styles.logo} />
          </View>
        </View>
      </ScrollView>
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
  return {
    idCleanwalk: state.participateCleanwalk,
    tokenObj: state.tokenObj,
  };
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
    backgroundColor: colors.grey,
    width: windowDimensions.width,
    height: windowDimensions.height * 0.1,
    marginBottom: "8%",
  },
  backButton: {
    position: "absolute",
    left: "10%",
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
    alignItems: "center",
  },
  registerButton: {
    // paddingBottom: 10,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  error: {
    alignItems: "center",
  },
  link: {
    paddingTop: 10,
  },
  logoContainer: {
    flex: 1,
    width: windowDimensions.width,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    height: windowDimensions.height * 0.2,
    width: windowDimensions.width * 0.3,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
