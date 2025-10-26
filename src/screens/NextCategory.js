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
import LifeStyleCategorySvg from '../icons/LifeStyleCategory';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
    useNavigation,
} from '@react-navigation/native';
import { User } from 'react-feather';
//import { AuthContext } from '../Components/AuthContext';
//import { BASE_URL } from '../../config'; 


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const NextCategory = ({ route }) => {
    const navigation = useNavigation();
    const category = route?.params?.category || 'Estilo de vida';
    let title = ''
    if (category == 'Estilo de vida'){
        title = 'Las preguntas están relacionadas con los hábitos cotidianos del usuario, como su rutina diaria, tiempo libre, actividades recreativas y estilo de vida general, con el objetivo de comprender mejor sus comportamientos y preferencias personales.'
    }
    if (category == 'Transporte'){
        title = 'Las preguntas están relacionadas con los hábitos de movilidad del usuario, como el uso de transporte público, vehículo propio, bicicleta o caminatas, con el objetivo de evaluar el impacto ambiental asociado a sus desplazamientos diarios.'
    }
    //const { login } = useContext(AuthContext);
    //const baseUrl = BASE_URL;

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#e8ecf4' }} >
            <View style={styles.container}>
                <View style={styles.iconItem}>
                    <LifeStyleCategorySvg width={170} height={170} />
                </View>
                <Text style={styles.title}>{category}</Text>
                <Text style={styles.description}>{title}</Text>
                
                <TouchableOpacity onPress={async () => {
                    navigation.navigate('UserForm', { category: category });
                }}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Comenzar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaProvider >
    );
};

export default NextCategory;


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
        marginTop: screenHeight * 0.1,
        fontSize: 22,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 700
    },
    description: {
        marginTop: screenHeight * 0.01,
        fontSize: 14,
        textAlign: 'justify',
        color: '#fff'
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
        marginTop: screenHeight * 0.1, //0.06
    },
    btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#20D30F',
    },

    iconItem: {
        alignItems: 'center',
        marginTop: screenHeight * .1
    },


})