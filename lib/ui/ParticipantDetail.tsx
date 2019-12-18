import React, {Component} from "react";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";

import Participant from "../models/Participant";
import {NavigationStackProp} from "react-navigation-stack";


interface Props {
    navigation: NavigationStackProp<{ item: Participant }>
}

export default class ParticipantsDetail extends Component<Props> {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Details',
        };
    };

    // @ts-ignore
    get item(): Participant {
        return this.props.navigation.getParam('item');
    }

    render() {
        const item = this.item;
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.subtitle}>{item.locality}</Text>
                    <View style={styles.item}>
                        <Text style={styles.label}>Age</Text>
                        <Text style={styles.value}>{item.age}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>Date of Birth</Text>
                        <Text style={styles.value}>{item.dob}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>Address</Text>
                        <Text style={styles.value}>{item.address}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>Accompanied With</Text>
                        <Text style={styles.value}>{item.guests}</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 12,
    },
    title: {
        fontWeight: '900',
        fontSize: 26,
        color: '#000000',
        textAlign: 'left',
        paddingVertical: 4
    },
    subtitle: {
        fontWeight: '500',
        fontSize: 18,
        color: '#474747',
        textAlign: 'left',
        paddingBottom: 20,
    },
    item: {
        paddingVertical: 6,
        flexDirection: 'row'
    },
    label: {
        flex: 1,
        fontWeight: '600',
        fontSize: 18,
        color: '#3a3a3a'
    },
    value: {
        fontWeight: '500',
        fontSize: 18,
        color: '#474747',
    }
});
