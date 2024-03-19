import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {Text, StyleSheet} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
const Caller = () => {
  const [videoCall, setVideoCall] = useState(true);
  const route = useRoute();
  const data = route.params;
  const navigation = useNavigation();

  console.log(data);
  const connectionData = {
    token: data.token,
    appId: 'd241ed14d12c4c0b95085c1692606a9f',
    channel: data.channel,
  };
  const rtcCallbacks = {
    EndCall: () => {
      setVideoCall(false);
      navigation.navigate('Home');
    },
  };
  return videoCall ? (
    <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
  ) : (
    <Text onPress={() => setVideoCall(true)}>Start Call</Text>
  );
};

export default Caller;

const styles = StyleSheet.create({});
