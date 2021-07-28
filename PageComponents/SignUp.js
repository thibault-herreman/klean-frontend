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
import PROXY from "../proxy"

function SignUp(props) {

  const [userExists, setUserExists] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");

  const [listErrorSignup, setListErrorSignup] = useState([]);

  async function register() {
    props.login("monsupertokenchercheenbdd");

    let data = await fetch(PROXY + "/users/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `firstName=${firstName}&lastName=${lastName}&email=${email}&city=${city}&password=${password}`,
    });

    let body = await data.json();
    console.log("body", body);
    if (body.result == true){
      // props.login(body.token);
      setUserExists(true);
    } else{
      setListErrorSignup(body.error);
    }
  }

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

            <View style={styles.register}>
              <ButtonElement
                style={styles.registerButton}
                typeButton="middleSecondary"
                text="M'inscrire"
                onPress={() => register()}
              />
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
    paddingBottom: 10,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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
