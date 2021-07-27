import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import ScreenTitles from '../lib/ScreenTitles';
import ButtonElement from '../lib/ButtonElement';

import { connect } from 'react-redux';
import { colors } from '../lib/colors';
import { typography } from '../lib/typography';
import { windowDimensions } from '../lib/windowDimensions';


function Profil(props) {

    return (
        <View style={styles.container}>
            <View style={styles.logout}>
                <ButtonElement
                    typeButton='logout'
                    onPress={() => props.signOut()}
                />
            </View>
            <Text style={styles.mainTitle}> MON PROFIL </Text>
            <ScreenTitles title="Cleanwalks" titleType="secondary" />
        </View>
    );
}

{/*<Text>Profil</Text>
            <Button title="login" onPress={() => props.login("monsupertokenchercheenbdd")} />
            <Button title="signOut" onPress={() => props.signOut()} />
            <Button title="Profil"
                onPress={() => props.navigation.navigate('Profil')} />
            <Button title="ConnectedEventDetailProfilStack"
                onPress={() => props.navigation.navigate('ConnectedEventDetailProfilStack')} />
            <Button title="ChatProfilStack"
                onPress={() => props.navigation.navigate('ChatProfilStack')} />*/}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: StatusBar.currentHeight,
        paddingBottom: 40,
    },
    mainTitle: {
        fontSize: typography.h1.fontSize,
        fontFamily: typography.h1.fontFamily,
        paddingVertical: 10,
        textAlign: "center"
    },
    logout: {
        position: "absolute",
        top: StatusBar.currentHeight + 5,
        left: windowDimensions.width * 0.85

    }
});


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



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profil);