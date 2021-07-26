import React from "react";
import { View, StyleSheet, TextInput} from 'react-native';
import { colors } from "./colors";

function InputElement(props) {

    if (props.type === "Truc") {
        return (

            <View style={styles.inputContainer}>
                <TextInput 
                style={{fontFamily: 'Lato_300Light'}}
                onChangeText={props.onChangeText}
                value={props.value}
                placeholder={props.placeholder}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        height: 22, 
        width: 300, 
        borderRadius: 3, 
        backgroundColor: colors.grey, 
        paddingLeft: 10, 
        justifyContent: "center", 
    },
});

export default InputElement;