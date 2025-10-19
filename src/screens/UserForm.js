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
import LogoSvg from '../icons/LogoSvg';


import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Bar } from 'react-native-progress';

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
    const [checked, setChecked] = useState([false, false, false, false]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([null, null, null, null]); // uno por pregunta

    const questions = [
        { 
        text: '¿Cuál es tu color favorito?', 
        options: ['Rojo', 'Azul', 'Verde', 'Amarillo'] 
        },
        { 
        text: '¿Cuál es tu comida favorita?', 
        options: ['Pizza', 'Hamburguesa', 'Tacos', 'Ensalada'] 
        },
    ];
    const selectAnswer = (optionIndex) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = optionIndex; // solo un checkbox marcado
        setAnswers(newAnswers);
    };
    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // terminar cuestionario o navegar a otra pantalla
        }
    };
    const progress = (currentQuestion) / questions.length;
    //const { login } = useContext(AuthContext);
    //const baseUrl = BASE_URL;

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#e8ecf4' }} >
            <View style={styles.container}>
                <View style={styles.progressContainer}>
                    <Bar 
                        progress={progress} width={screenWidth - 48} 
                        height={screenHeight * .020} 
                        borderRadius={16}
                        color='#66DB00'
                        backgroundColor="#D2D1D1"
                        borderColor='#D2D1D1'  
                    />
                    <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>     
                </View>
                <Text style={styles.title}>Contesta las preguntas</Text>
                <View style={styles.iconsContainer}>
                    <View style={styles.iconItem}>
                        <LogoSvg width={screenWidth * 0.34} height={150} />
                    </View>
                </View>
                <Text style={styles.questionText}>{questions[currentQuestion].text}</Text>
               {questions[currentQuestion].options.map((label, index) => (
                    <TouchableOpacity key={index} onPress={() => selectAnswer(index)} style={styles.checkboxContainer}>
                        <View style={[styles.circle, answers[currentQuestion] === index && styles.checked]}>
                            {answers[currentQuestion] === index && <View style={styles.innerCircle} />}
                        </View>
                        <Text style={styles.checkboxText}>{label}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={nextQuestion}>
                    <View style={styles.btn}>
                    <Text style={styles.btnText}>Siguiente</Text>
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
    progressContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        position: 'relative',
    },
    progressText: {
        position: 'absolute',
        color: '#000',
        fontWeight: '600',
    },
    container: {
        padding: 24,
        flex: 1,
        backgroundColor: '#ffffffff',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 20,
        textAlign: 'justify',
        color: '#000000ff',
        marginTop: 30,
        fontWeight: 700
    },
    iconsContainer: {
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
    questionText: {
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 18,
        marginBottom: 40
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#B7B7B7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        borderColor: '#B7B7B7',
    },
    innerCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#66DB00',
    },
    checkBoxTextContainer: {
         flexDirection: 'row', // organiza círculo y texto en fila
    alignItems: 'center', // centra verticalmente
    },
    checkboxText: {
        marginLeft: 10, 
        fontSize: 16,
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
        paddingHorizontal: 20,
        marginTop: screenHeight * 0.06,
    },
    btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },


})