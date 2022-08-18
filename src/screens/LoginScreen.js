import React, {useEffect, useState} from 'react';
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
    Dimensions,
    Pressable,
    ToastAndroid,
    Alert,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native';
import {getEvents} from '../services/EventsService';
import {checkIfUserExist} from '../services/UserService';
import LoginHeader from '../components/LoginHeader';
import Toast from 'react-native-simple-toast';
let ScreenHeight = Dimensions.get("window").height;

function LoginScreen({navigation}) {

    const [id, setId] = useState(0);
    const [user, setUser] = useState({});
    const [userFound, setUserFound] = useState(true);

    const login = (userId = 0) => {
        var realId = id != 0 ? id : userId;
        console.log(realId, 'hm?');
        checkIfUserExist(realId).then(res => res.json())
            .then(json => {
                if (json.detail !== 'Not found.') {
                    setUserFound(true);
                    setId(0);
                    navigation.navigate('PlayerScreen', {user: json});
                } else {
                    setUserFound(false);
                    setId(0);
                    Toast.showWithGravity('User not found. Try again..', Toast.LONG, Toast.TOP);
                }
            }).catch(error => {
            console.log('ERROR > ', error);
        });
    }

    const players = [
        {
            name: 'Marko Dumnic',
            id: 5541327
        },
        {
            name: 'Milos Jovovic',
            id: 5230382
        },
        {
            name: 'Stefan Tomovic',
            id: 5552932
        },
        {
            name: 'Strahinja Kovacevic',
            id: 4157253
        },
        {
            name: 'Vojin Jovovic',
            id: 5251393
        }
    ]

    const onChangedText = (text) => {
        setId( text.replace(/[^0-9]/g, ''))
        console.log(text, 'text >>>')
    }

    return (
        <SafeAreaView style={styles.bgColor}>
            <ScrollView>
                <LoginHeader/>
                <View style={styles.container}>
                    <Text style={styles.text}>Enter your manager_id:</Text>
                    <TextInput value={id} style={styles.input} onChangeText={(text) => onChangedText(text)}></TextInput>
                    <TouchableOpacity onPress={login} style={styles.button}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
                    <Text style={styles.text}></Text>
                    <View>
                        <Text style={styles.secondaryHeader}>Our players</Text>
                        <View style={styles.playersContainer}>
                            {players.map((player, index) => {
                                return (
                                    <>
                                        <TouchableOpacity key={index} onPress={() => {
                                            login(player.id);
                                        }}>
                                            <Text style={styles.playerText}>{player.name}</Text>
                                        </TouchableOpacity>
                                    </>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bgColor: {
        backgroundColor: '#37003c',
        minHeight: ScreenHeight
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

export default LoginScreen;
