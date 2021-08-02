import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

function OnBoarding(props) {

    return (
        <View style={styles.container}>
            <Text>OnBoarding</Text>
            <Text>{`${props.token}`}</Text>
            
            {/* token avec des participations à des cleanwalks  */}
            <Button title="login" onPress={() => props.login("31Iv7EqAbpLpFoHXHh1J8maZqFeLGGDF")} />
            
            {/* token sans participations à des cleanwalks  */}
            {/* <Button title="login" onPress={() => props.login("OtVPQSFIbGaiPNHsgqMr1B1mSXBY3OEa")} /> */}
            
            {/* token avec des orgas à des cleanwalks  */}
            {/* <Button title="login" onPress={() => props.login("vsnfQC8qERq43EyILeE3QtewFtZRyzz0")} /> */}
            
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