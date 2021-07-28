import React from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, Dimensions } from "react-native";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../lib/colors";
import { windowDimensions } from "../lib/windowDimensions";
import { typography, Typography } from "../lib/typography";
import ButtonElement from "../lib/ButtonElement";
import InputElement from "../lib/InputElement";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import ScreenTitles from "../lib/ScreenTitles";
import ChatList from "../lib/ChatList";

function ChatProfilStack(props) {

    return (

        <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainView}>
                <View style={styles.topBanner}>
                    <View style={styles.backButton}>
                        <ButtonElement
                        typeButton="back"
                        onPress={() => props.navigation.navigate("Profil")}
                        />
                    </View>
                    <View style={styles.title}>
                        <Text style={typography.h1}>CHAT</Text>
                    </View>
                </View>

                <View>
                    <ScreenTitles
                        titleType="secondary"
                        title="Discussion groupe"
                    ></ScreenTitles>
                </View>

                <ScrollView style={styles.scrollView}>
                    <View>
                        <ChatList></ChatList>
                    </View>
                </ScrollView>

                <View style={styles.inputField}>
                    <InputElement
                        type="messageInput"
                        placeholder="votre message"
                    ></InputElement>
                </View>

                <ButtonElement
                style={styles.envoyerButton}
                typeButton="fullFine"
                text="Envoyer"
                onPress={() => props.navigation.navigate("ChatMapStack")}
                />
            </View>
        </SafeAreaView>

        // <View style={styles.container}>
        //     <Text>Chat-ProfilStack</Text>
        //     <Text>{`${props.token}`}</Text>
        //     <Button title="login" onPress={() => props.login("monsupertokenchercheenbdd")} />
        //     <Button title="signOut" onPress={() => props.signOut()} />
        //     <Button title="Profil"
        //         onPress={() => props.navigation.navigate('Profil')} />
        //     <Button title="ConnectedEventDetailProfilStack"
        //         onPress={() => props.navigation.navigate('ConnectedEventDetailProfilStack')} />
        //     <Button title="ChatProfilStack"
        //         onPress={() => props.navigation.navigate('ChatProfilStack')} />
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
    safeArea: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
    },
    topBanner: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: windowDimensions.width,
        height: windowDimensions.height * 0.1,
    },
    backButton: {
        position: "absolute",
        left: "10%",
        zIndex: 10,
    },
    title: {
        justifyContent: "center",
        alignItems: "center",
    },
    inputField: {
        marginBottom: windowDimensions.height * 0.02,
        alignItems: "center",
    },
    envoyerButton: {
        
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatProfilStack);