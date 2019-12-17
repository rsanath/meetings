import React, {Component, ReactNode} from "react";
import {Button, KeyboardAvoidingView, SafeAreaView, StyleSheet, TextInput} from "react-native";

import Participant from "../models/Participant";
import {NavigationStackProp} from "react-navigation-stack";


interface Props {
    navigation: NavigationStackProp
}

export default class RegistrationForm extends Component<Props, Participant> {
    state = {
        name: null,
        age: null,
        dob: null,
        locality: null,
        guests: null,
        address: null,
    };

    render(): ReactNode {
        return (
            <SafeAreaView>
                <KeyboardAvoidingView style={styles.container} behavior={'position'}>
                    <TextInput
                        style={styles.input}
                        placeholder='Name'
                        autoCapitalize='words'
                        onChangeText={val => this.onChange('name', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Age'
                        keyboardType={'number-pad'}
                        autoCapitalize="none"
                        onChangeText={val => this.onChange('age', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Date of Birth'
                        onChangeText={val => this.onChange('dob', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Locality'
                        autoCapitalize='words'
                        onChangeText={val => this.onChange('locality', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Number of Guests'
                        keyboardType={'number-pad'}
                        autoCapitalize="none"
                        onChangeText={val => this.onChange('guests', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Address'
                        maxLength={50}
                        autoCapitalize="none"
                        onChangeText={val => this.onChange('address', val)}
                    />
                    <Button
                        title='Sign Up'
                        onPress={this.signUp}
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }

    onChange = (key, val) => {
        // @ts-ignore
        this.setState({[key]: val})
    };

    signUp = async () => {
        this.props.navigation.goBack();
        console.log(this.state);
    };
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#f4f4f4',
        marginVertical: 10,
        padding: 12,
        paddingVertical: 12,
        borderRadius: 6,
        fontWeight: '400',
    },
    container: {
        padding: 12,
    }
});
