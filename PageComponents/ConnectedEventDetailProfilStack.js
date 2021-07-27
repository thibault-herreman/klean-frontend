import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import Badges from "../lib/Badges.js";
import ScreenTitles from '../lib/ScreenTitles.js';
import ButtonElement from "../lib/ButtonElement";
import Participants from "../lib/Participants";
import {windowDimensions} from '../lib/windowDimensions.js';
import {typography} from '../lib/typography.js';

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
                <ImageBackground style={styles.banner} source={require('../assets/imagesKlean/BannerCleanwalk.jpg')}>
                    <ButtonElement style={styles.backButton} typeButton="back" onPress={() => props.navigation.navigate('Profil')}/>
                    <ButtonElement style={styles.goButton} typeButton="go" />
                </ImageBackground>
            </View>

            <View style={styles.generalInfoCleanwalk}>
                <Text style={typography.h2}>Nettoyage de la plage de Santa Giulia</Text>
                <Text style={typography.bodyLight}>Corse du Sud</Text>
                <Text style={typography.bodyLight}>Début : Samedi 8 août 2021 à 11h30</Text>
                <Text style={typography.bodyLight}>Fin : Dimanche 9 août 2021 à 12h30</Text>
            </View>

            <View style={styles.descriptionCleanwalk}>
                <Text style={typography.h3}>Description</Text>
                <View style={styles.cleanwakDescriptionContainer}>
                    <Text style={typography.bodyLight}>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</Text> 
                </View>
            </View>

            <View style={styles.badges}>
                <Badges type="green" text="crème solaire" margeR={true}/> 
                <Badges type="green" text="gants" margeR={true}/> 
                <Badges type="green" text="sacs poubelle" margeR={true}/> 
                <Badges type="green" text="pince" margeR={true}/> 
            </View>

            <View>
                <ScreenTitles titleType="secondary" 
                title={"Participants"}/>
            </View>

            <View style={styles.participantsContainer}>
                <View style={styles.participantsList}>
                    <Participants />
                </View>

                <View style={styles.chat}>
                    <ButtonElement typeButton="chat" onPress={() => props.navigation.navigate('ChatProfilStack')}/>
                </View>
            </View>

            <View style={styles.confirmButton}>
                <ButtonElement typeButton="middleSecondary" text="Me désinscrire"/>
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
        marginTop: 11,
        marginBottom: 11,
        marginLeft: 18,
        marginRight: 18,
        flexDirection: 'row',
        flexWrap: "wrap",
    },
    participantsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedEventDetailMapStack);