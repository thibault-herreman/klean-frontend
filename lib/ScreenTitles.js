import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { colors } from "./colors";
import { windowDimensions } from "./windowDimensions"


function ScreenTitles(props) {

    const styles = StyleSheet.create({
        main: {
            backgroundColor: colors.grey,
            width: windowDimensions.width,
            paddingVertical: 24,
            textAlign: "center",
            fontSize: 18,
            fontFamily: "Lato_700Bold"
        },
        secondary: {
            backgroundColor: colors.primary,
            width: windowDimensions.width,
            paddingVertical: 6,
            textAlign: "center",
            fontSize: 15,
            fontFamily: "Lato_500Regular",
            color: "white",
            marginBottom: 9
        }
    });



    if (props.titleType === "main") {
        return (
            <Text style={styles.main}>
                {props.title}
            </Text>
        )
    } else if (props.titleType === "secondary") {
        return (
            <Text style={styles.secondary}>
                {props.title}
            </Text>
        )
    }
}



export default ScreenTitles;