import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import RegistrationForm from "./lib/ui/RegistrationForm";
import ParticipantsList from "./lib/ui/ParticipantsList";
import {createAppContainer} from "react-navigation";


const RootNavigator = createDrawerNavigator({
    Register: {
        screen: RegistrationForm,
    },
    Participants: {
        screen: ParticipantsList,
    },
});

export default createAppContainer(RootNavigator);
