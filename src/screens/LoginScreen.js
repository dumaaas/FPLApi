import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View, Dimensions, Pressable} from 'react-native';
import {getEvents} from '../services/EventsService';
import {checkIfUserExist} from '../services/UserService';
import LoginHeader from '../components/LoginHeader';

function LoginScreen() {

    const [id, setId] = useState(0);
    const [user, setUser] = useState({});
    const [userFound, setUserFound] = useState(false);

    useEffect(() => {
    }, [])


    const login = () => {
        checkIfUserExist(id).then(res => res.json())
            .then(json => {
                if (json.detail !== 'Not found.') {
                    setUserFound(true);
                    setUser(json);
                } else {
                    setUserFound(false);
                }
            }).catch(error => {
            console.log('ERROR > ', error);
        });
    }

    return (
        <View>
            <LoginHeader/>
            <View style={styles.container}>
                <Text style={styles.text}>Enter your manager_id:</Text>
                <TextInput value={id} style={styles.input} onChangeText={(text) => setId(text)}></TextInput>
                <Pressable onPress={login} style={styles.button}><Text style={styles.buttonText}>Login</Text></Pressable>
                <Text style={styles.text}></Text>
                {userFound ?
                    <>
                        <Text style={styles.text}>{user.favourite_team}</Text>
                        <Text style={styles.text}>{JSON.stringify(user)}</Text>
                    </>
                    :
                    <Text style={styles.errorText}>User not found</Text>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 50,
        flex: 1,
        alignContent: 'center',
        height: '100%',

    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    errorText: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'red',
        textAlign: 'center',
        width: '100%',
        color: 'white',
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
