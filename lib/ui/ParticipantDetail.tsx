import React, {Component} from "react";
import {SafeAreaView, StyleSheet, Text} from "react-native";

import Participant from "../models/Participant";
import {NavigationStackProp} from "react-navigation-stack";


interface Props {
    navigation: NavigationStackProp<{ item: Participant }>
}

export default class ParticipantsDetail extends Component<Props> {
    // @ts-ignore
    get item(): Participant {
        return this.props.navigation.getParam('item');
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>{this.item.name}</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
        padding: 16
    }
});
