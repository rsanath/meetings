import React, {Component} from "react";
import {FlatList, SafeAreaView, StyleSheet, TextInput} from "react-native";

import Participant from "../models/Participant";
import ParticipantItem from "./components/ParticipantItem";
import {getParticipants} from "../data/ParticipantRepo";
import {NavigationStackProp} from "react-navigation-stack";


interface Props {
    navigation: NavigationStackProp
}

interface State {
    participants: Participant[],
    offset: number,
}

export default class ParticipantsList extends Component<Props, State> {
    state = {
        participants: [],
        offset: 0
    };

    componentWillMount(): void {
        this.loadData();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TextInput
                    style={styles.searchBar}
                    placeholder='Search'
                    autoCapitalize='none'
                />
                <FlatList<Participant>
                    data={this.state.participants}
                    renderItem={({item}) => <ParticipantItem item={item} onPress={this.openDetails}/>}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={this.loadData}
                />
            </SafeAreaView>
        );
    }

    loadData = async () => {
        const result = await getParticipants(this.state.offset);
        this.setState(state => {
            return {
                participants: [...state.participants, ...result],
                offset: state.offset + 10,
            };
        });
    };

    openDetails = (item: Participant) => {
        this.props.navigation.navigate('Detail', {item});
    };
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
