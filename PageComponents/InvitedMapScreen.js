import React, {useEffect, useState} from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import ButtonElement from '../lib/ButtonElement';
import SearchBarElement from '../lib/SearchBarElement';
import { colors } from '../lib/colors';
import pinSmall from '../assets/imagesKlean/pinSmall.png';
import PreviewEvent from '../lib/PreviewEvent';

function InvitedMapScreen(props) {

    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        async function askPermissions() {
          let { status } = await Location.requestForegroundPermissionsAsync();
          //console.log('status', status);
          if (status === 'granted') {
            Location.watchPositionAsync({ distanceInterval: 20 },
              (location) => {
                //console.log(location);
                setPosition({ latitude: location.coords.latitude, longitude: location.coords.longitude });
              }
            );
          }
        }
        askPermissions();
    
    }, [position]);

    return (
        <>
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
                    coordinate={{ latitude: position.latitude, longitude:  position.longitude }}
                    title="Hello"
                    description="I am here"
                    image={pinSmall}
                    anchor={{ x: 0.5, y: 1 }}
                    centerOffset={{ x: 0.5, y: 1 }}
                />
            </MapView>
            <PreviewEvent 
                title="Nettoyage de rue en bas de chez moi à Paris près de Wagram"
                desc="Je vous propose que l’on nettoye ensemble la rue car des jeunes ont laissé leur poubelle et c'est dangereux pour les enfants"
            />
            <ButtonElement 
                 typeButton='fullFat'
                 backgroundColor={colors.primary}
                 text='Se connecter'
                 onPress={() => props.navigation.navigate('Login')}
            />
        </>

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
        display: 'flex',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InvitedMapScreen);