import React from "react";
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import {colors} from '../lib/colors';

function ButtonElement(props) {

  const styles = StyleSheet.create({
    middleSecondary:{
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
      fontWeight: '500'
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
    goTxt: {
      color: colors.white,
      fontSize: 12
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
      fontSize: 12
    },
    fullFine: {
      backgroundColor: colors.secondary,
      width: '100%',
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    fullFineTxt: {
      color: colors.white,
      fontSize: 18,
      fontWeight: '500'
    },
  });

  if (props.typeButton === 'back') {
    return (
      <Pressable 
        style={styles.back}
        onPress={ props.onPress }
      >
        <AntDesign name='arrowleft' size={12} color={colors.white} />
      </Pressable>
    );
  } else if (props.typeButton === 'middleSecondary' ) {
    return (
      <Pressable 
        style={styles.middleSecondary}
        onPress={ props.onPress }
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
        onPress={ props.onPress }
      >
        <Text
          style={styles.goTxt}
        >
          {props.text}
        </Text>
      </Pressable>
    );
  } else if (props.typeButton === 'go' && props.disabled) {
    return (
      <View 
        style={styles.go}
        onPress={ props.onPress }
      >
        <Text
          style={styles.goTxt}
        >
          {props.text}
        </Text>
      </View>
    );
  } else if (props.typeButton === 'chat' && !props.disabled) {
    return (
      <Pressable 
        style={styles.flex}
        onPress={ props.onPress }
      >
        <Ionicons name='chatbubble-ellipses-outline' size={25} color={colors.secondary} />
        <View style={styles.ctTxtChat}>
          <Text style={styles.chatTxt}>
            {props.text}
          </Text>
        </View>
      </Pressable>
    );
  } else if (props.typeButton === 'chat' && props.disabled) {
    return (
      <View 
        style={styles.flex}
        onPress={ props.onPress }
      >
        <Ionicons name='chatbubble-ellipses-outline' size={25} color={colors.grey} />
        <View style={styles.ctTxtChat}>
          <Text style={styles.chatTxt}>
            {props.text}
          </Text>
        </View>
      </View>
    );
  } else if (props.typeButton === 'fullFine') {
    return (
      <Pressable 
        style={styles.fullFine}
        onPress={ props.onPress }
      >
        <Text
          style={styles.fullFineTxt}
        >
          {props.text}
        </Text>
      </Pressable>
    );
  } else {
    return (
      <View></View>
    );
  }
    
} 

export default ButtonElement;