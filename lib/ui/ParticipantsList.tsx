import React, {Component} from "react";
import {FlatList, Modal, StyleSheet,ActivityIndicator, View} from "react-native";

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
    loading: boolean
}

export default class ParticipantsList extends Component<Props, State> {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Participants',
            headerLeft: <HamburgerMenu navigation={navigation}/>,
            headerRight: <SearchIcon onPress={navigation.getParam('openSearchScreen')} />,
        };
    };

    state = {
        participants: [],
        offset: 0,
        loading: false
    };

    componentDidMount(): void {
        const navigationParams = {
            openSearchScreen: () => this.props.navigation.navigate('Search')
        };
        this.props.navigation.addListener('willFocus', this.loadData);
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
                    onEndReached={this.loadMoreData}
                    ListFooterComponent={this.renderLoading()}
                />
            </View>
        );
    }

    private renderLoading = () => {
        return this.state.loading ? (
            <ActivityIndicator style={{padding: 12}} />
        ) : null;
    };

    private loadData = async () => {
        this.setState({loading: true});
        const result = await getParticipants(0);
        this.setState({
            participants: result,
            offset: 10,
            loading: false
        });
    };

    private loadMoreData = async () => {
        this.setState({loading: true});
        const result = await getParticipants(this.state.offset);
        this.setState(state => {
            return {
                participants: [...state.participants, ...result],
                offset: state.offset + 10,
                loading: false
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
