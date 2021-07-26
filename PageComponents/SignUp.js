import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { connect } from "react-redux";
import { Dimensions } from "react-native";
import { color } from "react-native-elements/dist/helpers";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../lib/colors";
import { windowDimensions } from "../lib/windowDimensions";
import { typography, Typography } from "../lib/typography";
import ButtonElement from "../lib/ButtonElement";
import InputElement from "../lib/InputElement";
import { Colors } from "react-native/Libraries/NewAppScreen";
import LogoKlean from "../assets/imagesKlean/LogoKlean.png";

function SignUp(props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainView}>
        <View style={styles.topBanner}>
          <View style={styles.backButton}>
            <ButtonElement typeButton="back" />
          </View>
          <View style={styles.title}>
            <Text style={typography.h1}>INSCRIPTION</Text>
          </View>
        </View>

        <View style={styles.inputFields}>
          <InputElement placeholder="Prénom" type="simpleInput"></InputElement>
          <InputElement placeholder="Nom" type="simpleInput"></InputElement>
          <InputElement placeholder="Email" type="simpleInput"></InputElement>
          <InputElement
            placeholder="Password"
            type="simpleInput"
          ></InputElement>
          <InputElement placeholder="Ville" type="simpleInput"></InputElement>
        </View>

        <View style={styles.register}>
          <ButtonElement typeButton="middleSecondary" text="M'inscrire" />
          <Text style={typography.body}>Vous avez déjà un compte?</Text>
          <Text style={typography.body}>Se connecter</Text>
        </View>

        <View style={styles.logoContainer}>
          <Image source={LogoKlean} style={styles.logo} />
        </View>

        {/* <Text>SignUp</Text>
            <Text>{`${props.token}`}</Text>
            <Button title="login" onPress={() => props.login("monsupertokenchercheenbdd")} />
            <Button title="signOut" onPress={() => props.signOut()} />
            <Button title="InvitedMapScreen"
                onPress={() => props.navigation.navigate('InvitedMapScreen')} />
            <Button title="InvitedEventDetail"
                onPress={() => props.navigation.navigate('InvitedEventDetail')} />
            <Button title="Login"
                onPress={() => props.navigation.navigate('Login')} />
            <Button title="SignUp"
                onPress={() => props.navigation.navigate('SignUp')} /> */}
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
    marginBottom: "10%",
  },
  backButton: {
    position: "absolute",
    left: "10%",
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
    marginTop: 100,
    alignItems: "center",
  },
  logoContainer: {
    flex: 1,
    width: windowDimensions.width,
    justifyContent:"flex-end",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
    // width: windowDimensions.width * 1,
    // height: windowDimensions.height * 0.4,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
