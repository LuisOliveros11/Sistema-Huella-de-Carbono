import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Bar } from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import LogoSvg from '../icons/LogoSvg'
import { BASE_URL } from '../../config';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const UserForm = () => {
    const baseUrl = BASE_URL;
    const navigation = useNavigation();

    const questions = [
        { 
            code: 'Alimentos_01', 
            text: '1. ¿Con qué frecuencia consumes carne roja (res, cordero, cerdo)?', 
            options: [
                { label: 'A) Nunca / casi nunca.', value: 0 },
                { label: 'B) 1 vez a la semana.', value: 42.68 },
                { label: 'C) 2–3 veces por semana.', value: 106.7},
                { label: 'D) 4–6 veces por semana.', value: 213.4 },
                { label: 'E) Diariamente.', value: 298.76 }
            ]
        },
        { 
            code: 'Alimentos_02',
            text: '2. ¿Con qué frecuencia consumes pollo o pavo?', 
            options: [
                { label: 'A) Nunca / casi nunca.', value: 0 },      
                { label: 'B) 1 vez a la semana.', value: 7.28 },
                { label: 'C) 2–3 veces por semana.', value: 18.2 },
                { label: 'D) 4–6 veces por semana.', value: 36.4 },
                { label: 'E) Diariamente.', value: 50.96 }
            ],
        },
        { 
            code: 'Alimentos_03',
            text: '3. ¿Con qué frecuencia consumes pescado o mariscos?', 
            options: [
                { label: 'A) Nunca / casi nunca.', value: 0 },      
                { label: 'B) 1 vez a la semana.', value: 5.36 },
                { label: 'C) 2–3 veces por semana.', value: 13.4 },
                { label: 'D) 4–6 veces por semana.', value: 26.8 },
                { label: 'E) Diariamente.', value: 37.52 }
            ],
        },
        { 
            code: 'Alimentos_04',
            text: '4. ¿Con qué frecuencia consumes productos lácteos (leche, queso, yogur)?', 
            options: [
                { label: 'A) Nunca / casi nunca.', value: 0 },      
                { label: 'B) 1 vez a la semana.', value: 11.16 },
                { label: 'C) 2–3 veces por semana.', value: 27.9 },
                { label: 'D) 4–6 veces por semana.', value: 55.8 },
                { label: 'E) Diariamente.', value: 78.12 }
            ],
        },
        { 
            code: 'Alimentos_05',
            text: '5. ¿Cuánta comida de origen vegetal (frutas, verduras, legumbres, granos integrales) consumes?', 
            options: [
                { label: 'A) Nunca / casi nunca.', value: 0 },        
                { label: 'B) 1–3 veces/semana.', value: 11.312 },
                { label: 'C) 4–6 veces/semana.', value: 28.28 },
                { label: 'D) A diario (una porción).', value: 39.592 },
                { label: 'E) A diario (varias porciones).', value: 56.56 }
            ],
        },
        { 
            code: 'Alimentos_06',
            text: '6. ¿Qué proporción de tus comidas son preparadas en casa frente a comida para llevar/restaurant?', 
            options: [
                { label: 'A) Casi todo en casa (≥90)', value: 16 },    
                { label: 'B) Mayormente en casa (60–89%).', value: 48 },
                { label: 'C) Mitad y mitad (40–59%).', value: 112 },
                { label: 'D) Mayormente fuera (10–39%).', value: 160 },
                { label: 'E) Casi siempre fuera / delivery (≤10% en casa).', value: 224 }
            ],
        },
        { 
            code: 'Alimentos_07',
            text: '7. ¿Qué porcentaje aproximado de tus alimentos son procesados o ultraprocesados (comida rápida, snacks industriales)? ', 
            options: [
                { label: 'A) Muy poco (≤10%).', value: 2.69 },    
                { label: 'B) Bajo (11–25%).', value: 8.07 },
                { label: 'C) Moderado (26–50%).', value: 18.83 },
                { label: 'D) Alto (51–75%).', value: 26.9 },
                { label: 'E) Muy alto (>75%).', value: 37.66 }
            ],
        },
        { 
            code: 'Alimentos_08',
            text: '8. ¿Compras principalmente alimentos locales/estacionales o importados/ fuera de temporada?', 
            options: [
                { label: 'A) Principalmente locales/estacionales', value: 1 },    
                { label: 'B) Mayormente locales, algunos importados', value: 1.03 },
                { label: 'C) Mitad y mitad.', value: 1.06 },
                { label: 'D) Mayormente importados.', value: 1.10 },
                { label: 'E) Principalmente importados/ultra procesados.', value: 1.25 }
            ],
        },
        { 
            code: 'Alimentos_09',
            text: '9. ¿Con qué frecuencia desperdicias comida en casa (sobras que se tiran)?', 
            options: [
                { label: 'A) Casi nunca / siempre aprovecho.', value: 0 },    
                { label: 'B) Rara vez (≤1 vez/semana).', value: 5 },
                { label: 'C) Ocasionalmente (2–3 veces/semana).', value: 10 },
                { label: 'D) Frecuentemente (4–6 veces/semana).', value: 20 },
                { label: 'E) Muy frecuentemente (a diario).', value: 30 }
            ],
        },
        { 
            code: 'Alimentos_10',
            text: '10. ¿Consumes productos orgánicos con frecuencia (si/no)?    ', 
            options: [
                { label: 'A) Casi todo orgánico.', value: 0.27 },    
                { label: 'B) Mucho orgánico (≥50%).', value: 0.195 },
                { label: 'C) Algo orgánico (20–49%).', value: 0.105 },
                { label: 'D) Poco orgánico (1–19%). ', value: 0.03 },
                { label: 'E) Nunca / no disponible.', value: 0 }
            ],
        },
    ];

    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const selectAnswer = (optionIndex) => {
        const option = questions[currentQuestion].options[optionIndex];
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = {
            index: optionIndex,
            label: option.label,
            value: option.value,     
            code: questions[currentQuestion].code
        };
        setAnswers(newAnswers);
    };

    const sendResponsesToApi = async (payload) => {
        try {
            const resp = await fetch(`${baseUrl}/calcularHuellaAlimentos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!resp.ok) {
                const text = await resp.text();
                throw new Error(`${resp.status} ${text}`);
            }
            const data = await resp.json();
            Alert.alert('Resultado', `Tu huella: ${data.total_kgCO2e} kgCO2e`);
        } catch (err) {
            console.error('Error al enviar respuestas', err);
            Alert.alert('Error', 'No se pudo enviar el cuestionario. Revisa la conexión.');
        }
    };

    const nextQuestion = () => {
        if (!answers[currentQuestion]) {
            Alert.alert('Atención', 'Selecciona una opción antes de continuar');
            return;
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            return;
        }

        const userId = 123; 
        const responsesPayload = answers.map(a => {
            if (!a) return null;
            return {
                code: a.code,
                optionIndex: a.index,
                label: a.label,
                value: a.value
            };
        }).filter(Boolean);

        const payload = {
            user_id: userId,
            responses: responsesPayload
        };

        sendResponsesToApi(payload);
    };

    const progress = (currentQuestion) / questions.length;

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

               {questions[currentQuestion].options.map((opt, index) => (
                    <TouchableOpacity key={index} onPress={() => selectAnswer(index)} style={styles.checkboxContainer}>
                        <View style={[styles.circle, answers[currentQuestion]?.index === index && styles.checked]}>
                            {answers[currentQuestion]?.index === index && <View style={styles.innerCircle} />}
                        </View>
                        <Text style={styles.checkboxText}>{opt.label}</Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity onPress={nextQuestion}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>
                            {currentQuestion < questions.length - 1 ? 'Siguiente' : 'Enviar'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaProvider >
    );
};

export default UserForm;

const styles = StyleSheet.create({
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
        fontWeight: '700'
    },
    iconsContainer: {
        justifyContent: 'space-between', 
        alignItems: 'center',      
        marginTop: 20,       
    },
    iconItem: {
        alignItems: 'center',
    },
    questionText: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 15,
        marginBottom: 20
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
    checkboxText: {
        marginLeft: 10, 
        fontSize: 14,
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
        marginTop: screenHeight * 0.03,
    },
    btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
});
