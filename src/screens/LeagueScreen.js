import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    ImageBackground,
    Image,
    Dimensions,
    Pressable,
    TouchableOpacity
} from 'react-native';

import PlayerTabs from "../components/PlayerTabs";
import PlayerDetails from "../components/PlayerDetails";
import PlayerLeagues from "../components/PlayerLeagues";
import PlayerHeader from "../components/PlayerHeader";
import PlayerTeam from "../components/PlayerTeam";

import Toast from 'react-native-simple-toast';

let ScreenHeight = Dimensions.get("window").height;

import {checkIfUserExist} from '../services/UserService';

function LeagueScreen({navigation, route}) {

    const [leaguePlayers, setLeaguePlayers] = useState([]);

    const login = (id) => {
        checkIfUserExist(id).then(res => res.json())
            .then(json => {
                if (json.detail !== 'Not found.') {
                    navigation.navigate('PlayerScreen', {user: json});
                } else {
                    Toast.showWithGravity('User not found. Try again..', Toast.LONG, Toast.TOP);
                }
            }).catch(error => {
            console.log('ERROR > ', error);
        });
    }

    return (
        <SafeAreaView style={styles.heightWindow}>
            <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
                <View style={styles.stickyHeader}>
                    <Text style={[styles.text, styles.leagueHeading]}>Standings</Text>
                </View>

                <View style={styles.tableContainer}>
                    <View style={styles.tableMain}>
                        <Text style={styles.tableSecondaryHeading}>{route.params.league.league.name}</Text>
                        <View style={[styles.tableHeader, styles.tableHeaderBg]}>
                            <View style={styles.tableHeaderFlex}>
                                <Text style={[styles.tableTextPos, styles.width25]}>Pos</Text>
                                <Text style={[styles.tableTextTeam]}>Team</Text>
                            </View>
                            <View style={styles.tableHeaderFlex}>
                                <Text style={styles.tableText}>GM3</Text>
                                <Text style={[styles.tableText, styles.marginLeft50, styles.width30]}>Total</Text>
                            </View>
                        </View>

                        {route.params.league.standings.results.map((player, index) => {
                            return (

                                <View
                                    style={styles.tableHeader}>
                                    <View style={styles.tableHeaderFlex}>
                                        <View style={[styles.tableHeaderFlex, styles.width25]}>
                                            <Text
                                                style={[styles.tableTextRank, player.rank < player.last_rank ? styles.greenCircle : styles.redCircle, player.rank == player.last_rank && styles.grayCircle]}></Text>
                                            <Text style={styles.tableTextFirstBody}>{player.rank}</Text>
                                        </View>
                                        <TouchableOpacity style={[styles.tableHeaderPlayerName]} onPress={() => {
                                            login(player.entry);
                                        }}>
                                            <Text style={styles.tableTextBody}>{player.entry_name}</Text>
                                            <Text
                                                style={[styles.tableTextBody, styles.notBold]}>{player.player_name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.tableHeaderFlex}>
                                        <Text
                                            style={[styles.tableTextBody, styles.notBold]}>{player.event_total}</Text>
                                        <Text
                                            style={[styles.tableTextBody, styles.marginLeft50, styles.width30]}>{player.total}</Text>
                                    </View>

                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tableScoreHeaderData: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
        backgroundColor: '#0FE0FF',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    paddingTable: {
        padding: 20,
        paddingTop: 10,
        paddingBottom: 12
    },
    marginTop0: {
        paddingTop: 0,
        marginTop: 0,
        paddingBottom: 20
    },
    tableScoreHeaderDataText: {
        color: '#37003c',
        font: 14,
    },
    tableScoreHeaderDataHeading: {
        color: '#37003c',
        fontSize: 25,
        fontWeight: '700',
        marginTop: -5
    },
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

    },
    tableTextHeader: {
        color: '#37003c',
        fontWeight: '400',
        fontSize: 14
    },
    tableTextRankFirst: {
        width: 8,
        marginHorizontal: 30
    },
    tableHeaderFlex: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tableTextRank: {
        width: 8,
        height: 8,
        borderRadius: 8 / 2,
        marginRight: 10
    },
    tableHeaderPlayerName: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlign: 'right',
    },
    tableTextRank2: {
        marginRight: 8,
        width: 8,
        height: 8,
        borderRadius: 8 / 2,
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
        color: '#7a7a7a',
        fontWeight: '700',
        fontSize: 10,
    },
    tableTextPos: {
        color: '#7a7a7a',
        fontWeight: '700',
        fontSize: 10,
    },
    tableTextTeam: {
        color: '#7a7a7a',
        fontWeight: '700',
        fontSize: 10,
    },
    width25: {
        width: 60
    },
    width30: {
        width: 30,
    },
    marginLeft50: {
        marginLeft: 25,
    },
    tableTextBody: {
        color: '#37003c',
        fontWeight: '700',
        fontSize: 12,
        textAlign: 'left',
    },
    notBold: {
        fontWeight: '400'
    },
    tableTextFirstBody: {
        color: '#37003c',
        fontWeight: '700',
        fontSize: 12,
    },
    tableScoreContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 80,
    },
    tableContainer: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 80
    },
    tableScoreHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.2,
        borderBottomColor: '#7a7a7a',
        paddingVertical: 8
    },
    tableHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.2,
        borderBottomColor: '#7a7a7a',
        paddingVertical: 8,
    },
    cell: {
        borderWidth: 1,
        borderColor: '#ddd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBold: {
        fontWeight: '700',
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
    rankingIndication: {
        flexDirection: 'row',
        alignItems: 'center',
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
    heightWindow: {
        minHeight: ScreenHeight,
        backgroundColor: '#37003c',
    },
    playersCourt: {
        alignItems: 'center',
    },
    defendersCourt: {
        marginTop: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    benchCourt: {
        marginTop: 44,
        padding: 21,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'white',
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    playerCard: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerCardBottom: {
        width: 60,
        marginTop: 8,
        textAlign: 'center'
    },
    playerName: {
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#37003c',
        padding: 2,
        textAlign: 'center',
        fontSize: 8,
    },
    playerTeam: {
        color: '#37003c',
        fontWeight: '700',
        backgroundColor: '#00ff87',
        padding: 2,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        textAlign: 'center',
        fontSize: 8,
    },
    leagueHeading: {
        color: '#37003c',
    },
    stickyHeader: {
        flexDirection: 'row',

        alignItems: 'center',
        padding: 8,
        backgroundColor: '#00ff87',
    },
    teamCaptain: {
        width: 14,
        height: 14,
        borderRadius: 14 / 2,
        fontSize: 8,
        backgroundColor: 'black',
        color: 'white',
        fontWeight: '700',
        position: 'absolute',
        top: 0,
        right: 0,
        paddingTop: 1.5,
        justifyContent: 'center',
        textAlign: 'center',
    }

});

export default LeagueScreen;
