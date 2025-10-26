import React, { useContext, useState } from 'react';

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
import LifeStyleCategorySvg from '../icons/LifeStyleCategory';
import TransportCategory from '../icons/TransportCategory';
import { BASE_URL } from '../../config';
import { AuthContext } from '../components/AuthContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const UserForm = ({ route }) => {
    const category = route?.params?.category || 'Alimentos';
    const baseUrl = BASE_URL;
    const navigation = useNavigation();
    const { authToken, userData, logout } = useContext(AuthContext);



    const questions = category === 'Estilo de vida'
        ? [
            {
                code: 'EstiloVida_01',
                text: '1. ¿Cuánto pagas aproximadamente de luz cada mes?',
                options: [
                    { label: 'A) Menos de $150 MXN/mes.', value: 41 },
                    { label: 'B) Entre $150 y $300 MXN/mes.', value: 80 },
                    { label: 'C) Entre $351 y $700 MXN/mes.', value: 170 },
                    { label: 'D) Entre $701 y $1100 MXN/mes.', value: 296 },
                    { label: 'E) Más de $1100 MXN/mes.', value: 410 },
                ]
            },
            {
                code: 'EstiloVida_02',
                text: '2. ¿Tu vivienda usa calefacción o aire acondicionado con frecuencia?',
                options: [
                    { label: 'A) No uso ninguno.', value: 5 },
                    { label: 'B) Uso poco (ocasional).', value: 4 },
                    { label: 'C) Uso moderado (estaciones).', value: 3 },
                    { label: 'D) Uso frecuente (varias horas diarias).', value: 1 },
                    { label: 'E) Uso todo el tiempo / intensivo.', value: 0 },
                ]
            },
            {
                code: 'EstiloVida_03',
                text: '3. ¿Utilizas energías renovables (paneles solares, proveedor verde) en tu hogar?',
                options: [
                    { label: 'A) Sí, completamente (paneles o 100% proveedor verde)', value: 5 },
                    { label: 'B) Sí, parcialmente.', value: 4 },
                    { label: 'C) Planeo hacerlo pero no aún.', value: 1 },
                    { label: 'D) No y no planeo.', value: 0 },
                    { label: 'E) No sé / no aplica.', value: 0 },
                ]
            },
            {
                code: 'EstiloVida_04',
                text: '4. ¿Cuántas duchas de 5–10 minutos tomas al día en promedio?',
                options: [
                    { label: 'A) 1 ducha corta.', value: 0.295 },
                    { label: 'B) 2 duchas cortas.', value: 0.59 },
                    { label: 'C) 3 duchas cortas.', value: 0.885 },
                    { label: 'D) 3+ duchas cortas.', value: 1.18 },
                ]
            },
            {
                code: 'EstiloVida_05',
                text: '5. ¿Reciclas y separas residuos en tu hogar con regularidad?',
                options: [
                    { label: 'A) Sí, siempre y correctamente.', value: 5 },
                    { label: 'B) Sí, en gran parte.', value: 4 },
                    { label: 'C) A veces.', value: 3 },
                    { label: 'D) Rara vez.', value: 1 },
                    { label: 'E) Nunca.', value: 0 },
                ]
            },
            {
                code: 'EstiloVida_06',
                text: '6. ¿Con qué frecuencia compras ropa nueva?',
                options: [
                    { label: 'A) Casi nunca, compro ropa de calidad y duradera.', value: 0.5875 },
                    { label: 'B) 1–2 veces al año.', value: 1.7625 },
                    { label: 'C) 3–6 veces al año.', value: 5.2875 },
                    { label: 'D) 7–12 veces al año (frecuente).', value: 11.1625 },
                    { label: 'E) >12 veces al año (muy frecuente / compras impulsivas).', value: 17.625 },
                ]
            },
            {
                code: 'EstiloVida_07',
                text: '7. ¿Qué tan seguido realizas mantenimiento para eficiencia energética en tu hogar (aislamiento, sellado, bombillas LED)?',
                options: [
                    { label: 'A) Regularmente (cada año).', value: 5 },
                    { label: 'B) Ocasionalmente (cada 2–3 años).', value: 4 },
                    { label: 'C) Muy poco (cada 4–7 años).', value: 2 },
                    { label: 'D) Nunca.', value: 0 },
                    { label: 'E) No aplica / no sé.', value: 0 },
                ]
            },
            {
                code: 'EstiloVida_08',
                text: '8. ¿Con qué frecuencia compras productos nuevos (electrónicos, electrodomésticos) en un año?',
                options: [
                    { label: 'A) Casi nunca (0–1).', value: 8.3 },
                    { label: 'B) 2–3 veces.', value: 41.6 },
                    { label: 'C) 4–6 veces', value: 83.3 },
                    { label: 'D) 7–10 veces.', value: 141.6 },
                    { label: 'E) >10 veces.', value: 191.6 },
                ]
            },
            {
                code: 'EstiloVida_09',
                text: '9. ¿Trabajas desde casa (HomeOffice) cuántos días a la semana en promedio?',
                options: [
                    { label: 'A) 5 días (completamente remoto).', value: 5 },
                    { label: 'B) 3–4 días.', value: 3 },
                    { label: 'C) 1–2 días.', value: 1 },
                    { label: 'D) Casi nunca (0–1 al mes).', value: 0 },
                    { label: 'E) Nunca (siempre presencial).', value: 0 },
                ]
            },
            {
                code: 'EstiloVida_10',
                text: '10. ¿Participas activamente en prácticas de consumo responsable (segunda mano, reparar antes de reemplazar, préstamos/trueque)?',
                options: [
                    { label: 'A) Sí, siempre.', value: 5 },
                    { label: 'B) A menudo.', value: 4 },
                    { label: 'C) Algunas veces.', value: 3 },
                    { label: 'D) Rara vez.', value: 2 },
                    { label: 'E) Nunca.', value: 0 },
                ]
            },
        ]
        : category === 'Transporte'
            ? [
                {
                    code: 'Transporte_01',
                    text: '1. ¿Tienes vehículo propio?',
                    options: [
                        { label: 'A) Si', value: true },
                        { label: 'B) No', value: false },
                    ]
                },
                {
                    code: 'Transporte_02',
                    text: '2. Si usas automóvil, ¿qué tipo de combustible utiliza?',
                    options: [
                        { label: 'A) Eléctrico ', value: 0.153 },
                        { label: 'B) Híbrido (eléctrico + gasolina).', value: 0.117 },
                        { label: 'C) Gasolina.', value: 0.197 },
                        { label: 'D) Diesel.', value: 0.131 },
                        { label: 'E) No tengo automóvil.', value: 0 },
                    ]
                },
                {
                    code: 'Transporte_03',
                    text: '3. ¿Tu vehículo (si tienes) es de qué antigüedad aproximada?',
                    options: [
                        { label: 'A) 0–3 años.', value: 0.95 },
                        { label: 'B) 4–8 años.', value: 1 },
                        { label: 'C) 9-15 años.', value: 1.10 },
                        { label: 'D) >15 años.', value: 1.2 },
                        { label: 'E) No tengo automóvil.', value: 0 },
                    ]
                },
                {
                    code: 'Transporte_04',
                    text: '4. ¿Cuál es tu modo de transporte principal para ir al trabajo/estudios?',
                    options: [
                        { label: 'A) A pie.', value: 0 },
                        { label: 'B) Auto propio.', value: null },
                        { label: 'C) Bicicleta / patín eléctrico.', value: 0.011 },
                        { label: 'D) Transporte público (bus).', value: 0.049 },
                        { label: 'E) Auto compartido / taxi ocasional.', value: 0.09 },
                    ]
                },
                {
                    code: 'Transporte_05',
                    text: '5. ¿Cuántos kilómetros (ida y vuelta) recorres al día para tu desplazamiento habitual?',
                    options: [
                        { label: 'A) 0–2 km.', value: 1 },
                        { label: 'B) 3–10 km.', value: 6.5 },
                        { label: 'C) 11–25 km.', value: 18 },
                        { label: 'D) 26–50 km.', value: 38 },
                        { label: 'E) >50 km.', value: 70 },
                    ]
                },
                {
                    code: 'Transporte_06',
                    text: '6.¿Con qué frecuencia usas transporte público en la semana (sumando todos los viajes)?',
                    options: [
                        { label: 'A) Nunca.', value: 0 },
                        { label: 'B) 1–2 viajes/semana.', value: 0.588 },
                        { label: 'C) 3–7 viajes/semana.', value: 1.96 },
                        { label: 'D) 8–20 viajes/semana.', value: 5.488 },
                        { label: 'E) >20 viajes/semana.', value: 9.8 },
                    ]
                },
                {
                    code: 'Transporte_07',
                    text: '7. ¿Sueles compartir vehículo (Uber, Didi, etc) o viajas solo en el automóvil?',
                    options: [
                        { label: 'A) Siempre comparto.', value: 5 },
                        { label: 'B) A menudo comparto.', value: 4 },
                        { label: 'C) A veces comparto.', value: 3 },
                        { label: 'D) Casi siempre viajo solo.', value: 1 },
                        { label: 'E) Siempre viajo solo.', value: 0 },
                    ]
                },
                {
                    code: 'Transporte_08',
                    text: '8. ¿Con qué frecuencia realizas viajes largos en auto (fines de semana/escapadas) por mes?',
                    options: [
                        { label: 'A) 0 veces.', value: 0 },
                        { label: 'B) 1 vez al mes.', value: 1 },
                        { label: 'C) 2–3 veces al mes.', value: 2.5 },
                        { label: 'D) 4–6 veces al mes.', value: 5 },
                        { label: 'E) >6 veces al mes.', value: 8 },
                    ]
                },
                {
                    code: 'Transporte_09',
                    text: '9. Para distancias cortas (<5 km), ¿qué eliges normalmente?',
                    options: [
                        { label: 'A) Caminar.', value: 5 },
                        { label: 'B) Bicicleta / patín.', value: 4 },
                        { label: 'C) Transporte público.', value: 3 },
                        { label: 'D) Moto / scooter.', value: 1 },
                        { label: 'E) Auto.', value: 0 },
                    ]
                },
                {
                    code: 'Transporte_10',
                    text: '10. ¿Has tomado vuelos nacionales o internacionales en el último año?',
                    options: [
                        { label: 'A) Si', value: true },
                        { label: 'B) No', value: false },
                    ]
                },
                {
                    code: 'Transporte_11',
                    text: '11.	¿Cuánto tiempo duró ese vuelo?',
                    options: [
                        { label: 'A) Menos de 1 hora.', value: 102.2 },
                        { label: 'B) 1–2 horas.', value: 306.6 },
                        { label: 'C) 2-4 horas.', value: 613.2 },
                        { label: 'D) 4–8 horas ', value: 1226.4 },
                        { label: 'E) Más de 8 horas.', value: 1635.2 },
                        { label: 'F) No tomé ningún vuelo.', value: 0 },
                    ]
                },
                {
                    code: 'Transporte_12',
                    text: '12. ¿Con qué frecuencia realizas vuelos nacionales o internacionales al año de ese estilo    ?',
                    options: [
                        { label: 'A) 1 vuelo cada varios años.', value: 1 },
                        { label: 'B) 1–2 vuelos al año.', value: 1.5 },
                        { label: 'C) 3–5 vuelos al año.', value: 4 },
                        { label: 'D) >5 vuelos al año.', value: 6.5 },
                        { label: 'E) No suelo tomar vuelos.', value: 0 },
                    ]
                },
            ]
            : [
                {
                    code: 'Alimentos_01',
                    text: '1. ¿Con qué frecuencia consumes carne roja (res, cordero, cerdo)?',
                    options: [
                        { label: 'A) Nunca / casi nunca.', value: 0 },
                        { label: 'B) 1 vez a la semana.', value: 42.68 },
                        { label: 'C) 2–3 veces por semana.', value: 106.7 },
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
                    text: '10. ¿Consumes productos orgánicos con frecuencia (si/no)?',
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
    const { huellaGlobal, setHuellaGlobal } = useContext(AuthContext);

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

    const nextQuestion = async () => {
        if (!answers[currentQuestion]) {
            Alert.alert('Atención', 'Selecciona una opción antes de continuar');
            return;
        }
        if (category === 'Alimentos' && currentQuestion === questions.length - 1) {
            const payload = {
                user_id: userData.id,
                responses: answers.map(a => ({
                    code: a.code,
                    optionIndex: a.index,
                    label: a.label,
                    value: a.value
                }))
            };

            try {
                const resp = await fetch(`${baseUrl}/calcularHuellaAlimentos`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!resp.ok) throw new Error('Error al calcular huella');
                const data = await resp.json();
                setHuellaGlobal(prev => ({ ...prev, alimentos: data.total_kgCO2e }));

            } catch (err) {
                console.error(err);
                Alert.alert('Error', 'No se pudo calcular la huella de alimentos');
                return; // Salimos para no avanzar si hay error
            }
        }

        const userId = userData.id;
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

        // Mostrar la suma en la última pregunta de transporte
        if (category === 'Transporte' && currentQuestion === questions.length - 1) {
            Alert.alert(
                'Tu huella total',
                `Huella de alimentos: ${huellaGlobal.alimentos} kgCO2e\nTotal actual: ${huellaGlobal.alimentos} kgCO2e`
            );
            console.log("aa")
            return;
        }

        // Navegación entre categorías
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            return;
        }
        if (currentQuestion === questions.length - 1 && category === 'Estilo de vida') {
            navigation.navigate('NextCategory', { category: 'Transporte' });
            return;
        }
        if (currentQuestion === questions.length - 1) {
            navigation.navigate('NextCategory');
            return;
        }



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
                        {category === 'Estilo de vida'
                            ? <LifeStyleCategorySvg width={screenWidth * 0.34} height={150} />
                            : category === 'Transporte'
                                ? <TransportCategory width={screenWidth * 0.34} height={190} />
                                : <LogoSvg width={screenWidth * 0.34} height={150} />
                        }
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
                            {currentQuestion < questions.length - 1
                                ? 'Siguiente'
                                : category === 'Transporte'
                                    ? 'Enviar'
                                    : 'Siguiente categoría'
                            }
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
