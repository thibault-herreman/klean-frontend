import React from "react";
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { colors } from "./colors";
import { windowDimensions } from "./windowDimensions"


function AutoComplete(props) {

    let DATA = [
        {
            city: "Paris",
            points: "1500"
        },
        {
            city: "Marseille",
            points: "1200"
        },
        {
            city: "Lyon",
            points: "900"
        }]
    

  const renderItem = ({ item, index }) => {
        return (
            <View style={styles.listItem}>
                <Text>{item.city}</Text>
            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        listItem: {
            
        }
    });


    return (
        <FlatList
            style={styles.container}
            data={DATA}
            renderItem={renderItem}
        />
    )
}



export default AutoComplete;