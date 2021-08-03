import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import ScreenTitles from "../lib/ScreenTitles";
import ButtonElement from "../lib/ButtonElement";

import { connect } from "react-redux";
import { colors } from "../lib/colors";
import { typography } from "../lib/typography";
import { windowDimensions } from "../lib/windowDimensions";
import ChangePassword from "../lib/ChangePassword";

import { FontAwesome } from "@expo/vector-icons";
import CleanwalkList from "../lib/CleanwalkList";
import { ScrollView } from "react-native-gesture-handler";
import PROXY from "../proxy";

function Profil(props) {
  const [isCwOnOrganize, setIsCwOnOrganize] = useState(true);
  const [isStatOnPerso, setIsStatOnPerso] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [listCWparticipate, setListCWparticipate] = useState([]);
  const [listCWorganize, setListCWorganize] = useState([]);
  const [infosUser, setInfosUser] = useState("");
  const [badge, setBadge] = useState({
    bumblebin: {
      name: "Bumble Bin",
      img: require("../assets/imagesKlean/Robot1Carre.png"),
    },
    optimusklean: {
      name: "Optimus Klean",
      img: require("../assets/imagesKlean/Robot2Carre.png"),
    },
    trashexterminator: {
      name: "Trash Exterminator",
      img: require("../assets/imagesKlean/Robot3Carre.png"),
    },
  });
  const [statPerso, setStatPerso] = useState(null);
  const [statCity, setStatCity] = useState(null);

  useEffect(() => {
    const loadProfil = async () => {
      let rawResponse = await fetch(
        `${PROXY}/load-profil/${props.tokenObj.token}`
      );
      let response = await rawResponse.json();
      if (response.result) {
        setListCWparticipate(response.infosCWparticipate);
        setListCWorganize(response.infosCWorganize);
        setInfosUser(response.infosUser);
        setStatPerso(response.statPerso);
        setStatCity(response.statCity);
      }
    };
    loadProfil();
  }, []);

  function modal() {
    setModalVisible(false);
  }

  let cwListParticipate;
  if (listCWparticipate.length > 0) {
    cwListParticipate = (
      <View style={styles.list}>
        <CleanwalkList
          onPress={() =>
            props.navigation.navigate("ConnectedEventDetailProfilStack")
          }
          listCW={listCWparticipate}
        />
      </View>
    );
  } else {
    cwListParticipate = (
      <View style={styles.ctTextNoCw}>
        <Text style={styles.textNoCw}>
          Vous ne participez à aucune cleanwalk :(
        </Text>
      </View>
    );
  }

  let cwListOrganize;
  if (listCWorganize.length > 0) {
    cwListOrganize = (
      <View style={styles.list}>
        <CleanwalkList
          onPress={() =>
            props.navigation.navigate("ConnectedEventDetailProfilStack")
          }
          listCW={listCWorganize}
        />
      </View>
    );
  } else {
    cwListOrganize = (
      <View style={styles.ctTextNoCw}>
        <Text style={styles.textNoCw}>
          Vous n'organisez pas encore de cleanwalks
        </Text>
      </View>
    );
  }

  if (
    cwListParticipate === null ||
    cwListOrganize === null ||
    statPerso === null ||
    statCity === null
  ) {
    return (
      <View style={styles.wait}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
          <View style={styles.dull}></View>
          <Text style={styles.mainTitle}> MON PROFIL </Text>
          <View style={styles.logout}>
            <ButtonElement
              typeButton="logout"
              onPress={() => {
                props.signOut();
              }}
            />
          </View>
        </SafeAreaView>
        <ScrollView>
          {isCwOnOrganize ? (
            <>
              <ScreenTitles title="Cleanwalks" titleType="secondary" />
              <View style={styles.switch}>
                <ButtonElement
                  text="J'organise"
                  typeButton="middleFine"
                  outline={false}
                  onPress={() => setIsCwOnOrganize(true)}
                />
                <ButtonElement
                  text="Je participe"
                  typeButton="middleFine"
                  outline={true}
                  onPress={() => setIsCwOnOrganize(false)}
                />
              </View>
              {cwListOrganize}
            </>
          ) : (
            <>
              <ScreenTitles title="Cleanwalks" titleType="secondary" />
              <View style={styles.switch}>
                <ButtonElement
                  text="J'organise"
                  typeButton="middleFine"
                  outline={true}
                  onPress={() => setIsCwOnOrganize(true)}
                />
                <ButtonElement
                  text="Je participe"
                  typeButton="middleFine"
                  outline={false}
                  onPress={() => setIsCwOnOrganize(false)}
                />
              </View>
              {cwListParticipate}
            </>
          )}

          {isStatOnPerso ? (
            <>
              <ScreenTitles title="Statistiques" titleType="secondary" />
              <View style={styles.switch}>
                <ButtonElement
                  text="Personnelles"
                  typeButton="middleFine"
                  outline={false}
                  onPress={() => setIsStatOnPerso(true)}
                />
                <ButtonElement
                  text="Ville"
                  typeButton="middleFine"
                  outline={true}
                  onPress={() => setIsStatOnPerso(false)}
                />
              </View>
              <View style={styles.stat}>
                <Image
                  style={styles.robot}
                  source={
                    statPerso < 20
                      ? badge.bumblebin.img
                      : statPerso < 50
                      ? badge.optimusklean.img
                      : badge.trashexterminator.img
                  }
                />
                <View style={styles.statBody}>
                  <Text style={styles.statBodyTitle}>
                    {statPerso < 20
                      ? badge.bumblebin.name
                      : statPerso < 50
                      ? badge.optimusklean.name
                      : badge.trashexterminator.name}
                  </Text>
                  <Text style={styles.statBodyText}>
                    {statPerso} Cleanwalks réalisées
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <ScreenTitles title="Statistiques" titleType="secondary" />
              <View style={styles.switch}>
                <ButtonElement
                  text="Personnelles"
                  typeButton="middleFine"
                  outline={true}
                  onPress={() => setIsStatOnPerso(true)}
                />
                <ButtonElement
                  text="Ville"
                  typeButton="middleFine"
                  outline={false}
                  onPress={() => setIsStatOnPerso(false)}
                />
              </View>
              <View style={styles.stat}>
                <Image
                  style={styles.robot}
                  source={require("../assets/imagesKlean/CityPicto.png")}
                />
                <View style={styles.statBody}>
                  <Text style={styles.statBodyTitle}>
                    {statCity["city_info"][0].cityName}
                  </Text>
                  <Text style={styles.statBodyText}>
                    {statCity.points} points
                  </Text>
                </View>
              </View>
            </>
          )}

          <ScreenTitles
            title="Informations personnelles"
            titleType="secondary"
          />
          <View style={styles.infoPerso}>
            <View style={styles.avatar}>
              <FontAwesome name="user" size={40} color="white" />
            </View>
            <View style={styles.statBody}>
              <Text style={styles.statBodyText}>{infosUser.firstName}</Text>
              <Text style={styles.statBodyText}>{infosUser.lastName}</Text>
              <Text style={styles.statBodyText}>{infosUser.email}</Text>
              <ButtonElement
                text="Modifier mot de passe"
                typeButton="password"
                onPress={() => setModalVisible(true)}
              />
            </View>
          </View>
          <ChangePassword
            visible={modalVisible}
            close={modal}
          />
        </ScrollView>
      </View>
    );
  }
}

{
  /*<Text>Profil</Text>
            <Button title="login" onPress={() => props.login("monsupertokenchercheenbdd")} />
            <Button title="signOut" onPress={() => props.signOut()} />
            <Button title="Profil"
                onPress={() => props.navigation.navigate('Profil')} />
            <Button title="ConnectedEventDetailProfilStack"
                onPress={() => props.navigation.navigate('ConnectedEventDetailProfilStack')} />
            <Button title="ChatProfilStack"
                onPress={() => props.navigation.navigate('ChatProfilStack')} />*/
}

const styles = StyleSheet.create({
  wait: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dull: {
    paddingLeft: 35,
  },
  logout: {
    paddingRight: 10,
  },
  mainTitle: {
    fontSize: typography.h1.fontSize,
    fontFamily: typography.h1.fontFamily,
    paddingVertical: 10,
    textAlign: "center",
  },
  switch: {
    flexDirection: "row",
    alignSelf: "center",
  },
  list: {
    height: windowDimensions.height * 0.3,
  },
  stat: {
    flexDirection: "row",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  robot: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: colors.grey,
    borderWidth: 1,
  },
  statBody: {
    marginLeft: 15,
  },
  statBodyTitle: {
    fontSize: typography.h2.fontSize,
    fontFamily: typography.h2.fontFamily,
  },
  statBodyText: {
    fontSize: typography.bodyLight.fontSize,
    fontFamily: typography.bodyLight.fontFamily,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: colors.grey,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  infoPerso: {
    flexDirection: "row",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  ctTextNoCw: {
    height: windowDimensions.height * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(Profil);
