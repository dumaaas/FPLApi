import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    View
} from 'react-native';
import CountryFlag from "react-native-country-flag";


function PlayerScreen({navigation, route}) {
    useEffect(() => {
    })
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.bgColor}>
                    <View style={styles.playerTabs}>
                        <View style={styles.playerTab}>
                            <Text >
                                {route.params.user.player_first_name} {route.params.user.player_last_name}
                            </Text>
                            <CountryFlag  isoCode={route.params.user.player_region_iso_code_short} size={18} />
                        </View>
                        <View style={styles.playerTab}>
                            <Text >
                                Gameweek {route.params.user.current_event}
                            </Text>
                            <Text style={styles.textBold}>
                                {route.params.user.summary_event_points} points
                            </Text>
                        </View>
                        <View style={styles.playerTab}>
                            <Text >
                                Total points
                            </Text>
                            <Text style={styles.textBold}>
                                {route.params.user.summary_overall_points} points
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.text}>Leagues - {route.params.user.name}</Text>
                        <View style={styles.tableContainer}>
                            <View style={styles.tableMain}>
                                <Text style={styles.tableSecondaryHeading}>Classic leagues</Text>
                                <View style={styles.tableHeader}>
                                    <Text style={styles.tableTextFirst}>League</Text>
                                    <Text style={styles.tableTextRankFirst}></Text>
                                    <Text style={styles.tableText}>Current Rank</Text>
                                    <Text style={styles.tableText}>Last Rank</Text>
                                </View>

                                {route.params.user.leagues.classic.map((league, index) => {
                                    return (
                                        <View style={styles.tableHeader}>
                                            <Text style={styles.tableTextFirstBody}>{league.name}</Text>
                                            <Text style={[styles.tableTextRank, league.entry_rank < league.entry_last_rank ? styles.greenCircle : styles.redCircle, league.entry_rank == league.entry_last_rank && styles.grayCircle]}></Text>
                                            <Text style={styles.tableTextBody}>{league.entry_rank}</Text>
                                            <Text style={styles.tableTextBody}>{league.entry_last_rank}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                            <View style={styles.tableMain}>
                                <Text style={styles.tableSecondaryHeading}>H2H leagues</Text>
                                <View style={styles.tableHeader}>
                                    <Text style={styles.tableTextFirst}>League</Text>
                                    <Text style={styles.tableTextRankFirst}></Text>
                                    <Text style={styles.tableText}>Current Rank</Text>
                                    <Text style={styles.tableText}>Last Rank</Text>
                                </View>

                                {route.params.user.leagues.h2h.map((league, index) => {
                                    return (
                                        <View style={styles.tableHeader}>
                                            <Text style={styles.tableTextFirstBody}>{league.name}</Text>
                                            <Text style={[styles.tableTextRank, league.entry_rank < league.entry_last_rank ? styles.greenCircle : styles.redCircle, league.entry_rank == league.entry_last_rank && styles.grayCircle]}></Text>
                                            <Text style={styles.tableTextBody}>{league.entry_rank}</Text>
                                            <Text style={styles.tableTextBody}>{league.entry_last_rank}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    </View>

                    <Text style={styles.text}> {JSON.stringify(route.params.user.leagues.classic[0])}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tableMain: {
        marginBottom: 18
    },
    tableSecondaryHeading: {
        color: '#00ff87',
        fontSize: 12,
        fontWeight: '700',
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: '#37003c',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        alignSelf: 'flex-start',
    },
    tableText: {
        color: '#7a7a7a',
        fontWeight: '700',
        fontSize: 10,
        width: '25%',
    },
    tableTextRankFirst: {
        width: 8,
        marginHorizontal: 30
    },
    tableTextRank: {
        width: 8,
        height: 8,
        borderRadius: 8/2,
        marginHorizontal: 30
    },
    grayCircle: {
        backgroundColor: '#7A7A7A',
    },
    greenCircle: {
        backgroundColor: '#05FA87',
    },
    redCircle: {
        backgroundColor: '#FC2C80',
    },
    tableTextFirst: {
        width: '40%',
        color: '#7a7a7a',
        fontWeight: '700',
        fontSize: 10,
    },
    tableTextBody: {
        color: '#37003c',
        fontWeight: '700',
        fontSize: 12,
        width: '25%',
    },
    tableTextFirstBody: {
        width: '40%',
        color: '#37003c',
        fontWeight: '700',
        fontSize: 12,
    },
    tableContainer: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 20
    },
    tableHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.2,
        borderBottomColor: '#7a7a7a',
        paddingVertical: 8
    },
    cell: {
        borderWidth: 1,
        borderColor: '#ddd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tableStyle: {
        backg: 'red',
    },
    textBold: {
        fontWeight: '700',
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
    bgColor: {
        backgroundColor: '#37003c',
        flex: 1
    },
    playersContainer: {
        flex: 1,
        alignItems: 'center',
    },
    playerText: {
        width: 180,
        fontSize: 16,
        marginTop: 8,
        padding: 12,
        backgroundColor: '#35BFFF',
        borderRadius: 10,
        textAlign: 'center',
        color: '#37003c',
    },
    container: {
        paddingHorizontal: 30,
        paddingVertical: 50,
        flex: 1,
        alignContent: 'center',
        height: '100%',
    },
    secondaryHeader: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '700',
        color: 'white'
    },
    input: {
        borderWidth: 1,
        padding: 15,
        marginVertical: 20,
        fontSize: 20,
        borderColor: '#00ff87',
        backgroundColor: 'white',
        borderRadius: 10,
        color: '#37003c',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 32,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#00ff87',
        elevation: 3,
        backgroundColor: '#00ff87',
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#37003c',
    },

});

export default PlayerScreen;
