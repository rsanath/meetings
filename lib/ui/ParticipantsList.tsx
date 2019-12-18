import React, {Component} from "react";
import {Button, FlatList, Modal, StyleSheet, TouchableOpacity, View} from "react-native";

import Participant from "../models/Participant";
import ParticipantItem from "./components/ParticipantItem";
import {getParticipants} from "../data/ParticipantRepo";
import {NavigationStackProp} from "react-navigation-stack";
import ParticipantSearchScreen from "./ParticipantSearchScreen";
import HamburgerMenu from "./components/HamburgerMenu";
import SearchIcon from "./components/SearchIcon";


interface Props {
    navigation: NavigationStackProp
}

interface State {
    participants: Participant[],
    offset: number,
    searchModalVisible: boolean
}

export default class ParticipantsList extends Component<Props, State> {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Participants',
            headerLeft: <HamburgerMenu navigation={navigation}/>,
            headerRight: <SearchIcon onPress={navigation.getParam('showSearchModal')} />,
        };
    };

    state = {
        participants: [],
        offset: 0,
        searchModalVisible: false,
    };

    componentDidMount(): void {
        const navigationParams = {
            showSearchModal: () => this.setSearchModalVisible(true)
        };
        this.props.navigation.setParams(navigationParams);
        this.loadData();
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList<Participant>
                    style={styles.list}
                    data={this.state.participants}
                    renderItem={({item}) => <ParticipantItem item={item} onPress={this.openDetails}/>}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={this.loadData}
                />
                {this.renderSearchModal()}
            </View>
        );
    }

    private renderSearchModal = () => {
        return (
            <Modal
                animationType='fade'
                transparent={false}
                visible={this.state.searchModalVisible}
                onRequestClose={() => this.setSearchModalVisible(false)}>
                <ParticipantSearchScreen
                    close={() => this.setSearchModalVisible(false)}
                    onSelectItem={this.openDetails}
                />
            </Modal>
        );
    };

    private setSearchModalVisible(visible: boolean) {
        this.setState({searchModalVisible: visible});
    }

    private loadData = async () => {
        const result = await getParticipants(this.state.offset);
        this.setState(state => {
            return {
                participants: [...state.participants, ...result],
                offset: state.offset + 10,
            };
        });
    };

    private openDetails = (item: Participant) => {
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
    },
    searchModal: {
        marginTop: 22,
        borderRadius: 5,
        backgroundColor: '#ffffff'
    },
    list: {
        padding: 6,
    }
});
