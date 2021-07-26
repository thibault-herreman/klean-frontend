import React from "react";
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { colors } from "./colors";
import { windowDimensions } from "./windowDimensions"

// <ListCities data={data} />

function ListCities(props) {

    /*let DATA = [
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
            city: "Saint mandouille le puy en vezoulay",
            points: "900",
            isMyCity: false
        }]*/
    

  const renderItem = ({ item, index }) => {
        if (item.isMyCity === true) {
        return (
            <View style={styles.listItemMyCity}>
                <Text style={styles.rankingMyCity}>#{index+1}</Text>
                <Text style={styles.cityMyCity}>{item.city.length > 25 ? item.city.substring(0, 24) + "..." : item.city}</Text>
                <Text style={styles.pointsMyCity}>{item.points}pts</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.listItem}>
                <Text style={styles.ranking}>#{index+1}</Text>
                <Text style={styles.city}>{item.city.length > 25 ? item.city.substring(0, 24) + "..." : item.city}</Text>
                <Text style={styles.points}>{item.points}pts</Text>
            </View>
        )
    }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1
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
        listItemMyCity: {
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: colors.secondary,
            alignItems: "center",
            width: windowDimensions.width,
            paddingVertical: 9,
            paddingHorizontal: 8,
            marginBottom: 6, 
        },
        pointsMyCity: {
            marginLeft: "auto",
            textAlign: "right",
            width: windowDimensions.width * 0.25,
            fontSize: 12,
            fontFamily: "Lato_300Light_Italic",
            color: "white"
        },
        rankingMyCity: {
            marginRight: "auto",
            width: windowDimensions.width * 0.25,
            fontSize: 12,
            fontFamily: "Lato_400Regular",
            color: "white"
        },
        cityMyCity: {
            textAlign: "center",
            fontSize: 12,
            fontFamily: "Lato_400Regular",
            color: "white"
        },
        points: {
            marginLeft: "auto",
            textAlign: "right",
            width: windowDimensions.width * 0.25,
            fontSize: 12,
            fontFamily: "Lato_300Light_Italic",
            color: "black"
        },
        ranking: {
            marginRight: "auto",
            width: windowDimensions.width * 0.25,
            fontSize: 12,
            fontFamily: "Lato_400Regular",
            color: "black"
        },
        city: {
            textAlign: "center",
            fontSize: 12,
            fontFamily: "Lato_400Regular",
            color: "black"
        }
        
    });


    return (
        <FlatList
            style={styles.container}
            data={props.data}
            renderItem={renderItem}
        />
    )
}



export default ListCities;