import React from "react";
import { StyleSheet, View, FlatList, Text, Image } from "react-native";
import { typography } from "./typography";
import { colors } from "./colors";

function Participants(props) {
    let DATA = [
        { id: "ikujhgcvhbnds", firstName: "John", lastName:"Doe", badgeName: "Trash Terminator" },
        { id: "faezfvzegzerg", firstName: "Mika", lastName:"Doe", badgeName: "Bumble Bin" },
        { id: "lkiuytfcgvhjd", firstName: "Remy", lastName:"Doe", badgeName: "Optimus Klean" },
        { id: "lkiuytfcgfgvb", firstName: "Mallo", lastName:"Doe", badgeName: "Optimus Klean" },
    ];

    let renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <View>
                    <Image style={styles.avatar} source={require('../assets/imagesKlean/Organisator.jpg')}></Image>
                </View>
                <View>
                    <Text style={typography.body}> {item.firstName} {item.lastName}</Text>
                    <Text style={typography.bodyLight}> {item.badgeName} </Text>
                </View>
            </View>
        );
    };

    return (
        <FlatList
        data={DATA}
        renderItem={renderItem}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 18,
        alignItems: 'center',

    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 50,
        borderColor: colors.secondary,
        borderWidth: 2,
        marginRight: 10,
    },
});

export default Participants;
