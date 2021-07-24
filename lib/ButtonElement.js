import React from "react";
import { Pressable, Text } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons'; 

function ButtonElement(props) {

  let contentPressable = '';
  //console.log('props.text',props.text);
  if (props.text !== undefined) {
    contentPressable = <Text
      style={{
        color: props.propStyles.color,
        fontSize: props.propStyles.fontSize,
        fontWeight: props.propStyles.fontWeight,
        fontWeight: 'bold'
      }}
    >{props.text}</Text>
  } else if (props.typeIcon !==undefined && props.typeIcon === 'Entypo') {  
    contentPressable = <Entypo name="direction" size={12} color={props.propStyles.color} />
  } else if (props.typeIcon !==undefined && props.typeIcon === 'AntDesign') {  
    contentPressable = <AntDesign name="arrowleft" size={12} color={props.propStyles.color} />
  }

  return (
    <Pressable 
      style={{
        backgroundColor: props.propStyles.bgColor,
        width: props.propStyles.width,
        height: props.propStyles.height,
        borderRadius: props.propStyles.borderRadius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onPress={ props.onPress }
    >
      {contentPressable}
    </Pressable>
  );
    
}

export default ButtonElement;