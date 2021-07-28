import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, View, SafeAreaView, Button, Pressable } from 'react-native';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import ButtonElement from '../lib/ButtonElement';
import SearchBarElement from '../lib/SearchBarElement';
import { colors } from '../lib/colors';
import pinSmall from '../assets/imagesKlean/pinSmall.png';
import PreviewEvent from './PreviewEvent';
import AutoComplete from '../lib/AutoComplete';
import PROXY from '../proxy'


function InvitedMapScreen(props) {

    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    const [isVisiblePreview, setIsVisiblePreview] = useState(false);
    const [date, setDate] = useState(new Date());
    const [adress, setAdress] = useState("")
    const [autoComplete, setAutoComplete] = useState([])

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

    useEffect(() => {
        async function loadData() {
            let rawResponse = await fetch(PROXY + '/autocomplete-search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `adress=${adress.replace(" " , "+")}`
            });
            let response = await rawResponse.json();
            setAutoComplete(response.response)
        };
        loadData();
    }, [adress])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.contentSearchBar}>
                <SearchBarElement adress={adress} setAdress={setAdress} placeholder="Où ? (adresse)" />

                <SearchBarElement
                    type='date'
                    date={date}
                    setDate={setDate}
                />

            </View>
            <View>
                <AutoComplete data={autoComplete} onPress={setAdress} />
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
                    coordinate={{ latitude: position.latitude, longitude: position.longitude }}
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
            <ButtonElement
                typeButton='fullFat'
                backgroundColor={colors.primary}
                text='Se connecter'
                onPress={() => props.navigation.navigate('Login')}
            />
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
            dispatch({ type: 'login', token })
        },
        signOut: function () {
            dispatch({ type: 'signOut' })
        }
    }
}

function mapStateToProps(state) {
    return { tokenObj: state.tokenObj }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',

    },
    contentSearchBar: {
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: colors.primary,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InvitedMapScreen);