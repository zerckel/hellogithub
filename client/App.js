import React, {useState} from 'react';
import {StyleSheet, Text, Button, View, TextInput, FlatList, Dimensions, SafeAreaView} from 'react-native';
const axios = require('axios')

export default function App() {
  const [username, setUsername] = useState("zerckel");
  const [user, setUser] = useState({});

  function search() {
    axios.get(`http://10.23.100.84:4242/api/users/${username}`)
            .then(response => setUser(response.data))
  }

  return (
          <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
              <View style={styles.header}>
                <TextInput
                        style={styles.input}
                        onChangeText={setUsername}
                        value={username}
                />

                <Button
                        onPress={search}
                        styles={styles.button}
                        title="Search"
                        color="#3700B3"
                />
              </View>
              <View style={styles.profile}>
                <FlatList
                        data={Object.keys(user)}
                        keyExtractor={(item) => item}
                        numColumns={false}
                        renderItem={({item}) => {
                          return (
                                  <View key={item} style={styles.card}>
                                    <Text style={styles.title}>
                                      {item}:
                                    </Text>
                                    <Text style={styles.content}>
                                      {user[item]}
                                    </Text>
                                  </View>)
                        }}
                />
              </View>
            </View>
          </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    marginTop: 30,
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "column",
  },
  input: {
    marginVertical: 10,
    backgroundColor: "#D3D3D3",
    borderRadius: 5,
    textAlign: "center",
  },
  button: {
    borderRadius: 5,
  },
  profile: {
    paddingVertical: 20,
    alignItems: "center"
  },
  card: {
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 5,
  },
  title: {
    fontSize: 20,
    textTransform: "uppercase",
    marginRight: 10
  }
});
