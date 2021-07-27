import React from "react";
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { colors } from "./colors";
import { typography } from "./typography";

//<NewsCards data={data} />

function NewsCards(props) {

    /*let DATA = [
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
            newTitle: "Marche pour le climatdjdjdjdjdjdjddjdjdjddj",
            newsStartingDate: Date.now(),
            newsEndingDate: Date.now(),
            newsDescription: "Une marche pour défendre l'environnement parce que c'est cool alors viendez parce que ce sera trop génial",
            newsImage: "",
            newsCoordinates: { longitude: 40.129283, latitude: 2.837364, },
            newsLike: 3,
        }]*/


    const renderItem = ({ item, index }) => {

        let date = new Date (item.newsStartingDate);
        
        let clearDay = date.getDate();
        let clearMonth = date.getMonth();
        let clearFullYear = date.getFullYear();

        console.log(clearDay);
        console.log(clearMonth);
        console.log(typeof clearDay);
        console.log(typeof clearMonth);

        let clearDate = `${clearDay < 10 ? '0'+clearDay : clearDay} / ${clearMonth < 10 ? '0'+clearMonth : clearMonth} / ${clearFullYear} `

        return (
            <View style={styles.card}>
                <View style ={styles.image}/>
                <View style = {styles.body}>
                    <Text style={styles.title}>{item.newTitle.length > 21 ? item.newTitle.substring(0, 21) + "..." : item.newTitle}</Text>
                    <Text style={styles.text}>{clearDate.length > 21 ? clearDate.substring(0, 21) + "..." : clearDate}</Text>
                </View>
            </View>
        )
    }

    const styles = StyleSheet.create({
        flatlist: {
            marginLeft: 21
        },
        card: {
            width: 171,
            height: 170,
            marginRight: 13,
            borderWidth: 1,
            borderColor: colors.grey,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5
        },
        image: {
            backgroundColor: colors.grey,
            width: 170,
            height: 114,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: colors.grey
        },
        body: {
            paddingLeft: 7,
            paddingVertical: 5
        },
        title: {
            fontSize: typography.h3.fontSize,
            fontFamily: typography.h3.fontFamily,
            color: colors.secondary,
            marginBottom: 5
        },
        text: {
            fontSize: typography.body.fontSize,
            fontFamily: typography.body.fontFamily,
            color: "black",
            marginBottom: 5
        }

    });


    return (
        <FlatList
            style={styles.container}
            data={props.data}
            renderItem={renderItem}
            horizontal={true}
            style={styles.flatlist}
        />
    )
}



export default NewsCards;