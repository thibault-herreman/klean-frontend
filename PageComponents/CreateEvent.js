import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar, View, Text, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import ButtonElement from "../lib/ButtonElement";
import SearchBarElement from "../lib/SearchBarElement";
import { colors } from "../lib/colors";
import pinSmall from "../assets/imagesKlean/pinSmall.png";
import { windowDimensions } from "../lib/windowDimensions";
import { typography } from "../lib/typography";
import PROXY from "../proxy";

function CreateEvent(props) {
  const [currentLatitude, setCurrentLatitude] = useState();
  const [currentLongitude, setCurrentLongitude] = useState(0);

  const [latitudeOnClick, setLatitudeOnClick] = useState(0);
  const [longitudeOnClick, setLongitudeOnClick] = useState(0);

  const [cleanwalk, setCleanwalk] = useState([]);

  // à terminer pour géolocaliser le user au clic sur le picto géoloc
  useEffect(() => {
    async function getLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.watchPositionAsync(
          { distanceInterval: 10 },
          (location) => {
            setCurrentLatitude(location.coords.latitude);
            setCurrentLongitude(location.coords.longitude);
          }
        );
      }
    }
    getLocation();
  }, []);

  let newMarker = cleanwalk.map(function (marker, i) {
    return (
      <Marker
        coordinate={{
          latitude: latitudeOnClick,
          longitude: longitudeOnClick,
        }}
        image={pinSmall}
        draggable
      />
    );
  });

  function addCleanwalk(e) {
    setLatitudeOnClick(e.nativeEvent.coordinate.latitude);
    setLongitudeOnClick(e.nativeEvent.coordinate.longitude);
    setCleanwalk([
      ...cleanwalk,
      { latitude: latitudeOnClick, longitude: longitudeOnClick },
    ]);
    console.log("lat: ", latitudeOnClick, "lon: ", longitudeOnClick);
  }

  // function centerOnUser() {}

  async function continueToForm() {
    let data = await fetch(PROXY + "/get-city-from-coordinates", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `latFromFront=${latitudeOnClick}&lonFromFront=${longitudeOnClick}`,
    });
    let response = await data.json();

    let city = response.response.features[0].properties.city;

    let newData = await fetch(PROXY + "/search-city-only", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `city=${city}`,
    });
    let newResponse = await newData.json();
    console.log("réponse front NEW: ", newResponse);

    props.sendCityInfo({
      cityName: newResponse.newResponse[0].properties.city,
      cityCode: newResponse.newResponse[0].properties.citycode,
      cityCoordinates: newResponse.newResponse[0].geometry.coordinates,
      cityPopulation: newResponse.newResponse[0].properties.population,

      infoFromApi: response.response.features[0].properties,
      cleanwalkCoordinates: { lat: latitudeOnClick, lon: longitudeOnClick },
    });

    props.navigation.navigate("EventFillInfo");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.contentSearchBar}>
        <SearchBarElement placeholder="Où ? (adresse)" />
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
        onLongPress={(e) => addCleanwalk(e)}
      >
        {newMarker}
      </MapView>

      <View style={styles.information}>
        <View>
          <ButtonElement typeButton="geoloc" onPress={() => centerOnUser()} />
        </View>

        <Text style={styles.textInfo}>
          - Saisir une adresse OU {"\n"}- appuyer longuement pour ajouter un
          repère.
        </Text>
        {/*<Text style={styles.textInfo}></Text>*/}
      </View>

      <ButtonElement
        typeButton="fullFine"
        backgroundColor={colors.secondary}
        text="Continuer"
        onPress={() => continueToForm()}
      />
    </SafeAreaView>

    // <View style={styles.container}>
    //     <Text>CreateEvent</Text>
    //     <Text>{`${props.token}`}</Text>
    //     <Button title="login" onPress={() => props.login("monsupertokenchercheenbdd")} />
    //     <Button title="signOut" onPress={() => props.signOut()} />
    //     <Button title="CreateEvent"
    //         onPress={() => props.navigation.navigate('CreateEvent')} />
    //     <Button title="EventFillInfo"
    //         onPress={() => props.navigation.navigate('EventFillInfo')} />
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
    sendCityInfo: function (cityInfo) {
      dispatch({ type: "sendCityInfo", payLoad: cityInfo });
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
    paddingVertical: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    paddingLeft: windowDimensions.width * 0.1,
  },
  textInfo: {
    fontSize: typography.postClInformationText.fontSize,
    fontFamily: typography.postClInformationText.fontFamily,
    color: colors.white,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);

/* <MapView
style={styles.container}
provider={PROVIDER_GOOGLE}
initialRegion={{
  latitude: 48.866667,
  longitude: 2.333333,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}}
></MapView> */

// const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

// useEffect(() => {
//   async function askPermissions() {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status === "granted") {
//       Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
//         setPosition({
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//         });
//       });
//     }
//   }
//   askPermissions();
// }, []);
