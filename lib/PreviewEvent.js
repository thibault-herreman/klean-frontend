import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { colors } from "./colors";
import { windowDimensions } from "./windowDimensions";
import Badges from './Badges';

function PreviewEvent(props) {

    const styles = StyleSheet.create({
        previewEvent: {
            display: props.visible ? 'flex' : 'none',
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
            flexDirection: "row",
            display: 'flex',
            backgroundColor: colors.white,
        },
        ctPreviewEventTxt: {
            padding: 15,
            width: '65%'
        },
        ctBadges: {
            flexDirection: "row",
            marginVertical: 10,
            flexWrap: "wrap"
        },
        ctOrga: {
            width: '35%',
            alignItems: "center",
            paddingTop: 70
        },
        imgPreviewEvent: {
            width: 80,
            height: 80,
            borderRadius: 50,
            borderColor: colors.white,
            borderWidth: 2,
            position: 'absolute',
            top: -15
        }
    });

    let nameOrga = '';
    if(props.nameOrga.length > 10) {
        nameOrga = `${props.nameOrga.substr(0, 10)}...`;
    } else {
        nameOrga = props.nameOrga;
    }

    let titlePreviewEvent = '';
    if(props.title.length > 30) {
        titlePreviewEvent = `${props.title.substr(0, 30)}...`;
    } else {
        titlePreviewEvent = props.title;
    }

    let descPreviewEvent = '';
    if(props.desc.length > 60) {
        descPreviewEvent = `${props.desc.substr(0, 60)}...`;
    } else {
        descPreviewEvent = props.desc;
    }

    return (
        <Pressable 
            style={styles.previewEvent}
            onPress={props.onPress}
        >
            <Text style={styles.previewEventTitle}>
                {titlePreviewEvent}
            </Text>
            <View style={styles.ctPreviewEvent}>
                <View style={styles.ctPreviewEventTxt}>
                    <Text style={styles.previewEventDesc}>
                        {descPreviewEvent}
                    </Text>
                    <View style={styles.ctBadges}>
                        <Badges 
                            type="green"
                            text="Gants"
                            margeR={true}
                        />
                        <Badges 
                            type="green"
                            text="Sac poubelles"
                            margeR={true}
                        />
                        <Badges 
                            type="green"
                            text="Crème solaire"
                            margeR={true}
                        />
                        <Badges 
                            type="green"
                            text="Crème solaire"
                        />
                    </View>
                </View>
                <View style={styles.ctOrga}>
                    <Image
                        source={require('../assets/imagesKlean/Organisator.jpg')}
                        style={styles.imgPreviewEvent}
                    />
                    <Text>{nameOrga}</Text>
                    <Badges type="orange" />
                </View>
            </View>
        </Pressable>
    )
}

export default PreviewEvent;