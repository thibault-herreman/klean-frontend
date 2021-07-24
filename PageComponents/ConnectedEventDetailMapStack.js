import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';


function ConnectedEventDetailMapStack(props) {

    return (
        <View style={styles.container}>
            <Text>ConnectedEventDetail-MapStack</Text>
            <Text>{`${props.token}`}</Text>
            <Button title="login" onPress={() => props.login("monsupertokenchercheenbdd")} />
            <Button title="signOut" onPress={() => props.signOut()} />
            <Button title="ConnectedMapScreen"
                onPress={() => props.navigation.navigate('ConnectedMapScreen')} />
            <Button title="ConnectedEventDetail"
                onPress={() => props.navigation.navigate('ConnectedEventDetailMapStack')} />
            <Button title="Chat"
                onPress={() => props.navigation.navigate('ChatMapStack')} />
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
)(ConnectedEventDetailMapStack);