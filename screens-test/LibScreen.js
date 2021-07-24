import React from "react";
import { View } from 'react-native';
import { color } from "react-native-reanimated";
import ButtonElement from '../lib/ButtonElement';
import {colors} from '../lib/colors';

function LibScreen() {

  var fctTest = () => {
    console.log('je test et c cool');
  }

  return (
    <View>
      <ButtonElement 
        text='participer'
        bgColor={colors.secondary}
        color={colors.white}
        onPress={fctTest} 
      />
    </View>
  );
    
}

export default LibScreen;