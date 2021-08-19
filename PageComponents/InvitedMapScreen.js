import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  SafeAreaView,
  Button,
  Pressable,
} from "react-native";
import { connect } from "react-redux";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import ButtonElement from "../lib/ButtonElement";
import SearchBarElement from "../lib/SearchBarElement";
import { colors } from "../lib/colors";
import pinSmall from "../assets/imagesKlean/pinSmall.png";
import PreviewEvent from "./PreviewEvent";
import AutoComplete from "../lib/AutoComplete";
import PROXY from "../proxy";

function InvitedMapScreen(props) {

  // hooks d'état
  const [isVisiblePreview, setIsVisiblePreview] = useState(false);
  const [dateSearch, setDateSearch] = useState(new Date());
  const [adress, setAdress] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 48.866667,
    longitude: 2.333333,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [listPositionCW, setListPositionCW] = useState([]);
  const [previewInfo, setPreviewInfo] = useState(null);

  // géolocalisation
  const geoLoc = async () => {
    location = await Location.getCurrentPositionAsync({});
      setCurrentRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
  };

  useEffect(() => {
    // demande de permissions et lancement géoloc
    async function askPermissions() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        geoLoc();
      }
    }
    askPermissions();
  }, []);

  useEffect(() => {
    // lancement de la fct au chargement du composant
    loadCleanwalk(currentRegion, dateSearch);
  }, [dateSearch]);

  useEffect(() => {
    // recherche des villes/adresses selon ce qui est tapé ds le champ
    async function loadData() {
      let rawResponse = await fetch(PROXY + "/autocomplete-search", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `adress=${adress.replace(" ", "+")}&token=${props.tokenObj.token}`,
      });
      let response = await rawResponse.json();
      setAutoComplete(response.response);
    }
    if (adress.length != null) {
      loadData();
    } else {
    }
  }, [adress]);

  // chargement des cleanwalks en bdd via les coordonnées et la date rentrée
  const loadCleanwalk = async (currentRegion, dateSearch) => {
    let rawResponse = await fetch(PROXY + "/load-pin-on-change-region", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `coordinate=${JSON.stringify(
        currentRegion
      )}&date=${dateSearch}&token=${props.tokenObj.token}`,
    });
    let response = await rawResponse.json();
    setListPositionCW(response.cleanWalkArray);
  };

  // création des markers grâce au résultat de la fonction loadCleanwalk
  const markers = listPositionCW.map((marker, i) => {
    return (
      <Marker
        key={i}
        coordinate={{
          latitude: marker.cleanwalkCoordinates.latitude,
          longitude: marker.cleanwalkCoordinates.longitude,
        }}
        image={pinSmall}
        anchor={{ x: 0.5, y: 1 }}
        centerOffset={{ x: 0.5, y: 1 }}
        // au clic on affiche la preview et on set les infos à afficher de la cleanwalk
        onPress={() => {
          setPreviewInfo(listPositionCW[i]);
          setIsVisiblePreview(!isVisiblePreview);
        }}
      />
    );
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.contentSearchBar}>
        <SearchBarElement
          adress={adress}
          setAdress={setAdress}
          onChangeShowAutoComplete={setShowAutoComplete}
          placeholder="Où ? (adresse)"
        />

        <SearchBarElement
          type="date"
          dateSearch={dateSearch}
          setDateSearch={setDateSearch}
        />
      </View>
      <View>
        {showAutoComplete ? (
          <AutoComplete
            data={autoComplete}
            onPress={setAdress}
            setShowAutoComplete={setShowAutoComplete}
            regionSetter={setCurrentRegion}
          />
        ) : null}
      </View>
      <MapView
        style={styles.container}
        // on force googleMap
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 48.866667,
          longitude: 2.333333,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // renvoyé par la géoloc
        region={currentRegion}
        // lancé qd on bouge sur la map
        onRegionChangeComplete={(newRegion) => {
          setCurrentRegion(newRegion);
          loadCleanwalk(newRegion, dateSearch);
        }}
      >
        {markers}
      </MapView>
      {/* affichage dans la preview des infos récupérées au clic sur le marker */}
      {previewInfo ? (
        <PreviewEvent
          title={previewInfo.cleanwalkTitle}
          desc={previewInfo.cleanwalkDescription}
          toolBadge={previewInfo.toolBadge}
          nameOrga={previewInfo.admin.lastName}
          firstnameOrga={previewInfo.admin.firstName}
          avatar={previewInfo.admin.avatarUrl}
          // enregistre l'id de la cleanwalk ds le store et redirige vers la page détail
          onPress={() => {
            props.setCwIdInvited(previewInfo._id);
            props.navigation.navigate("InvitedEventDetail");
          }}
          visible={isVisiblePreview}
        />
      ) : null}
      <ButtonElement
        typeButton="fullFat"
        backgroundColor={colors.primary}
        text="Se connecter"
        onPress={() => props.navigation.navigate("Login")}
      />
      <ButtonElement typeButton="geoloc" onPress={() => geoLoc()} />
    </SafeAreaView>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    login: function (token) {
      dispatch({ type: "login", token });
    },
    setCwIdInvited: function (id) {
      dispatch({ type: "setCwIdInvited", id });
    },
  };
}

function mapStateToProps(state) {
  return {
    tokenObj: state.tokenObj,
  };
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
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InvitedMapScreen);
