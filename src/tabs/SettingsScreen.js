import React, { useContext, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather'
//import { AuthContext } from '../Components/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

const SettingsScreen = () => {
    const navigation = useNavigation();
    //const { authToken, userData, logout } = useContext(AuthContext);
    const sheetRef = useRef();

    const handleLogout = async () => {
        try {
            await logout();
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                })
            );
        } catch (e) {
            console.error('Error al cerrar sesión:', e);
        }
    };
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.profile}>
                    <Text style={styles.profileName}>Nombres</Text>
                    <Text style={styles.profileAddress}>Correo electronico</Text>
                </View>

                {/* Secciones que tendrá el apartado de ajustes/settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Datos de la cuenta</Text>
                    <TouchableOpacity onPress={() => {
                        //
                    }}>
                        <View style={styles.row}>
                            <View style={[styles.rowIcon, { backgroundColor: "#5ec206ff" }]}>
                                <FeatherIcon name="lock" color="#fff" size={18}></FeatherIcon>
                            </View>
                            <Text style={[styles.rowLabel, { flex: 1 }]}>Cambiar contraseña</Text>


                            <FeatherIcon
                                name="chevron-right"
                                color="#0c0c0c"
                                size={22}
                            />
                        </View>

                    </TouchableOpacity>
                     <TouchableOpacity onPress={() => {
                        //
                    }}>
                        <View style={styles.row}>
                            <View style={[styles.rowIcon, { backgroundColor: "#5ec206ff" }]}>
                                <FeatherIcon name="edit-3" color="#fff" size={18}></FeatherIcon>
                            </View>
                            <Text style={[styles.rowLabel, { flex: 1 }]}>Cambiar contraseña</Text>


                            <FeatherIcon
                                name="chevron-right"
                                color="#0c0c0c"
                                size={22}
                            />
                        </View>

                    </TouchableOpacity>
                </View>


                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Sesión</Text>
                    <TouchableOpacity  > 
                        <View style={styles.row}>
                            <View style={[styles.rowIcon, { backgroundColor: "#5ec206ff" }]}>
                                <FeatherIcon name="log-out" color="#fff" size={18}></FeatherIcon>
                            </View>
                            <Text style={[styles.rowLabel, { flex: 1 }]}>Cerrar sesión</Text>
                            <FeatherIcon
                                name="chevron-right"
                                color="#0c0c0c"
                                size={22}
                            />
                        </View>

                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
    },
    profile: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileName: {
        fontSize: 21,
    },
    profileAddress: {
        marginTop: 5,
        fontSize: 16,
        color: '#989898',
        textAlign: 'center'
    },
    profileAvatar: {
        width: 90,
        height: 90,
        borderRadius: 9999,
    },
    profileAvatarWrapper: {
        position: 'relative'
    },
    profileAction: {
        width: 28,
        height: 28,
        borderRadius: 9999,
        backgroundColor: '#007bff',
        right: -60,
        bottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    section: {
        paddingHorizontal: 24,
    },
    sectionHeader: {
        paddingVertical: 12,
        fontSize: 12,
        fontWeight: '600',
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: 1.1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '50',
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 12
    },
    rowIcon: {
        width: 32,
        height: 32,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12
    },
    arrowIcon: {
        alignItems: 'flex-end'
    }
});