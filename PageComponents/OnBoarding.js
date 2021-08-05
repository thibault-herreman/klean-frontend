import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import CarrousselOnboarding from '../lib/CarrousselOnboarding';
import ButtonElement from '../lib/ButtonElement';

function OnBoarding(props) {

    return (
        <View style={styles.container}>
            <CarrousselOnboarding />
            <View style={styles.button}>
                <ButtonElement
                    text='Skip'
                    typeButton='middleSecondary'
                    onPress={() => props.navigation.navigate('InvitedMapScreen')}
                />
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
        alignItems: "center"
    },
    button: {
        marginBottom: 50
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnBoarding);

{/*<Text>OnBoarding</Text>
            <Text>{`${props.token}`}</Text>
            <Button title="login" onPress={() => props.login("gBzHa7pYcI013YM1IMSGnzLqLkgekND4")} />
            <Button title="signOut" onPress={() => props.signOut()} />
            <Button title="InvitedMapScreen"
                onPress={() => props.navigation.navigate('InvitedMapScreen')} />
            <Button title="InvitedEventDetail"
                onPress={() => props.navigation.navigate('InvitedEventDetail')} />
            <Button title="Login"
                onPress={() => props.navigation.navigate('Login')} />
            <Button title="SignUp"
                onPress={() => props.navigation.navigate('SignUp')} />*/}