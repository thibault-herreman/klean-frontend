import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import ScreenTitles from '../lib/ScreenTitles.js';
import ButtonElement from "../lib/ButtonElement";
import Participants from "../lib/Participants";
import BadgesList from '../lib/BadgesList.js';
import {windowDimensions} from '../lib/windowDimensions.js';
import {typography} from '../lib/typography.js';
import { colors } from "../lib/colors.js";
import changeDateFormat from "../lib/changeDateFormat"

import PROXY from "../proxy.js";

function ConnectedEventDetailProfilStack(props) {

    let idCW = "6103ae3bb8248aa764dcd44a";

    const [cleanwalk, setCleanwalk] = useState(null);

    const dataParticipants = (admin, participants) => {
        participants.unshift(admin);

        return participants;
    };

    useEffect(() => {
        async function loadData() {
        const responseCleanwalk = await fetch(PROXY + `/load-cleanwalk/${idCW}`);
        const jsonResponseCleanwalk = await responseCleanwalk.json();

        setCleanwalk(jsonResponseCleanwalk.cleanwalk);
        }
        loadData();
    }, []);

    if (cleanwalk === null) {
        return <View style={{ flex: 1, backgroundColor: colors.white }}></View>;
    } else {

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView>

                <ImageBackground 
                    style={styles.banner} 
                    source={require('../assets/imagesKlean/BannerCleanwalk.jpg')}
                >
                    <ButtonElement 
                    style={styles.backButton} 
                    typeButton="back" 
                    onPress={() => props.navigation.navigate('Profil')}
                    />
                    <ButtonElement 
                    style={styles.goButton} 
                    typeButton="go" 
                    />
                </ImageBackground>

                <View style={styles.generalInfoCleanwalk}>
                    <Text style={typography.h2}>
                        {cleanwalk.cleanwalkTitle}
                    </Text>
                    <Text style={typography.bodyLight}>
                        {cleanwalk.cleanwalkCity.cityName}
                    </Text>
                    <Text style={typography.bodyLight}>
                        Début : {changeDateFormat(cleanwalk.startingDate)}
                    </Text>
                    <Text style={typography.bodyLight}>
                        Fin : {changeDateFormat(cleanwalk.endingDate)}
                    </Text>
                </View>

                <View style={styles.descriptionCleanwalk}>
                    <Text style={typography.h3}>Description</Text>
                    <View style={styles.cleanwakDescriptionContainer}>
                        <Text style={typography.bodyLight}>
                            {cleanwalk.cleanwalkDescription}
                        </Text>
                    </View>
                </View>

                <View style={styles.badges}>
                    <BadgesList data={cleanwalk.toolBadge} />
                </View>

                <View>
                    <ScreenTitles titleType="secondary" title={"Participants"} />
                </View>

                <View style={styles.participantsContainer}>
                    <View style={styles.participantsList}>
                        <Participants data={dataParticipants(cleanwalk.admin, cleanwalk.participantsList)}/>
                    </View>

                    <View style={styles.chat}>
                        <ButtonElement 
                        typeButton="chat" 
                        onPress={() => props.navigation.navigate('ChatProfilStack')}
                        />
                    </View>
                </View>

                <View style={styles.confirmButton}>
                    <ButtonElement 
                    typeButton="middleSecondary" 
                    text="Me désinscrire"
                    onPress={() => props.navigation.navigate('Profil')}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: function (token) {
        dispatch({ type: "login", token });
        },
        signOut: function () {
        dispatch({ type: "signOut" });
        },
        participateCleanwalk: function (cleanwalkId) {
        dispatch({ type: "participate", cleanwalkIdFromButton: cleanwalkId });
        },
    };
}

function mapStateToProps(state) {
    return { tokenObj: state.tokenObj };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    banner: {
        width: windowDimensions.width,
        height: 100,
        marginTop: 29,
        justifyContent: 'space-between',
        paddingLeft: 17,
        paddingRight: 17,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight || 0,
    },
    backButton: {
        position: 'absolute', 
        zIndex: 10,
    },
    goButton: {
        position: 'absolute', 
        zIndex: 10,
    },
    generalInfoCleanwalk: {
        marginTop: 11,
        marginBottom: 11,
        marginLeft: 18,
    },
    descriptionCleanwalk: {
        marginBottom: 11,
        marginLeft: 18,
    },
    cleanwakDescriptionContainer: {
        marginRight: 18,
    },
    badges: {
        marginBottom: 11, 
    },
    participantsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 300,
    },
    participantsList: {
        marginTop: 11,
        marginBottom: 11,
    },
    chat: {
        marginTop: 11,
        marginRight: 18,
    },
    confirmButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 11,
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedEventDetailProfilStack);


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