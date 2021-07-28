import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar, View, SafeAreaView, Button } from "react-native";
import { connect } from "react-redux";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import ButtonElement from "../lib/ButtonElement";
import SearchBarElement from "../lib/SearchBarElement";
import { colors } from "../lib/colors";
import pinSmall from "../assets/imagesKlean/pinSmall.png";
import { windowDimensions } from "../lib/windowDimensions";
import PreviewEvent from './PreviewEvent';
import DateTimePicker from '@react-native-community/datetimepicker';

function ConnectedMapScreen(props) {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [isVisiblePreview, setIsVisiblePreview] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
  };
  
  const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
  };

  const showDatepicker = () => {
      showMode('date');
  };

  const showTimepicker = () => {
      showMode('time');
  };

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
        
          <View>
            <View>
                <Button onPress={showDatepicker} title="Show date picker!" />
            </View>
            <View>
                <Button onPress={showTimepicker} title="Show time picker!" />
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
          </View>

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
        <Marker draggable
            coordinate={{ latitude: position.latitude, longitude:  position.longitude }}
            image={pinSmall}
            anchor={{ x: 0.5, y: 1 }}
            centerOffset={{ x: 0.5, y: 1 }}
            onPress={() => setIsVisiblePreview(!isVisiblePreview)}
        />
      </MapView>
      <PreviewEvent 
            title="Nettoyage de rue en bas de chez moi à Paris près de Wagram"
            desc="Je vous propose que l’on nettoye ensemble la rue car des jeunes ont laissé leur poubelle et c'est dangereux pour les enfants"
            nameOrga="J. Doe"
            onPress={() => props.navigation.navigate('InvitedEventDetail')}
            visible={isVisiblePreview}
        />
      <ButtonElement typeButton="geoloc" />
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
