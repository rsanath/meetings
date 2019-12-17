import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

import Participant from "../../models/Participant";


interface Props {
    item: Participant,
    onPress: (p: Participant) => void
}

export default function ParticipantItem(props: Props) {
    const {item, onPress} = props;
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.caption}>{item.locality}</Text>
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
