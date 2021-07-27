import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Button,
} from "react-native";
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
import { FlatList, ScrollView } from "react-native-gesture-handler";
import ScreenTitles from "../lib/ScreenTitles";
import ChatList from "../lib/ChatList";

function ChatMapStack(props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainView}>
        <View style={styles.topBanner}>
          <View style={styles.backButton}>
            <ButtonElement
              typeButton="back"
              onPress={() => props.navigation.navigate("ConnectedMapScreen")}
            />
          </View>
          <View style={styles.title}>
            <Text style={typography.h1}>CHAT</Text>
          </View>
        </View>

        <View>
          <ScreenTitles
            titleType="secondary"
            title="Discussion groupe"
          ></ScreenTitles>
        </View>

        <ScrollView style={styles.scrollView}>
          <View>
            <ChatList></ChatList>
          </View>
        </ScrollView>

        <View style={styles.inputField}>
          <InputElement
            type="messageInput"
            placeholder="votre message"
          ></InputElement>
        </View>

        <ButtonElement
          style={styles.envoyerButton}
          typeButton="fullFine"
          text="Envoyer"
          onPress={() => props.navigation.navigate("ChatMapStack")}
        />
      </View>
    </SafeAreaView>
  );

  // <View style={styles.container}>
  //     <Text>Chat-MapStack</Text>
  //     <Text>{`${props.token}`}</Text>
  //     <Button title="login" onPress={() => props.login("monsupertokenchercheenbdd")} />
  //     <Button title="signOut" onPress={() => props.signOut()} />
  //     <Button title="ConnectedMapScreen"
  //         onPress={() => props.navigation.navigate('ConnectedMapScreen')} />
  //     <Button title="ConnectedEventDetail"
  //         onPress={() => props.navigation.navigate('ConnectedEventDetailMapStack')} />
  //     <Button title="Chat"
  //         onPress={() => props.navigation.navigate('ChatMapStack')} />
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
    justifyContent: "center",
    alignItems: "center",
  },
  topBanner: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: windowDimensions.width,
    height: windowDimensions.height * 0.1,
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
  inputField: {
    // justifyContent: "center",
    marginBottom: windowDimensions.height * 0.02,
    alignItems: "center",
    // flex: 1,
  },
  envoyerButton: {
    paddingBottom: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatMapStack);
