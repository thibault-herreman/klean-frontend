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
  } else if (props.icon !==undefined && props.icon.type === 'Entypo') {  
    contentPressable = <Entypo name={props.icon.name} size={props.icon.size} color={props.propStyles.color} />
  } else if (props.icon !==undefined && props.icon.type === 'AntDesign') {  
    contentPressable = <AntDesign name={props.icon.name} size={props.icon.size} color={props.propStyles.color} />
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