import React, {Component, ReactNode} from "react";
import {Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, TextInput} from "react-native";

import Participant from "../models/Participant";
import {NavigationStackProp} from "react-navigation-stack";
import HamburgerMenu from "./components/HamburgerMenu";
import AppButton from "./components/AppButton";


interface Props {
    navigation: NavigationStackProp
}

export default class RegistrationForm extends Component<Props, Participant> {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Register',
            headerLeft: <HamburgerMenu navigation={navigation}/>,
        };
    };

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
                    <AppButton
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
        const validationErrors = this.validateForm();
        if (validationErrors.length > 0) {
            Alert.alert(
                'Please Correct The Following Validation Errors',
                validationErrors.join('\n')
            );
        } else {
            Alert.alert('Registration Successful', 'Thanks for your interest');
        }
    };

    validateForm = (): string[] => {
        const {
            name,
            age,
            dob,
            locality,
            guests,
            address
        } = this.state;

        const errors = [];

        if (!name || name.length < 3) {
            errors.push('Name should contain at least three characters');
        }
        if (!age || age < 16 || age > 80) {
            errors.push('You should be at least 16 years old');
        }
        if (!dob) {
            errors.push('Date of birth should be a valid date');
        }
        if (!locality || locality.length < 3) {
            errors.push('You can only bring at most two guests');
        }
        if (!guests || guests < 0 || guests > 2) {
            errors.push('You can only bring at most two guests');
        }
        if (!address || address.length < 3) {
            errors.push('Address should contain at least three characters');
        }

        return errors;
    }
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
