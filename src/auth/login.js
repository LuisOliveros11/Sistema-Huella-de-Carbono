import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../components/AuthContext';
import { BASE_URL } from '../../config';

const Login = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const baseUrl = BASE_URL;

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                source={require('../../assets/huella_verde.png')}
                style={styles.headerImg}
              />
              <Text style={styles.title}>Iniciar Sesión</Text>
              <Text style={styles.subtitle}>
                Tu compromiso con el planeta comienza aquí
              </Text>
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
                    onChangeText={(email) => setForm({ ...form, email })}
                    placeholder="anonimo@gmail.com"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControlWithIcon}
                    value={form.email}
                  />
                  <FeatherIcon
                    name="at-sign"
                    size={20}
                    color="#044e07ff"
                    style={styles.inputIcon}
                  />
                </View>
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Contraseña</Text>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    onChangeText={(password) => setForm({ ...form, password })}
                    placeholder="********"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControlWithIcon}
                    secureTextEntry={!showPassword}
                    value={form.password}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <FeatherIcon
                      name={showPassword ? 'eye' : 'eye-off'}
                      size={20}
                      color="#044e07ff"
                      style={styles.inputIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.formAction}>
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      const response = await fetch(`${baseUrl}/iniciarSesion`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          correo: form.email,
                          contrasena: form.password,
                        }),
                      });

                      const data = await response.json();

                      if (response.ok) {
                        await login(data.token);
                        navigation.navigate('Tabs', { screen: 'Home' });
                      } else {
                        alert(data.message || 'Error al iniciar sesión');
                      }
                    } catch (error) {
                      console.error('Error al iniciar sesión:', error);
                      alert('No se pudo conectar al servidor.');
                    }
                  }}
                >
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Login</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{ marginTop: 'auto' }}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.formFooter}>
                  ¿No tienes una cuenta?{' '}
                  <Text style={{ textDecorationLine: 'underline' }}>Registrate</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
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
    width: 200,
    height: 200, //200
    alignSelf: 'center',
    marginBottom: 5
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
    backgroundColor: '#07920eff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#044e07ff',
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