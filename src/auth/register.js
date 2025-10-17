import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { BASE_URL } from '../../config';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const Register = () => {
  const navigation = useNavigation();
  const baseUrl = BASE_URL;
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/crearUsuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: form.username,
          correo: form.email,
          contrasena: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Usuario registrado',
          textBody: data.message,
          autoClose: 800,
          onHide: () => {
            navigation.goBack();
          },
        });
      } else {
        alert(data.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('No se pudo conectar al servidor.');
    }
  };

  return (
   <SafeAreaProvider style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Image
              source={require('../../assets/login_logo.png')}
              style={styles.headerImg}
            />
            <Text style={styles.title}>Pantalla de Registro</Text>
            <Text style={styles.subtitle}>Crea tu cuenta en la plataforma</Text>
          </View>

          {/* Formulario */}
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            extraScrollHeight={Platform.OS === 'ios' ? 100 : 120}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false} 
          >
            <View style={styles.form}>
              {/* Usuario */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Usuario</Text>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    onChangeText={(username) => setForm({ ...form, username })}
                    placeholder="tu_usuario"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControlWithIcon}
                    value={form.username}
                  />
                  <FeatherIcon
                    name="user"
                    size={20}
                    color="#134ded"
                    style={styles.inputIcon}
                  />
                </View>
              </View>

              {/* Correo */}
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
                    color="#134ded"
                    style={styles.inputIcon}
                  />
                </View>
              </View>

              {/* Contraseña */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Contraseña</Text>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    onChangeText={(password) => setForm({ ...form, password })}
                    placeholder="********"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControlWithIcon}
                    secureTextEntry={true}
                    value={form.password}
                  />
                  <FeatherIcon
                    name="lock"
                    size={20}
                    color="#134ded"
                    style={styles.inputIcon}
                  />
                </View>
              </View>

              {/* Confirmar Contraseña */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Confirmar contraseña</Text>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    onChangeText={(confirmPassword) =>
                      setForm({ ...form, confirmPassword })
                    }
                    placeholder="********"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControlWithIcon}
                    secureTextEntry={true}
                    value={form.confirmPassword}
                  />
                  <FeatherIcon
                    name="lock"
                    size={20}
                    color="#134ded"
                    style={styles.inputIcon}
                  />
                </View>
              </View>

              {/* Botón */}
              <View style={styles.formAction}>
                <TouchableOpacity onPress={handleRegister}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Registrate</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaProvider>
   
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  header: {
    marginVertical: 10,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#1e1e1e',
    marginBottom: 6,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
    flex: 1,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    marginBottom: 8,
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
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});