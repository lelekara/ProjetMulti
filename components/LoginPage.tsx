import React from 'react';
import {Button, SafeAreaView, StyleSheet, TextInput,Alert, Keyboard, View,Text, ImageBackground} from 'react-native';


const LoginPage = ({ navigation }) => {
  const [nom, onChangeText] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const handleLogin = () => {
    if (nom === 'Admin' && password === 'admin') {
      setLoggedIn(true);
      Keyboard.dismiss();
      navigation.navigate('Menu');
    } else {
      setLoggedIn(false);
      Alert.alert('Identifiants incorrects. Veuillez réessayer.');
    }
  };
  return (
    <ImageBackground source={require('../assets/Wallpaper.jpeg')} style={{width: '100%', height: '100%'}}>
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}> Enter your Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={nom}
        placeholder="username"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="password"
        keyboardType="default"
        secureTextEntry={true}
      />
      <View style={styles.button}>
      <Button
          title="Login"
          color="#000000"
          onPress={handleLogin}
        />
      </View>
    </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20
  },
  button: {
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 1,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10
  },
  text: {
    justifyContent:'center',
    textAlign:'center',
    color: 'white',
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold'
  },
});

export default LoginPage;