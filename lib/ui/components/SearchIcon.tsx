import React from "react";
import {TouchableOpacity, Image} from "react-native";

export default function SearchIcon(props) {
    return (
        <TouchableOpacity
            style={{padding: 10}}
            onPress={props.onPress}>
            <Image
                style={{height: 20, aspectRatio: 1}}
                source={require('../../assets/search.png')}
            />
        </TouchableOpacity>
    )
}
