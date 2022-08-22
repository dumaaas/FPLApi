import React, {useState} from 'react';
import {
    Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';

function PlayerData({player, modalVisible, setModalVisible}) {

    const createPlayerName = (first, last) => {
        var name = first+' '+last;
        name = name.length > 22 ? name.substring(0, 22)+'..' : name;
        return name;
    }

    const declarePlayerPosition = (el) => {
        var player = {};
        switch (el) {
            case 1:
                player.position = 'Goalkeeper';
                player.goalMultiplier = 6;
                player.cleanSheet = 4;
                break;
            case 2:
                player.position = 'Defender';
                player.goalMultiplier = 6;
                player.cleanSheet = 4;
                break;
            case 3:
                player.position = 'Midfielder';
                player.goalMultiplier = 5;
                player.cleanSheet = 1;
                break;
            case 4:
                player.position = 'Forward';
                player.goalMultiplier = 4;
                player.cleanSheet = 0;
                break;
        }
        return player;
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(false);
                }}
            >
                <TouchableOpacity activeOpacity={0} onPressOut={() => setModalVisible(false)} style={styles.centeredView}>
                    <TouchableWithoutFeedback>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                            <Pressable onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                                <Text style={styles.closeBtn}>
                                    X
                                </Text>
                            </Pressable>
                        </View>
                        <View style={styles.playerHeader}>
                            <Image
                                style={{
                                    resizeMode: 'contain',
                                    alignSelf: 'center',
                                }}
                                style={{width: 80, height: 100}}
                                source={{uri: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p' + player.bootstrapStatic.code + '.png'}}
                            />
                            <View style={styles.playerHeaderDetails}>
                                <Text style={styles.playerHeaderPosition}>{declarePlayerPosition(player.bootstrapStatic.element_type).position}</Text>
                                <Text style={styles.playerHeaderName}>{createPlayerName(player.bootstrapStatic.first_name, player.bootstrapStatic.second_name)}</Text>
                                <View style={styles.playerTeamSection}>
                                    <Image
                                        style={{
                                            resizeMode: 'contain',
                                            alignSelf: 'center',
                                        }}
                                        style={{width: 20, height: 20}}
                                        source={{uri: 'https://resources.premierleague.com/premierleague/badges/70/t' + player.team.code + '.png'}}
                                    />
                                    <Text style={styles.playerHeaderTeam}>{player.team.name}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.playerMiddle}>
                            <View style={styles.playerMiddleTab}>
                                <Text style={styles.playerMiddleHeading}>Form</Text>
                                <Text style={styles.playerMiddleText}>{player.bootstrapStatic.form}</Text>
                            </View>
                            <View style={styles.playerMiddleTab}>
                                <Text style={styles.playerMiddleHeading}>Value</Text>
                                <Text style={styles.playerMiddleText}>£{player.bootstrapStatic.now_cost/10}m</Text>
                            </View>
                            <View style={styles.playerMiddleTab}>
                                <Text style={styles.playerMiddleHeading}>Selected</Text>
                                <Text style={styles.playerMiddleText}>{player.bootstrapStatic.selected_by_percent}%</Text>
                            </View>
                            <View style={styles.playerMiddleTab}>
                                <Text style={styles.playerMiddleHeading}>GM3</Text>
                                <Text style={styles.playerMiddleText}>{player.bootstrapStatic.event_points} {player.bootstrapStatic.event_points == 1 ? 'point' : 'points'}</Text>
                            </View>
                        </View>
                        <View style={styles.tableScoreContainer}>
                            <View style={styles.paddingTable}>
                                <View style={styles.tableScoreHeader}>
                                    <Text style={styles.tableTextHeaderExtra}>Statistic</Text>
                                    <View style={styles.tableValueHeader}>
                                        <Text style={styles.tableTextHeaderExtra}>Value</Text>
                                        <Text style={styles.tableTextHeaderExtra}>Points</Text>
                                    </View>
                                </View>
                                {player.livePlayerData.stats.minutes !== 0 && <View style={styles.tableScoreHeader}>
                                    <Text style={styles.tableTextHeader}>Minutes</Text>
                                    <View style={styles.tableValueHeader}>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.minutes}</Text>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.minutes > 59 ? 2 : 1}</Text>
                                    </View>
                                </View>}
                                {player.livePlayerData.stats.goals_scored !== 0 && <View style={styles.tableScoreHeader}>
                                    <Text style={styles.tableTextHeader}>Goals</Text>
                                    <View style={styles.tableValueHeader}>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.goals_scored}</Text>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.goals_scored*declarePlayerPosition(player.bootstrapStatic.element_type).goalMultiplier}</Text>
                                    </View>
                                </View>}
                                {player.livePlayerData.stats.assists !== 0 && <View style={styles.tableScoreHeader}>
                                    <Text style={styles.tableTextHeader}>Assists</Text>
                                    <View style={styles.tableValueHeader}>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.assists}</Text>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.assists*3}</Text>
                                    </View>
                                </View>}
                                {(player.livePlayerData.stats.saves !== 0 && declarePlayerPosition(player.bootstrapStatic.element_type).position == 'Goalkeeper') && <View style={styles.tableScoreHeader}>
                                    <Text style={styles.tableTextHeader}>Saves</Text>
                                    <View style={styles.tableValueHeader}>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.saves}</Text>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.saves%3==0 ? player.livePlayerData.stats.saves/3 : Math.floor(player.livePlayerData.stats.saves/3)}</Text>
                                    </View>
                                </View>}
                                {(declarePlayerPosition(player.bootstrapStatic.element_type).position == 'Goalkeeper' && player.livePlayerData.stats.penalties_saved !== 0) && <View style={styles.tableScoreHeader}>
                                    <Text style={styles.tableTextHeader}>Penalties saved</Text>
                                    <View style={styles.tableValueHeader}>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.penalties_saved}</Text>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.penalties_saved*5}</Text>
                                    </View>
                                </View>}
                                {(player.livePlayerData.stats.clean_sheets !== 0 && declarePlayerPosition(player.bootstrapStatic.element_type).position !== 'Forward') && <View style={styles.tableScoreHeader}>
                                    <Text style={styles.tableTextHeader}>Clean Sheet</Text>
                                    <View style={styles.tableValueHeader}>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.clean_sheets}</Text>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.clean_sheets*declarePlayerPosition(player.bootstrapStatic.element_type).cleanSheet}</Text>
                                    </View>
                                </View>}
                                {player.livePlayerData.stats.bonus !== 0 && <View style={styles.tableScoreHeader}>
                                    <Text style={styles.tableTextHeader}>Bonus</Text>
                                    <View style={styles.tableValueHeader}>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.bonus}</Text>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.bonus}</Text>
                                    </View>
                                </View>}
                                {(declarePlayerPosition(player.bootstrapStatic.element_type).position !== 'Forward' && declarePlayerPosition(player.bootstrapStatic.element_type).position !== 'Midfielder' && player.livePlayerData.stats.goals_conceded !== 0) && <View style={styles.tableScoreHeader}>
                                    <Text style={styles.tableTextHeader}>Goals conceded</Text>
                                    <View style={styles.tableValueHeader}>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.goals_conceded}</Text>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.goals_conceded % 2 == 0 ? -Math.abs(player.livePlayerData.stats.goals_conceded/2) : Math.round(-Math.abs(player.livePlayerData.stats.goals_conceded/2))}</Text>
                                    </View>
                                </View>}
                                {player.livePlayerData.stats.yellow_cards !== 0 && <View style={styles.tableScoreHeader}>
                                    <Text style={styles.tableTextHeader}>Yellow cards</Text>
                                    <View style={styles.tableValueHeader}>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.yellow_cards}</Text>
                                        <Text style={styles.tableTextHeader}>{-Math.abs(player.livePlayerData.stats.yellow_cards)}</Text>
                                    </View>
                                </View>}
                                {player.livePlayerData.stats.red_cards !== 0 && <View style={styles.tableScoreHeader}>
                                    <Text style={styles.tableTextHeader}>Red cards</Text>
                                    <View style={styles.tableValueHeader}>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.red_cards}</Text>
                                        <Text style={styles.tableTextHeader}>{-Math.abs(player.livePlayerData.stats.red_cards*3)}</Text>
                                    </View>
                                </View>}
                                {player.livePlayerData.stats.own_goals !== 0 && <View style={styles.tableScoreHeader}>
                                    <Text style={styles.tableTextHeader}>Own goals</Text>
                                    <View style={styles.tableValueHeader}>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.own_goals}</Text>
                                        <Text style={styles.tableTextHeader}>{-Math.abs(player.livePlayerData.stats.own_goals*2)}</Text>
                                    </View>
                                </View>}
                                {player.livePlayerData.stats.penalties_missed !== 0 && <View style={styles.tableScoreHeader}>
                                    <Text style={styles.tableTextHeader}>Penalties missed</Text>
                                    <View style={styles.tableValueHeader}>
                                        <Text style={styles.tableTextHeader}>{player.livePlayerData.stats.penalties_missed}</Text>
                                        <Text style={styles.tableTextHeader}>{-Math.abs(player.livePlayerData.stats.penalties_missed*2)}</Text>
                                    </View>
                                </View>}
                            </View>
                        </View>
                    </View>
                        </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    playerTeamSection: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    tableScoreContainer: {
        backgroundColor: '#E8E8E8',
        width: '100%'
    },
    paddingTable: {
        padding: 12,
    },
    tableTextHeader: {
        color: '#37003c',
        fontWeight: '400',
        fontSize: 12,
        textAlign: 'left',
        width: '50%'
    },
    tableTextHeaderExtra: {
        color: '#7a7a7a',
        fontWeight: '700',
        fontSize: 9,
        textAlign: 'left',
        width: '50%'
    },
    tableValueHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '30%'
    },
    tableScoreHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.2,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        paddingVertical: 8
    },
    playerHeader: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 12,
        paddingBottom: 0,
        backgroundColor: '#E8E8E8',
        width: '100%'
    },
    playerHeaderDetails: {
        marginLeft: 20,
    },
    playerHeaderPosition: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#00ff87',
        color: '#37003c',
        textAlign: 'center',
        fontWeight: '700',
        borderRadius: 8,
        fontSize: 11,
        padding: 2,
        marginBottom: 7
    },
    playerHeaderName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#37003c',
        marginBottom: 7
    },
    playerHeaderTeam: {
        fontSize: 12,
        marginLeft: 8,
        color: '#7a7a7a'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalHeader: {
        backgroundColor: '#37003c',
        padding: 12,
        width: '100%',
    },
    closeBtn: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        width: '80%',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    playerMiddle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 12,
        alignItems: 'center',
    },
    playerMiddleTab: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        borderRightWidth: 0.9,
        borderRightColor: '#E8E8E8'
    },
    playerMiddleHeading: {
        color: '#37003c',
        fontWeight: '600',
        fontSize: 12
    },
    playerMiddleText: {
        color: '#37003c',
        fontWeight: '300',
        fontSize: 14,
        marginTop: 3
    }

});

export default PlayerData;
