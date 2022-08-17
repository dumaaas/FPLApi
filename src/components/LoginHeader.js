import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

function LoginHeader() {
    return (
        <View style={styles.bgColor}>
            <Image
                style={{
                    resizeMode: 'contain',
                    alignSelf: 'center',
                }}
                source={require('../../src/images/logo.png')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    bgColor: {
        backgroundColor: '#00ff87',
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
        paddingVertical: 30,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
});

export default LoginHeader;
