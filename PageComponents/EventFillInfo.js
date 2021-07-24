import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';


function EventFillInfo(props) {

    return (
        <View style={styles.container}>
            <Text>EventFillInfo</Text>
            <Text>{`${props.token}`}</Text>
            <Button title="login" onPress={() => props.login("monsupertokenchercheenbdd")} />
            <Button title="signOut" onPress={() => props.signOut()} />
            <Button title="CreateEvent"
                onPress={() => props.navigation.navigate('CreateEvent')} />
            <Button title="EventFillInfo"
                onPress={() => props.navigation.navigate('EventFillInfo')} />
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
)(EventFillInfo);