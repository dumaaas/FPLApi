import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    ImageBackground,
    Image,
    Dimensions
} from 'react-native';

import PlayerTabs from "../components/PlayerTabs";
import PlayerDetails from "../components/PlayerDetails";
import PlayerLeagues from "../components/PlayerLeagues";
import PlayerHeader from "../components/PlayerHeader";
import PlayerTeam from "../components/PlayerTeam";

import {getBootstrapStatic, getLivePlayerData} from '../services/TeamService';

let ScreenHeight = Dimensions.get("window").height;

function PlayerScreen({navigation, route}) {
    useEffect(() => {
        findBootstrapStatic();
        findLivePlayerData();
    }, []);

    const [activeTab, setActiveTab] = useState(1);
    const [bootstrapStatic, setBootstrapStatic] = useState([]);
    const [livePlayerData, setLivePlayerData] = useState([]);

    const findBootstrapStatic =  () => {
        getBootstrapStatic().then(res => res.json())
            .then(json => {
                setBootstrapStatic(json);
            }).catch(error => {
            console.log('ERROR > ', error);
        });
    }


    const findLivePlayerData = () => {
        console.log('pusim tusi')
        getLivePlayerData(route.params.user.current_event).then(res => res.json())
            .then(json => {
                if (json.detail !== 'Not found.') {
                    setLivePlayerData(json.elements);
                } else {
                    Toast.showWithGravity('Player data not found. Try again..', Toast.LONG, Toast.TOP);
                }
            }).catch(error => {
            console.log('ERROR > ', error);
        });
    }

    return (
        <SafeAreaView style={styles.heightWindow}>
            <ScrollView>
                <View style={styles.bgColor}>
                    <PlayerHeader user={route.params.user}/>
                    {activeTab == 1 && <PlayerDetails user={route.params.user}/>}
                    {activeTab == 2 && <PlayerLeagues user={route.params.user}/>}
                    {activeTab == 3 && <PlayerTeam user={route.params.user} bootstrapStatic={bootstrapStatic} livePlayerData={livePlayerData}/>}
                </View>
            </ScrollView>
            <PlayerTabs setActiveTab={setActiveTab} activeTab={activeTab}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bgColor: {
        backgroundColor: '#37003c',
        flex: 1
    },
    heightWindow: {
        minHeight: ScreenHeight,
        backgroundColor: '#37003c',
    },
});

export default PlayerScreen;
