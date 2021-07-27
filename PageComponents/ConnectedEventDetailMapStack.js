import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';

import {Badges} from "../lib/badges.js";
import ScreenTitles from '../lib/ScreenTitles.js';

function ConnectedEventDetailMapStack(props) {

    return (
        // <View style={styles.container}>
        //     <Text>ConnectedEventDetail-MapStack</Text>
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


        <View style={styles.container}>

            <View>
                <Image ></Image>
            </View>

            <View>
                <Text>Nettoyage de la plage de Santa Giulia</Text>
                <Text>Corse du Sud</Text>
                <Text>Début : Samedi 8 août 2021 à 11h30</Text>
                <Text>Fin : Dimanche 9 août 2021 à 12h30</Text>
            </View>

            <View>
                <Text>Description</Text>
                <Text>Lorem ipsum Lorem ipsumLorem</Text>
            </View>

            <View style={{alignItems: "center"}}>
                <Badges type="green"/> 
                <Badges type="orange"/>
            </View>

            <View>
                <ScreenTitles titleType="secondary" 
                title={"Participants"}/>

            </View>

        </View>
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
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedEventDetailMapStack);