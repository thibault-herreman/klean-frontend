import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar, View, Text } from "react-native";
import { connect } from "react-redux";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import ButtonElement from "../lib/ButtonElement";
import SearchBarElement from "../lib/SearchBarElement";
import { colors } from "../lib/colors";
import pinSmall from "../assets/imagesKlean/pinSmall.png";
import { windowDimensions } from "../lib/windowDimensions";
import { typography } from "../lib/typography";

function ConnectedMapScreen(props) {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    async function askPermissions() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            setPosition({ latitude: location.coords.latitude, longitude: location.coords.longitude });
          }
        );
      }
    }
    askPermissions();
  }, []);

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.contentSearchBar}>
        <SearchBarElement placeholder="Où ? (adresse)" />
        <SearchBarElement placeholder="Quand ? (date)" />
      </View>
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 48.866667,
          longitude: 2.333333,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: position.latitude,
            longitude: position.longitude,
          }}
          title="Hello"
          description="I am here"
          image={pinSmall}
          anchor={{ x: 0.5, y: 1 }}
          centerOffs
          et={{ x: 0.5, y: 1 }}
        />
      </MapView>

      <ButtonElement typeButton="geoloc" />
    </SafeAreaView>

    // <View style={styles.container}>
    //     <Text>invitedMapScreen</Text>
    //     <Text>{`${props.token}`}</Text>
    //     <Button title="login" onPress={() => props.login("monsupertokenchercheenbdd")} />
    //     <Button title="signOut" onPress={() => props.signOut()} />
    //     <Button title="InvitedMapScreen"
    //         onPress={() => props.navigation.navigate('InvitedMapScreen')} />
    //     <Button title="InvitedEventDetail"
    //         onPress={() => props.navigation.navigate('InvitedEventDetail')} />
    //     <Button title="Login"
    //         onPress={() => props.navigation.navigate('Login')} />
    //     <Button title="SignUp"
    //         onPress={() => props.navigation.navigate('SignUp')} />
    // </View>
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
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  contentSearchBar: {
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: colors.primary,
    display: "flex",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
  information: {
    height: windowDimensions.height * 0.13,
    backgroundColor: colors.primary,
    justifyContent: "center",
    paddingLeft: windowDimensions.width * 0.1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedMapScreen);
