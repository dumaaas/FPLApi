import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable
} from 'react-native';

function PlayerTabs({setActiveTab, activeTab}) {
    const tabData = ['User Details', 'Leagues', 'Team'];
    return (
        <View style={styles.playerTabs}>
            {tabData.map((tab, index) => {
                return (
                    <Pressable style={[styles.playerTab, activeTab == index+1 && styles.playerActiveTab]} onPress={() => setActiveTab(index+1)}>
                        <Text style={[styles.tabText, activeTab == index+1 && styles.activeTab]}>
                            {tab}
                        </Text>
                    </Pressable>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    textBold: {
        fontWeight: '700',
    },
    playerTabs: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    playerActiveTab: {
        borderColor: '#00ff87',
        backgroundColor: '#37003c',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
    },
    playerTab: {
        flex: 1,
        alignItems: 'center',
        color: '#37003c',
        backgroundColor: '#00ff87',
        paddingHorizontal: 12,
        borderColor: '#37003c',
        borderBottomWidth: 0,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        marginHorizontal: 4
    },
    activeTab: {
        borderBottomWidth: 1,
        borderBottomColor: '#00ff87',
        color: '#00ff87',

    },
    tabText: {
        fontWeight: '600',
        color: '#37003c',
        paddingVertical: 6,
        marginVertical: 6
    }

});

export default PlayerTabs;
