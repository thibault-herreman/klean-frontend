import React from "react";
import { Pressable, Text } from 'react-native';

function ButtonElement(props) {

  return (
    <Pressable 
      style={{
        backgroundColor: props.bgColor,
      }}
      onPress={ props.onPress }
    >
      <Text
        style={{
          color: props.color,
          fontSize: 18
        }}
      >{props.text}</Text>
    </Pressable>
  );
    
}

export default ButtonElement;