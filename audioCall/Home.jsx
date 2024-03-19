import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const Home = () => {
  const navigation = useNavigation();
  const [joinChannel, setJoinChannel] = useState('');
  const [agoraToken, setAgoraToken] = useState();

  const url = 'https://agroratoken.onrender.com';
  const url2 = 'http://10.0.2.2:2020';
  useEffect(() => {
    async function fetchData() {
      const {data} = await axios.get(
        `${url}/access_token?channelName=test&role=subscriber&uid=1234`,
      );
      await setAgoraToken(data.token);
    }
    fetchData();
  }, []);

  console.log('token', agoraToken);

  const goLive = () => {
    navigation.navigate('Call', {channel: 'test', token: agoraToken});
  };
  const joinLive = () => {
    if (joinChannel) {
      navigation.navigate('Call', {channel: joinChannel, token: agoraToken});
    } else {
      Alert.alert('Please provide channel name');
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          alignContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Text style={{fontSize: 20, color: '#000'}}>Go Live</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={goLive}
          style={{
            alignContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            backgroundColor: 'blue',
            width: '80%',
            marginHorizontal: '10%',
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 17, color: '#fff'}}>Start</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <TextInput
          placeholder="Enter channel name "
          value={joinChannel}
          onChangeText={text => setJoinChannel(text)}
          style={{
            borderWidth: 2,
            borderColor: '#000',
            width: '80%',
            padding: 2,
            borderRadius: 13,
            paddingLeft: 10,
            marginVertical: 10,
          }}
        />
        <TouchableOpacity
          onPress={joinLive}
          style={{
            backgroundColor: 'blue',
            width: '80%',
            alignItems: 'center',
            marginHorizontal: '10%',
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 17, color: '#fff'}}>Join</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
