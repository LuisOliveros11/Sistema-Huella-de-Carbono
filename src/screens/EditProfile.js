import React, { useState, useContext } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import { useNavigation, } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
import { SafeAreaProvider } from 'react-native-safe-area-context';


const EditProfile = () => {
    const navigation = useNavigation();
    //const baseUrl = BASE_URL;
    const [form, setForm] = useState({
        username: '',
        email: '',
    });
    //const { authToken, userData, updateUserData } = useContext(AuthContext);
    return (
        <SafeAreaProvider style={styles.container}>
            <View style={styles.TextContainer}>
                <Text style={styles.descriptionText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.form}>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Nombre</Text>
                        <View style={styles.inputWithIcon}>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                onChangeText={username => setForm({ ...form, username })}
                                //placeholder={userData.name}
                                placeholderTextColor="#6b7280"
                                style={styles.inputControlWithIcon}
                                value={form.username}
                            />
                            <FeatherIcon name="user" size={20} color="#134ded" style={styles.inputIcon} />
                        </View>
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Correo electrónico</Text>
                        <View style={styles.inputWithIcon}>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                keyboardType="email-address"
                                onChangeText={email => setForm({ ...form, email })}
                                //placeholder={userData.email}
                                placeholderTextColor="#6b7280"
                                style={styles.inputControlWithIcon}
                                value={form.email}
                            />
                            <FeatherIcon name="at-sign" size={20} color="#134ded" style={styles.inputIcon} />
                        </View>
                    </View>


                    <View style={styles.formAction}>
                        <TouchableOpacity
                            onPress={async () => {

                                /*try {
                            
                                    const response = await fetch(`${baseUrl}/actualizarUsuario/${userData.id}`, {
                                        method: "PUT",
                                        headers: {
                                            "Content-Type": "application/json",
                                            'Authorization': `Bearer ${authToken}`,
                                        },
                                        body: JSON.stringify({
                                            name: form.username,
                                            email: form.email
                                        })
                                    });

                                    const data = await response.json();

                                    if (response.ok) {
                                        updateUserData({
                                            name: form.username || userData.name,
                                            email: form.email || userData.email
                                        });
                                        alert("Los datos se han actualizado exitosamente");
                                        navigation.goBack();
                                    } else {
                                        alert(data.message || "Error al actualizar los datos");
                                    }

                                } catch (error) {
                                    console.error("Error al actualizar los datos:", error);
                                    alert("No se pudo conectar al servidor.");
                                }*/
                            }}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Editar perfil</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>
        </SafeAreaProvider>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    TextContainer: {
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: '600'
    },
    descriptionText: {
        marginTop: 10,
        width: screenWidth - 45,
        fontSize: 14,
        color: '#8c8c8c',
        textAlign: 'justify'
    },
    header: {
        marginVertical: 10,

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
        marginTop: 24,
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
    btn: {
        backgroundColor: '#66DB00',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#66DB00',
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

    },
    input: {
        marginBottom: 24
    },
    inputLabel: {
        fontSize: 15,
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

});