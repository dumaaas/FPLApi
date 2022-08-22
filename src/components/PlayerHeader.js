import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import CountryFlag from "react-native-country-flag";

function PlayerHeader({user}) {
    return (
        <View style={styles.playerTabs}>
            <View style={styles.playerTab}>
                <Text style={styles.playerTabText}>
                    {user.player_first_name} {user.player_last_name}
                </Text>
                <CountryFlag isoCode={user.player_region_iso_code_short} size={18}/>

            </View>
            <View style={styles.playerTab}>
                <Text style={styles.playerTabText}>
                    Gameweek {user.current_event}
                </Text>
                <Text style={[styles.playerTabText, styles.textBold]}>
                    {user.summary_event_points} points
                </Text>
            </View>
            <View style={styles.playerTab}>
                <Text style={styles.playerTabText}>
                    Total points
                </Text>
                <Text style={[styles.playerTabText, styles.textBold]}>
                    {user.summary_overall_points} points
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textBold: {
        fontWeight: '700',
    },
    playerTabText: {
      color: '#37003c',
    },
    playerTabs: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
        paddingBottom: 20
    },
    playerTab: {
        flex: 1,
        alignItems: 'center',
        color: '#37003c',
        backgroundColor: '#00ff87',
        padding: 12,
        borderLeftWidth: 2,
        borderColor: '#37003c',
        borderTopWidth: 0,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8
    },
});

export default PlayerHeader;
