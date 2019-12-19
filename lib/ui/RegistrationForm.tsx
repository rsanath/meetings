import React, {Component, ReactNode} from "react";
import {ActivityIndicator, Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, TextInput} from "react-native";
import DatePicker from 'react-native-custom-datetimepicker';
import {NavigationStackProp} from "react-navigation-stack";
import HamburgerMenu from "./components/HamburgerMenu";
import AppButton from "./components/AppButton";
import {registerParticipant} from "../data/ParticipantRepo";


interface Props {
    navigation: NavigationStackProp
}

interface State {
    name: string;
    age: number;
    dob: Date;
    locality: string;
    guests: number;
    address: string;
    loading: boolean;
}

export default class RegistrationForm extends Component<Props, State> {
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
        loading: false
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
                    <DatePicker
                        style={styles.input}
                        date={this.state.dob}
                        mode="date"
                        placeholder="Date of Birth"
                        format="YYYY-MM-DD"
                        minDate="1970-01-01"
                        maxDate="2000-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={{
                            btnTextConfirm: styles.dateAction,
                            btnTextCancel: styles.dateAction,
                        }}
                        onDateChange={dob => this.setState({dob})}
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
                    {this.renderSubmitButton()}
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }

    renderSubmitButton = () => {
        if (this.state.loading) {
            return <ActivityIndicator style={{margin: 20}} />
        }

        return (
            <AppButton
                title='Sign Up'
                onPress={this.signUp}
            />
        );
    };

    onChange = (key, val) => {
        // @ts-ignore
        this.setState({[key]: val})
    };

    signUp = async () => {
        this.setState({loading: true});

        const validationErrors = this.validateForm();
        if (validationErrors.length > 0) {
            Alert.alert(
                'Please Correct The Following Validation Errors',
                validationErrors.join('\n')
            );
        } else {
            try {
                await registerParticipant(this.state);
                Alert.alert('Registration Successful', 'Thanks for your interest');
            } catch (e) {
                Alert.alert('Unable to register', 'Please try later');
            }
        }
        this.setState({loading: false});
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
        borderBottomColor: 'rgba(0,0,0,0)'
    },
    container: {
        padding: 12,
    },
    dateAction: {
        padding: 30,
        color: '#000000',
    }
});
