import React, {Component} from "react";
import {ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";

import Participant from "../models/Participant";
import ParticipantItem from "./components/ParticipantItem";
import {searchParticipants} from "../data/ParticipantRepo";
import {debounce} from "../Util.js";
import {HeaderBackButton, NavigationStackProp} from "react-navigation-stack";


interface Props {
    navigation: NavigationStackProp,
    onSelectItem: (p: Participant) => void,
}

interface State {
    result: Participant[],
    searching: boolean
}

export default class ParticipantSearchScreen extends Component<Props, State> {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)}/>,
            headerTitle: navigation.getParam('renderSearchBar')
        };
    };

    state = {
        result: [],
        searching: false
    };

    componentDidMount(): void {
        this.props.navigation.setParams({
            renderSearchBar: this.renderSearchBar,
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList<Participant>
                    data={this.state.result}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={this.renderListHeader()}
                />
            </SafeAreaView>
        );
    }

    private renderItem = ({item}) => {
        return (
            <ParticipantItem
                item={item}
                onPress={() => this.props.navigation.navigate('Detail', {item})}
            />
        );
    };

    private renderListHeader = () => {
        if (this.state.searching) {
            return (
                <ActivityIndicator style={{padding: 12}}/>
            );
        }
        if (this.state.result.length <= 0) {
            return (
                <View style={styles.center}>
                    <Text>
                        No Records
                    </Text>
                </View>

            );
        }
        return null;
    };


    private renderSearchBar = () => {
        return (
            <TextInput
                style={styles.searchBar}
                placeholder='Search'
                autoCapitalize='none'
                autoFocus={true}
                onChangeText={this.debouncedSearch}
            />
        );
    };

    private search = async (query: string) => {
        this.setState({searching: true});
        const result = await searchParticipants(query);
        this.setState(state => {
            return {
                result,
                searching: false
            };
        })
    };

    private debouncedSearch = debounce(this.search, 200, false);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    searchBarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
    },
    searchBar: {
        flex: 1,
        fontWeight: '400',
    },
    searchModal: {
        marginTop: 22,
        borderRadius: 5,
        backgroundColor: '#ffffff'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
