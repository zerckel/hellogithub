import React, {useState} from 'react';
import {StyleSheet, Text, Button, View, TextInput, FlatList, TouchableOpacity} from 'react-native';

export default function App() {
    const [username, setUsername] = useState("zerckel");
    const [user, setUser] = useState({});

    function search() {
        fetch(`http://localhost:4242/api/users/${username}`)
            .then(res => res.json())
            .then(response => setUser(response.user))
    }

    return (<View style={styles.container}>
        <TextInput
            onChangeText={setUsername}
            value={username}
        />

        <Button
            onPress={search}
            title="Search"
            color="#841584"
        />

        <View style={styles.container}>
            <FlatList
                data={Object.keys(user)}
                renderItem={({item}) => {
                    return (
                    <View style={styles.item}>
                        <Text>
                            {item}:
                        </Text>
                        <Text>
                            {user[item]}
                        </Text>
                    </View>)
                }}
            />
        </View>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        flexDirection: "row",
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
