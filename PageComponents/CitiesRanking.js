import React from 'react';
import { StyleSheet, View, Text, StatusBar, SafeAreaView } from 'react-native';
import ScreenTitles from '../lib/ScreenTitles'
import ListCities from '../lib/ListCities';
import { connect } from 'react-redux';
import { colors } from '../lib/colors';
import { typography } from '../lib/typography';
import { windowDimensions } from '../lib/windowDimensions';


function CitiesRanking(props) {

    let DATA = [
        {
            city: "Paris",
            points: "1500",
            isMyCity: false
        },
        {
            city: "Marseille",
            points: "1200",
            isMyCity: true
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Paris",
            points: "1100",
            isMyCity: false
        },
        {
            city: "Saint mandouille le puy en vezoulay",
            points: "900",
            isMyCity: false
        }]

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text style={styles.mainTitle}> CLASSEMENT DES VILLES </Text>
            </SafeAreaView>
            <ScreenTitles title="Liste des villes" titleType="secondary" />
            <ListCities data={DATA} />
            <ScreenTitles title="Ma ville" titleType="secondary" />
            <View style={styles.listItem}>
                <Text style={styles.ranking}>#2</Text>
                <Text style={styles.city}>Marseille</Text>
                <Text style={styles.points}>1200pts</Text>
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
    listItem: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: colors.grey,
        alignItems: "center",
        width: windowDimensions.width,
        paddingVertical: 9,
        paddingHorizontal: 8,
        marginBottom: 6
    },
    points: {
        marginLeft: "auto",
        textAlign: "right",
        width: windowDimensions.width * 0.25,
        fontSize: typography.bodyLightItalic.fontSize,
        fontFamily: typography.bodyLightItalic.fontFamily,
        color: "black"
    },
    ranking: {
        marginRight: "auto",
        width: windowDimensions.width * 0.25,
        fontSize: typography.body.fontSize,
        fontFamily: typography.body.fontFamily,
        color: "black"
    },
    city: {
        textAlign: "center",
        fontSize: typography.body.fontSize,
        fontFamily: typography.body.fontFamily,
        color: "black"
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CitiesRanking);