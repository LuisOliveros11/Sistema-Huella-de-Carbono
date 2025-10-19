import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
    useNavigation,
} from '@react-navigation/native';
import { User } from 'react-feather';
//import { AuthContext } from '../Components/AuthContext';
//import { BASE_URL } from '../../config'; 


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const UserForm = () => {
    const navigation = useNavigation();
    //const { login } = useContext(AuthContext);
    //const baseUrl = BASE_URL;

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#e8ecf4' }} >
            <View style={styles.imgContainer}>

                <Image
                    source={require('../../assets/cuestionario-portada.jpg')}
                    style={styles.headerImg}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Responde a las preguntas de cada categoría</Text>
                <View style={styles.iconsContainer}>
                    <View style={styles.iconItem}>
                        <Ionicons name="fast-food" size={74} color="white" />
                        <Text style={styles.iconLabel}>Alimentación</Text>
                    </View>
                    <View style={styles.iconItem}>
                        <FontAwesome5 name="bus" size={74} color="white" />
                        <Text style={styles.iconLabel}>Transporte</Text>
                    </View>
                    <View style={styles.iconItem}>
                        <FontAwesome name="heartbeat" size={74} color="white" />
                        <Text style={styles.iconLabel}>Estilo de vida</Text>
                    </View>
                </View>
                <TouchableOpacity >
                    <View style={styles.btn}>
                    <Text style={styles.btnText}>Comenzar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaProvider >
    );
};

export default UserForm;


const styles = StyleSheet.create({
    imgContainer: {
        height: screenHeight * 0.35,
        width: screenWidth,

    },
    headerImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', 
    },
    container: {
        padding: 24,
        flex: 1,
        backgroundColor: '#4CA200',
         justifyContent: 'flex-start'
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 700
    },
    iconsContainer: {
        flexDirection: 'row',     
        justifyContent: 'space-between', 
        alignItems: 'center',      
        marginTop: 20,       
    },
    
    iconItem: {
        alignItems: 'center',
    },

    iconLabel: {
        color: '#fff',
        fontSize: 16,
        marginTop: 12,
        textAlign: 'center',
    },
    btn: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: screenHeight * 0.06,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#20D30F',
  },


})