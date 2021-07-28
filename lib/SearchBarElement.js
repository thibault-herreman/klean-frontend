import React, {useState} from "react";
import { TextInput, View, StyleSheet, Text, Pressable } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { colors } from "./colors";
import { typography } from "./typography";
import DateTimePicker from '@react-native-community/datetimepicker';

  //<SearchBarElement value= {} onChangeText={} placeholder="Search ..."/>

function SearchBarElement(props) {

  //const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [placeHolderDate, setPlaceHolderDate] = useState('Quand ? (date)');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || props.date;
    setShow(Platform.OS === 'ios');
    props.setDate(currentDate);
    const dateFormate = `${props.date.getDate()} / ${props.date.getMonth() + 1} / ${props.date.getFullYear()}`;
    setPlaceHolderDate(dateFormate.toString());
  };
  
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View
      style={styles.inputContainer}>
      {props.type === 'date' ? (
        <>
          <Pressable
            onPress={showDatepicker}
          >
            <Text
              style={styles.text}
            >
              {placeHolderDate}
            </Text>
          </Pressable>
          <Pressable 
            onPress={() => setPlaceHolderDate('Quand ? (date)')}
            style={styles.cross}
          >
            <Entypo name="cross" size={17} color="#989898" />
          </Pressable>
          <FontAwesome name="search" size={17} color="#989898" />

          {show && (
              <DateTimePicker
                  testID="dateTimePicker"
                  value={props.date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
              />
          )}
        </>

      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            value = {props.value}
            onChangeText = {props.onChangeText}
          />
            
          <FontAwesome name="search" size={17} color="#989898" />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 328,
    backgroundColor: colors.grey,
    borderRadius: 3,
    paddingHorizontal: 9,
    paddingVertical: 4,
    marginTop: 10
  },
  input: {
    width: 280,
    fontSize: typography.body.fontSize,
    fontFamily: typography.body.fontFamily,
  },
  text: {
    width: 260,
    fontSize: typography.body.fontSize,
    fontFamily: typography.body.fontFamily,
    paddingVertical: 5,
    color: '#4d4d4d'
  },
  cross: {
    marginHorizontal: 3
  }
});

export default SearchBarElement;