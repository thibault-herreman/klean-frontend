import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { colors } from "./colors";
import { windowDimensions } from "./windowDimensions";
import Badges from './Badges';

function PreviewEvent(props) {

    const styles = StyleSheet.create({
        previewEvent: {
            
        },
        previewEventTitle: {
            backgroundColor: colors.secondary,
            width: windowDimensions.width,
            padding: 6,
            fontSize: 14,
            fontFamily: "Lato_700Bold",
            color: "white",
        },
        ctPreviewEvent: {
            backgroundColor: colors.white,
            paddingTop: 15,
            paddingRight: 100,
            paddingBottom: 15,
            paddingLeft: 15,
        }
    });

    return (
        <View style={styles.previewEvent}>
            <Text style={styles.previewEventTitle}>
                {`${props.title.substr(0, 30)}...`}
            </Text>
            <View style={styles.ctPreviewEvent}>
                <Text style={styles.previewEventDesc}>
                    {`${props.desc.substr(0, 60)}...`}
                </Text>
                <Badges type="green" />
            </View>
        </View>
    )
}



export default PreviewEvent;