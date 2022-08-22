import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable
} from 'react-native';

function TeamPosition({setFullPlayerData, setModalVisible, team, bootstrapStatic, livePlayerData, isBench}) {
    const findOpponentTeam = (player) => {
        var player = findPlayerBootstrapDataById(player.element);
        var team = {};
        bootstrapStatic.teams.find((teamBootstrap) => {
            if(player.team_code == teamBootstrap.code) {
                team = teamBootstrap;
            }
        })
        return team;
    }

    const findPlayerBootstrapDataById = (id) => {
        var staticPlayer = {};
        bootstrapStatic.elements.find((player) => {
            if(player.id == id) {
                staticPlayer = player;
            }
        });
        return staticPlayer;
    }

    const findPlayerLiveData = (id) => {
        var livePlayer = {};

        livePlayerData.map((player, index) => {
            if(player.id == id) {
                livePlayer = player;
            }
        });
        return livePlayer;
    }

    const constructPlayerData = (playerArg) => {
        var player = {};
        player.bootstrapStatic = findPlayerBootstrapDataById(playerArg.element);
        player.livePlayerData = findPlayerLiveData(playerArg.element);
        player.team = findOpponentTeam(playerArg);
        setFullPlayerData(player);
    };

    return (
        <View style={isBench ? styles.benchCourt : styles.defendersCourt}>
            {
                team.map((player, index) => {
                    var bootstrapPlayer = findPlayerBootstrapDataById(player.element);
                    var livePlayer = findPlayerLiveData(player.element);

                    return (
                        <Pressable onPress={() => {
                            setModalVisible(true);
                            constructPlayerData(player);
                        }}>
                            <View style={styles.playerCard}>
                                {player.is_captain && <Text style={styles.teamCaptain}>
                                    C
                                </Text>}
                                {player.is_vice_captain && <Text style={styles.teamCaptain}>
                                    V
                                </Text>}
                                <Text style={styles.playerPoints}>{player.is_captain ? JSON.stringify(livePlayer.stats.total_points)*2 : JSON.stringify(livePlayer.stats.total_points)}</Text>
                                <Image
                                    style={{
                                        resizeMode: 'contain',
                                        alignSelf: 'center',
                                    }}
                                    style={{ width: 40, height: 60 }}
                                    source={{uri: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p'+bootstrapPlayer.code+'.png'}}
                                />
                                <View style={styles.playerCardBottom}>
                                    <Text style={styles.playerName}>{bootstrapPlayer.web_name.length > 10 ? bootstrapPlayer.web_name.substring(0, 10)+'..' : bootstrapPlayer.web_name}</Text>
                                    <Text style={styles.playerTeam}>{findOpponentTeam(player).short_name}</Text>
                                </View>
                            </View>
                        </Pressable>
                    );
                })
            }
        </View>    )
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
        width: '25%',
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
    tableTextRank: {
        width: 8,
        height: 8,
        borderRadius: 8 / 2,
        marginHorizontal: 30
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
        paddingVertical: 8
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
    playerPoints: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 14,
        height: 14,
        fontSize: 10,
        borderRadius: 14/2,
        backgroundColor: '#35BFFF',
        color: '#37003c',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: '700',
        flex: 1,
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
    playersCourt: {
        alignItems: 'center',
    },
    defendersCourt: {
        marginBottom: 33.3,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    benchCourt: {
        marginTop: 24,
        padding: 21,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    playerCard: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    playerCardBottom: {
        width: 60,

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
    teamCaptain: {
        width: 14,
        height: 14,
        borderRadius: 14/2,
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

export default TeamPosition;
