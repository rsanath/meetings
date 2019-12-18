import React, {Component} from "react";
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import Participant from "../models/Participant";
import ParticipantItem from "./components/ParticipantItem";
import {searchParticipants} from "../data/ParticipantRepo";
import {debounce} from "../Util.js";


interface Props {
    onSelectItem: (p: Participant) => void,
    close: () => void
}

interface State {
    result: Participant[],
    searching: boolean
}

export default class ParticipantSearchScreen extends Component<Props, State> {
    state = {
        result: [],
        searching: false
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.renderSearchBar()}
                {this.renderResult()}
            </SafeAreaView>
        );
    }

    private renderItem = ({item}) => {
        return (
            <ParticipantItem
                item={item}
                onPress={() => this.props.onSelectItem(item)}
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

    private renderResult = () => {
        return (
            <FlatList<Participant>
                data={this.state.result}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={this.renderListHeader()}
            />
        );
    };

    private renderSearchBar = () => {
        return (
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder='Search'
                    autoCapitalize='none'
                    autoFocus={true}
                    onChangeText={this.debouncedSearch}
                />
                <TouchableOpacity onPress={this.props.close}>
                    <Text>Close️</Text>
                </TouchableOpacity>
            </View>
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
        backgroundColor: '#f4f4f4',
        marginVertical: 10,
        padding: 12,
        margin: 6,
        paddingVertical: 12,
        borderRadius: 6,
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
