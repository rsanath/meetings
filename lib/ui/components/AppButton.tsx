import React from "react";
import {ButtonProps, TouchableOpacity, Text, StyleSheet} from "react-native";


export default function AppButton(props: ButtonProps) {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.container]}>
            <Text style={styles.title} >{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        paddingVertical: 13,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'flex-end',
        backgroundColor: '#2167ad'
    },
    title: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold'
    }
});
