import React, { useState, useEffect } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../lib/colors";
import { windowDimensions, screenDimensions } from "../lib/windowDimensions";
import { typography, Typography } from "../lib/typography";
import ButtonElement from "../lib/ButtonElement";
import InputElement from "../lib/InputElement";
import LogoKlean from "../assets/imagesKlean/LogoKlean.png";
import PROXY from "../proxy";
import AutoComplete from "../lib/AutoComplete";

function SignUp(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [listErrorSignup, setListErrorSignup] = useState([]);

  const [autoComplete, setAutoComplete] = useState([]);
  const [showAutoComplete, setShowAutoComplete] = useState(true);

  const [cityInfo, setCityInfo] = useState({});

  useEffect(() => {
    async function loadData() {
      let rawResponse = await fetch(PROXY + "/autocomplete-search-city-only", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `city=${city.replace(" ", "+")}`,
      });
      let response = await rawResponse.json();
      setAutoComplete(response.newResponse);
    }
    if (city.length > 1) {
      loadData();
    } else {
    }
  }, [city]);

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
    } else if (name == "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  async function register() {
    let bodyWithoutID = `firstNameFromFront=${firstName}&lastNameFromFront=${lastName}&emailFromFront=${email}&cityFromFront=${city}&passwordFromFront=${password}&cityInfo=${JSON.stringify(
      cityInfo
    )}`;
    let bodyWithId = `firstNameFromFront=${firstName}&lastNameFromFront=${lastName}&emailFromFront=${email}&cityFromFront=${city}&passwordFromFront=${password}&cityInfo=${JSON.stringify(
      cityInfo
    )}&cleanwalkIdFromFront=${props.cwIdInvited}`;
    let finalBody;

    if (props.cwIdInvited == null) {
      finalBody = bodyWithoutID;
    }
    if (props.cwIdInvited != null) {
      finalBody = bodyWithId;
    }

    if (password === confirmPassword) {
    let data = await fetch(PROXY + "/users/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: finalBody,
    });

    let body = await data.json();
    if (body.result == true) {
      setUserExists(true);
      props.login(body.token);
    } else {
      setListErrorSignup(body.error);
    }
    }
    else if (password !== confirmPassword) {
      setListErrorSignup(["Les deux mots de passe ne sont pas identiques."])
    }
  }

  let errorsRegister = listErrorSignup.map((error, i) => {
    return <Text key={`error${i}`}>{error}</Text>;
  });

  function backArrow() {
    props.navigation.navigate("InvitedEventDetail");
  }

  let button;
  if (props.cwIdInvited == null) {
    button = (
      <ButtonElement
        style={styles.registerButton}
        typeButton="middleSecondary"
        text="M'inscrire"
        onPress={() => register()}
      />
    );
  }
  if (props.cwIdInvited) {
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
      <View style={styles.mainView}>
        <View style={styles.topBanner}>
          <View style={styles.backButton}>
            <ButtonElement typeButton="back" onPress={() => backArrow()} />
          </View>
          <View style={styles.title}>
            <Text style={typography.h1}>INSCRIPTION</Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.inputFields}>
            <InputElement
              name="firstName"
              setState={changeState}
              value={firstName}
              placeholder="Prénom *"
              type="simpleInput"
            ></InputElement>
            <InputElement
              name="lastName"
              setState={changeState}
              value={lastName}
              placeholder="Nom *"
              type="simpleInput"
            ></InputElement>
            <InputElement
              name="email"
              setState={changeState}
              value={email}
              placeholder="Email *"
              type="simpleInput"
            ></InputElement>
            <InputElement
              name="city"
              setState={changeState}
              setShowAutoComplete={setShowAutoComplete}
              value={city}
              placeholder="Ville *"
              type="simpleInput"
            ></InputElement>
            {showAutoComplete ? (
              <AutoComplete
                data={autoComplete}
                onPress={setCity}
                setShowAutoComplete={setShowAutoComplete}
                cityInfoSetter={setCityInfo}
              />
            ) : null}

            <InputElement
              name="password"
              setState={changeState}
              placeholder="Password *"
              type="simpleInput"
              secureTextEntry={true}
            ></InputElement>
            <InputElement
              name="confirmPassword"
              setState={changeState}
              placeholder="Confirm password *"
              type="simpleInput"
              secureTextEntry={true}
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

        <View style={styles.logoContainer}>
          <Image source={LogoKlean} style={styles.logo} />
        </View>
      </View>
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
    cwIdInvited: state.cwIdInvited,
    tokenObj: state.tokenObj,
  };
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    height: screenDimensions.height,
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
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    paddingTop: 10,
  },
  logoContainer: {
    position: "absolute",
    bottom: 0,
    width: windowDimensions.width,
    alignItems: "center",
  },
  logo: {
    height: windowDimensions.height * 0.2,
    width: windowDimensions.width * 0.3,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
