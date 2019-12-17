import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";

import Participant from "../../models/Participant";


interface Props {
    item: Participant
}

export default function ParticipantItem(props: Props) {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.title}>{props.item.name}</Text>
            <Text style={styles.caption}>{props.item.locality}</Text>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fafafa',
        paddingHorizontal: 10,
        paddingVertical: 13,
        marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: 'space-between',
        borderRadius: 3,
        shadowOffset: {width: 1, height: 1},
        shadowColor: 'rgba(17,17,17,0.15)',
        shadowOpacity: 1,
    },
    title: {
        color: '#151515',
        fontWeight: 'bold',
        fontSize: 16,
        paddingBottom: 5
    },
    caption: {
        color: '#353535',
    }
});
