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
import AutoComplete from "../lib/AutoComplete";

function CreateEvent(props) {
  const [region, setRegion] = useState();
  const [newCleanwalk, setNewCleanwalk] = useState(null);

  const [autoComplete, setAutoComplete] = useState([]);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [adress, setAdress] = useState("");

  // à terminer pour géolocaliser le user au clic sur le picto géoloc
  useEffect(() => {
    async function getLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.watchPositionAsync(
          { distanceInterval: 10 },
          (location) => {
            setRegion({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }
        );
      }
    }
    getLocation();
  }, []);

  useEffect(() => {
    async function loadData() {
      let rawResponse = await fetch(PROXY + "/autocomplete-search", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `adress=${adress.replace(" ", "+")}`,
      });
      let response = await rawResponse.json();
      setAutoComplete(response.response);
    }
    if (adress.length != null) {
      loadData();
    } else {
    }
  }, [adress]);

  function setRegionAndCw(item) {
    setRegion(item);
    setNewCleanwalk({ latitude: item.latitude, longitude: item.longitude });
  }

  function addCleanwalk(e) {
    setNewCleanwalk({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
  }

  async function centerOnUser() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      let location = await Location.watchPositionAsync(
        { distanceInterval: 10 },
        (location) => {
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
      );
    }
  }

  async function continueToForm() {
    let data = await fetch(PROXY + "/get-city-from-coordinates", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `latFromFront=${newCleanwalk.latitude}&lonFromFront=${newCleanwalk.longitude}`,
    });
    let response = await data.json();

    let city = response.response.features[0].properties.city;

    let newData = await fetch(PROXY + "/search-city-only", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `city=${city}`,
    });
    let newResponse = await newData.json();

    props.sendCityInfo({
      cityName: newResponse.newResponse[0].properties.city,
      cityCode: newResponse.newResponse[0].properties.citycode,
      cityCoordinates: newResponse.newResponse[0].geometry.coordinates,
      cityPopulation: newResponse.newResponse[0].properties.population,

      infoFromApi: response.response.features[0].properties,
      cleanwalkCoordinates: { lat: newCleanwalk.latitude, lon: newCleanwalk.longitude },
    });

    props.navigation.navigate("EventFillInfo");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.contentSearchBar}>
        <SearchBarElement
          adress={adress}
          setAdress={setAdress}
          onChangeShowAutoComplete={setShowAutoComplete}
          placeholder="Où ? (adresse)"
        />
      </View>
      <View>
        {showAutoComplete ? (
          <AutoComplete
            data={autoComplete}
            onPress={setAdress}
            setShowAutoComplete={setShowAutoComplete}
            regionSetter={setRegionAndCw}
          />
        ) : null}
      </View>
      <MapView
        region={region}
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
        {newCleanwalk ? (
          <Marker
            coordinate={{
              latitude: newCleanwalk.latitude,
              longitude: newCleanwalk.longitude,
            }}
            image={pinSmall}
            draggable
          />
        ) : null}
      </MapView>

      <View style={styles.information}>
        <Text style={styles.textInfo}>
          <ButtonElement typeButton="geoloc" onPress={() => centerOnUser()} />-
          Saisir une adresse OU {"\n"}- appuyer longuement pour ajouter un
          repère.
        </Text>
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
