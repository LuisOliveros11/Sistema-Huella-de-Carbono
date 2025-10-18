import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  useNavigation,
} from '@react-navigation/native';
//import { AuthContext } from '../Components/AuthContext';
//import { BASE_URL } from '../../config'; 

const Login = () => {
  const navigation = useNavigation();
  //const { login } = useContext(AuthContext);
  //const baseUrl = BASE_URL;
  
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#e8ecf4' }} >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/login_logo.png')}
            style={styles.headerImg}
          />
          <Text style={styles.title}>Pantalla de Login</Text>
          <Text style={styles.subtitle}>Accede a tus datos y más</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Correo electrónico</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={email => setForm({ ...form, email })}
                placeholder="anonimo@gmail.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControlWithIcon}
                value={form.email} 
              />
              <FeatherIcon name="at-sign" size={20} color="#134ded" style={styles.inputIcon} />
            </View>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <View style={styles.inputWithIcon}>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={password => setForm({ ...form, password })}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControlWithIcon}
              secureTextEntry={true}
              value={form.password} 
            />
            <FeatherIcon name="lock" size={20} color="#134ded" style={styles.inputIcon} />
            </View>
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={async () => {
               navigation.navigate("Tabs", { screen: "Home" });

              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{ marginTop: 'auto' }}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={styles.formFooter}>
              ¿No tienes una cuenta?{' '}
              <Text style={{ textDecorationLine: 'underline' }}>Registrate</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>



    </SafeAreaProvider >
  );
};

export default Login;


const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,

  },
  header: {
    marginVertical: 36,

  },

  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: "1e1e1e",
    marginBottom: 6,
    alignSelf: 'center'
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center'
  },
  form: {
    marginBottom: 24,
    flex: 1

  },
  formAction: {
    marginVertical: 24
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15
  },
  input: {
    marginBottom: 16
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: 500,
    color: '#222',
    marginBottom: 8
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },

  inputControlWithIcon: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },

  inputIcon: {
    marginLeft: 8,
  },
  btn: {
    backgroundColor: '#075eec',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#075eec',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'

  }

})