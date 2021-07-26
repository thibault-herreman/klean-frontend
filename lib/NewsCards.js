import React from "react";
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { colors } from "./colors";
import { windowDimensions } from "./windowDimensions"

function NewsCards(props) {

    let DATA = [
        {
            newTitle: "Marche pour le climat",
            newsStartingDate: Date.now(),
            newsEndingDate: Date.now(),
            newsDescription: "Une marche pour défendre l'environnement parce que c'est cool alors viendez parce que ce sera trop génial",
            newsImage: "",
            newsCoordinates: { longitude: 40.129283, latitude: 2.837364, },
            newsLike: 3,
        },
        {
            newTitle: "Marche pour le climat",
            newsStartingDate: Date.now(),
            newsEndingDate: Date.now(),
            newsDescription: "Une marche pour défendre l'environnement parce que c'est cool alors viendez parce que ce sera trop génial",
            newsImage: "",
            newsCoordinates: { longitude: 40.129283, latitude: 2.837364, },
            newsLike: 3,
        },
        {
            newTitle: "Marche pour le climat",
            newsStartingDate: Date.now(),
            newsEndingDate: Date.now(),
            newsDescription: "Une marche pour défendre l'environnement parce que c'est cool alors viendez parce que ce sera trop génial",
            newsImage: "",
            newsCoordinates: { longitude: 40.129283, latitude: 2.837364, },
            newsLike: 3,
        }]


    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.listItemMyCity}>
                <View></View>
                <View>
                <Text>Title</Text>
                <Text>City</Text>
                <Text>Date</Text>
                </View>
                
            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
    });


    return (
        <FlatList
            style={styles.container}
            data={props.data}
            renderItem={renderItem}
        />
    )
}



export default NewsCards;