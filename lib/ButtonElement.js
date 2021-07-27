import React from "react";
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
<<<<<<< HEAD
import { colors } from '../lib/colors';
=======
import {colors} from '../lib/colors';
import { windowDimensions } from "./windowDimensions";
>>>>>>> 3a2da437f37303a9698ea27f0a6c3088f62e2a62

// <ButtonElement 
//     typeButton='middleSecondary'
//     text='Participer'
//     onPress={fctTest}
// />

function ButtonElement(props) {

  const styles = StyleSheet.create({
    middleSecondary: {
      backgroundColor: colors.secondary,
      width: 154,
      height: 33,
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    middleSecondaryTxt: {
      color: colors.white,
      fontSize: 14,
      fontFamily: 'Lato_400Regular'
    },
    go: {
      backgroundColor: props.disabled ? colors.grey : colors.secondary,
      width: 67,
      height: 24,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    goPassword: {
      backgroundColor: props.disabled ? colors.grey : colors.secondary,
      height: 24,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 7,
      marginVertical: 7
    },
    goTxt: {
      color: colors.white,
      fontSize: 12,
      fontFamily: 'Lato_400Regular'
    },
    back: {
      backgroundColor: colors.secondary,
      width: 30,
      height: 30,
      borderRadius: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    ctTxtChat: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: props.disabled ? colors.grey : colors.secondary,
      width: 45,
      height: 24,
      borderRadius: 10
    },
    chatTxt: {
      color: colors.white,
      fontSize: 12,
      fontFamily: 'Lato_400Regular'
    },
    fullFine: {
      backgroundColor: colors.secondary,
      width: windowDimensions.width,
      height: windowDimensions.height * 0.07,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fullFineTxt: {
      color: colors.white,
      fontSize: 18,
      fontFamily: 'Lato_400Regular'
    },
    middleFine: {
      backgroundColor: props.outline ? colors.white : colors.secondary,
      width: '48%',
      marginRight: '1%',
      height: 28,
      borderColor: colors.secondary,
      borderWidth: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'

    },
    middleFineTxt: {
      color: props.outline ? 'black' : colors.white,
      fontSize: 14,
      fontFamily: 'Lato_400Regular'
    },
    fullFat: {
      backgroundColor: props.backgroundColor,
      width: '100%',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    fullFatTxt: {
      color: colors.white,
      fontSize: 18,
      fontFamily: 'Lato_400Regular',
    },
    geoloc: {
      position: "absolute",
      zIndex: 10,
      right: "10%",
      bottom: "10%",
      backgroundColor: colors.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      elevation: 4
    },
    info: {
      width: 20,
      height: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50
    }
  });

  if (props.typeButton === 'back') {
    return (
      <Pressable
        style={styles.back}
        onPress={props.onPress}
      >
        <AntDesign name='arrowleft' size={12} color={colors.white} />
      </Pressable>
    );
  } else if (props.typeButton === 'middleSecondary') {
    return (
      <Pressable
        style={styles.middleSecondary}
        onPress={props.onPress}
      >
        <Text
          style={styles.middleSecondaryTxt}
        >
          {props.text}
        </Text>
      </Pressable>
    );
  } else if (props.typeButton === 'go' && !props.disabled) {
    return (
      <Pressable
        style={styles.go}
        onPress={props.onPress}
      >
        <Text
          style={styles.goTxt}
        >
        S'y rendre
        </Text>
      </Pressable>
    );
  } else if (props.typeButton === 'go' && props.disabled) {
    return (
      <View
        style={styles.go}
        onPress={props.onPress}
      >
        <Text
          style={styles.goTxt}
        >
          S'y rendre
        </Text>
      </View>
    );
  } else if (props.typeButton === 'chat' && !props.disabled) {
    return (
      <Pressable
        style={styles.flex}
        onPress={props.onPress}
      >
        <Ionicons name='chatbubble-ellipses-outline' size={25} color={colors.secondary} />
        <View style={styles.ctTxtChat}>
          <Text style={styles.chatTxt}>
            Chat
          </Text>
        </View>
      </Pressable>
    );
  } else if (props.typeButton === 'chat' && props.disabled) {
    return (
      <View
        style={styles.flex}
        onPress={props.onPress}
      >
        <Ionicons name='chatbubble-ellipses-outline' size={25} color={colors.grey} />
        <View style={styles.ctTxtChat}>
          <Text style={styles.chatTxt}>
            Chat
          </Text>
        </View>
      </View>
    );
  } else if (props.typeButton === 'fullFine') {
    return (
      <Pressable
        style={styles.fullFine}
        onPress={props.onPress}
      >
        <Text
          style={styles.fullFineTxt}
        >
          {props.text}
        </Text>
      </Pressable>
    );
  } else if (props.typeButton === 'middleFine') {
    return (
      <Pressable
        style={styles.middleFine}
        onPress={props.onPress}
      >
        <Text
          style={styles.middleFineTxt}
        >
          {props.text}
        </Text>
      </Pressable>
    );
  } else if (props.typeButton === 'fullFat') {
    return (
      <Pressable
        style={styles.fullFat}
        onPress={props.onPress}
      >
        <Text
          style={styles.fullFatTxt}
        >
          {props.text}
        </Text>
      </Pressable>
    );
  } else if (props.typeButton === 'geoloc') {
    return (
      <Pressable
        style={styles.geoloc}
        onPress={props.onPress}
      >
        <MaterialIcons name='assistant-navigation' size={50} color={colors.secondary} />
      </Pressable>
    );
  } else if (props.typeButton === 'info') {
    return (
      <Pressable
        style={styles.info}
        onPress={props.onPress}
      >
        <MaterialIcons name='info-outline' size={20} color={colors.primary} />
      </Pressable>
    );
  } else if (props.typeButton === 'logout') {
    return (
      <Pressable
        onPress={props.onPress}
      >
        <AntDesign name='logout' size={25} color='black' />
      </Pressable>
    );
  } else if (props.typeButton === 'password') {
    return (
      <View
        style={styles.goPassword}
        onPress={props.onPress}
      >
        <Text
          style={styles.goTxt}
        >
          {props.text}
        </Text>
      </View>
    );
  } else {
    return (
      <View></View>
    );
  }

}

export default ButtonElement;