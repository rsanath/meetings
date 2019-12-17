import React, {useEffect, useState} from "react";
import {FlatList, SafeAreaView, StyleSheet, TextInput} from "react-native";
import ParticipantItem from "./components/ParticipantItem";
import Participant from "../models/Participant";
import {getParticipants} from "../data/ParticipantRepo";


export default function ParticipantsList() {
    const [participants, setParticipants] = useState([]);
    const [offset, setOffset] = useState(0);

    const loadData = async () => {
        const result = await getParticipants(offset);
        setParticipants([...participants, ...result]);
        setOffset(offset + 10);
    };

    useEffect(() => {
        loadData()
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder='Search'
                autoCapitalize='none'
            />
            <FlatList<Participant>
                data={participants}
                renderItem={({item}) => <ParticipantItem item={item}/>}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={loadData}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: '#f4f4f4',
        marginVertical: 10,
        padding: 12,
        margin: 6,
        paddingVertical: 12,
        borderRadius: 6,
        fontWeight: '400',
    },
    container: {
        flex: 1,
        padding: 12,
    }
});
