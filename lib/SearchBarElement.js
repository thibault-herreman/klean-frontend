import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text, Pressable } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { colors } from "./colors";
import { typography } from "./typography";
import DateTimePicker from '@react-native-community/datetimepicker';

//<SearchBarElement adress={adress} setAdress={setAdress} onChangeShowAutoComplete={setShowAutoComplete} placeholder="Où ? (adresse)" />

function SearchBarElement(props) {

  //const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [datePickUse, setDatePickUse] = useState(false);
  const placeHolderDate = 'Quand ? (date)';
  const placeHolderTime = 'Quand ? (Heure)';

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || props.dateSearch;
    setShow(Platform.OS === 'ios');
    props.setDateSearch(currentDate);
    setDatePickUse(true);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || props.dateSearch;
    setShow(Platform.OS === 'ios');
    props.setDateSearch(currentTime);
    setDatePickUse(true);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  if (props.type === 'date') {
    const dateFormate = `${props.dateSearch.getDate()} / ${props.dateSearch.getMonth() + 1} / ${props.dateSearch.getFullYear()}`;
    return (
      <View style={styles.inputContainer}>
        <Pressable
          onPress={showDatepicker}
        >
          <Text
            style={styles.text}
          >
            {!datePickUse ? placeHolderDate : dateFormate}
          </Text>
        </Pressable>
        <Pressable 
          onPress={() => setDatePickUse(false)}
          style={styles.cross}
        >
          <Entypo name="cross" size={17} color="#989898" />
        </Pressable>
        <FontAwesome name="search" size={17} color="#989898" />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={props.dateSearch}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>
    );
  } if (props.type === 'time') {
    const heureFormate = `${props.dateSearch.getHours()} : ${props.dateSearch.getMinutes()}`;
    return (
      <View style={styles.inputContainer}>
        <Pressable
          onPress={showTimepicker}
        >
          <Text
            style={styles.text}
          >
            {!datePickUse ? placeHolderTime : heureFormate}
          </Text>
        </Pressable>
        <Pressable 
          onPress={() => setDatePickUse(false)}
          style={styles.cross}
        >
          <Entypo name="cross" size={17} color="#989898" />
        </Pressable>
        <FontAwesome name="search" size={17} color="#989898" />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={props.dateSearch}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        )}
      </View>
    );
  } else {
    return (
      <View
        style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            value={props.adress}
            onChangeText={(value) => {props.setAdress(value); props.onChangeShowAutoComplete(true)}}
          />
          <Pressable
            onPress={() => props.setAdress("")}
            style={styles.cross}>
            <Entypo name="cross" size={17} color="#989898" />
          </Pressable>
          <FontAwesome name="search" size={17} color="#989898" />
      </View>
    );
  }
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
    width: 260,
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