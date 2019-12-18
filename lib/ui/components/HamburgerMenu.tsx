import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {NavigationDrawerProp} from 'react-navigation-drawer';

interface Props {
    navigation: NavigationDrawerProp
}

export default function HamburgerMenu(props: Props) {
    return (
        <TouchableOpacity
            style={{padding: 10}}
            onPress={props.navigation.openDrawer}>
            <Image
                style={{height: 20, aspectRatio: 1}}
                source={require('../../assets/menu.png')}
            />
        </TouchableOpacity>
    );
}
