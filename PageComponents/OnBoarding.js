import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import SearchBarElement from '../lib/SearchBarElement';
import { connect } from 'react-redux';
import ButtonElement from '../lib/ButtonElement';
import {colors} from '../lib/colors';


function OnBoarding(props) {

    const fctTest = () => {
        console.log('je test et c cool');
    }

    return (
        <View style={styles.container}>
            <Text>OnBoarding</Text>

            <ButtonElement 
                text='Participer'
                propStyles={{
                    color: colors.white,
                    bgColor: colors.secondary,
                    fontSize: 14,
                    fontWeight: 500,
                    width: 154,
                    height: 33,
                    borderRadius: 5
                }}
                onPress={fctTest}
            />

            <ButtonElement 
                propStyles={{
                    color: colors.white,
                    bgColor: colors.secondary,
                    borderRadius: 100,
                    width: 30,
                    height: 30,
                }}
                icon={{
                    type: 'AntDesign',
                    name: 'arrowleft',
                    size: 12
                }}
                onPress={fctTest}
            />

            <Text>{`${props.token}`}</Text>
            <Button title="login" onPress={() => props.login("monsupertokenchercheenbdd")} />
            <Button title="signOut" onPress={() => props.signOut()} />
            <Button title="InvitedMapScreen"
                onPress={() => props.navigation.navigate('InvitedMapScreen')} />
            <Button title="InvitedEventDetail"
                onPress={() => props.navigation.navigate('InvitedEventDetail')} />
            <Button title="Login"
                onPress={() => props.navigation.navigate('Login')} />
            <Button title="SignUp"
                onPress={() => props.navigation.navigate('SignUp')} />
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
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnBoarding);