import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, ActivityIndicator } from "react-native";
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
import PROXY from "../proxy";

function ChatProfilStack(props) {

    let token = props.tokenObj.token
    let cwid = "6103ae3bb8248aa764dcd44a"
    let loadInterval;

    const [messages, setMessages] = useState(null)
    const [messageEnvoie, setMessageEnvoie] = useState()

    useEffect(() => {
        async function loadData() {
            let rawResponse = await fetch(PROXY + `/load-messages/${token}/${cwid}`);
            let response = await rawResponse.json();
            if (response.result) {
                setMessages(response.messages)
            }
        };
        loadInterval = setInterval(loadData, 5000)
        return () => clearInterval(loadInterval);
    }, []);

    const sendMessage = async (message) => {
        let requete = await fetch(PROXY + '/save-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `token=${token}&cwid=${cwid}&message=${JSON.stringify(message)}&date=${JSON.stringify(new Date())}`
          });
        
        setMessageEnvoie("")
    }

    return (

        <SafeAreaView style={styles.safeArea}>

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
                />
            </View>

            {messages ? <ChatList data={messages} /> : (
                <View style={styles.wait}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            )}

            < KeyboardAvoidingView style={styles.messageElements}>
                <View style={styles.input}>
                    <InputElement
                        type="messageInput"
                        placeholder="votre message"
                        value={messageEnvoie}
                        onChangeText={setMessageEnvoie}
                    />
                </View>

                <ButtonElement
                    typeButton="fullFine"
                    text="Envoyer"
                    onPress={() => sendMessage(messageEnvoie)}
                />
            </KeyboardAvoidingView>

        </SafeAreaView >
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
    wait: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center"
    },
    safeArea: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center"
    },
    topBanner: {
        justifyContent: "center",
        alignItems: "center",
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
    messageElements: {
        alignItems: "center"
    },
    input: {
        marginBottom: 15,
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatProfilStack);