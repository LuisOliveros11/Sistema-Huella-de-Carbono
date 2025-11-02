import React, { useState, useContext, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions,
    ScrollView,
    useCallback,
    ActivityIndicator,
    BackHandler
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PieChart } from "react-native-gifted-charts";

import {
    useNavigation, useFocusEffect
} from '@react-navigation/native';
import { User } from 'react-feather';
import { AuthContext } from '../components/AuthContext';
import { BASE_URL } from '../../config';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const pieChartRadius = Math.min(screenWidth, screenHeight) * 0.25;
const donutChartRadius = Math.min(screenWidth, screenHeight) * 0.13;
const donutChartInnerRadius = Math.min(screenWidth, screenHeight) * 0.103;
const baseUrl = BASE_URL;


const UserStatistics = () => {
    const navigation = useNavigation();
    useEffect(() => {
        getData();

    }, [emisiones]);
    const { authToken, userData } = useContext(AuthContext);
    const [emisiones, setEmisiones] = useState([]);
    const [recomendaciones, setRecomendaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    async function getData() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${authToken}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${baseUrl}/obtenerHuellaCarbono/${userData.id}`, requestOptions);
            const response2 = await fetch(`${baseUrl}/recomendacionesUsuario/${userData.id}`, requestOptions);
            const data = await response.json();
            const data2 = await response2.json();
            console.log(data2)
            setEmisiones(data);
            setRecomendaciones(data2)
        } catch (error) {
            console.log('Error:', error);
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                navigation.navigate("Tabs", { screen: "Home" });
                return true;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => subscription.remove();
        }, [navigation])
    );
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate("Tabs", { screen: "Home" })}
                    style={{ marginLeft: 10 }}
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            ),
        });
    }, [navigation])
    const pieData = emisiones?.breakdown
        ? [
            { value: emisiones.breakdown[0]?.total_kgCO2e || 0, label: 'Alimentos', color: '#E35B5B' },
            { value: emisiones.breakdown[2]?.total_kgCO2e || 0, label: 'Estilo de vida', color: '#F5782A' },
            { value: emisiones.breakdown[1]?.total_kgCO2e || 0, label: 'Transporte', color: '#AC5BE3' },
        ]
        : [];
    const userValueAliemntos = Math.round(emisiones?.breakdown?.[2]?.total_kgCO2e || 0);
    const diferenciaAlimentos = 1200 - userValueAliemntos > 0 ? 1200 - userValueAliemntos : 0;
    const donutDataAlimentos = [
        {
            value: diferenciaAlimentos,
            color: '#3686FF',
        },
        { value: userValueAliemntos, color: '#F5782A' },
    ];

    const userValueEstiloVida = Math.round(emisiones?.breakdown?.[2]?.total_kgCO2e || 0);
    const diferenciaEstiloVida = 1300 - userValueEstiloVida > 0 ? 1300 - userValueEstiloVida : 0;
    const donutDataEstiloVida = [
        {
            value: diferenciaEstiloVida,
            color: '#3686FF',
        },
        { value: userValueEstiloVida, color: '#F5782A' },
    ];
    const userValueTransporte = Math.round(emisiones?.breakdown?.[1]?.total_kgCO2e || 0);
    const diferenciaTransporte = 1400 - userValueTransporte > 0 ? 1400 - userValueTransporte : 0;
    const donutDataTransporte = [

        {
            value: diferenciaTransporte,
            color: '#3686FF',
        },
        { value: userValueTransporte, color: '#F5782A' },
    ];

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
            <View style={styles.container}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#5B81E3" />
                        <Text style={styles.loadingText}>Cargando datos...</Text>
                    </View>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>

                        <Text style={styles.title}>Información general</Text>

                        <View style={styles.scrollWrapper}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsContainer}>
                                <LinearGradient
                                    colors={['#5B81E3', '#92A5CE']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.cardItem}
                                >
                                    <Text style={styles.cardNumber}>{Math.round(emisiones?.total_kgCO2e || 0)} kg</Text>
                                    <Text style={styles.cardText}>Total generado</Text>
                                </LinearGradient>

                                <LinearGradient
                                    colors={['#E35B5B', '#CE9292']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.cardItem}
                                >
                                    <Text style={styles.cardNumber}>{Math.round(emisiones?.breakdown?.[0]?.total_kgCO2e || 0)} kg</Text>
                                    <Text style={styles.cardText}>Alimentos</Text>
                                </LinearGradient>

                                <LinearGradient
                                    colors={['#AC5BE3', '#C492CE']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.cardItem}
                                >
                                    <Text style={styles.cardNumber}>{Math.round(emisiones?.breakdown?.[2]?.total_kgCO2e || 0)} kg</Text>
                                    <Text style={styles.cardText}>Estilo de vida</Text>
                                </LinearGradient>

                                <LinearGradient
                                    colors={['#E3A35B', '#CE9292']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.cardItem}
                                >
                                    <Text style={styles.cardNumber}>{Math.round(emisiones?.breakdown?.[1]?.total_kgCO2e || 0)} kg</Text>
                                    <Text style={styles.cardText}>Transporte</Text>
                                </LinearGradient>
                            </ScrollView>
                        </View>

                        <View style={styles.pieContainer}>
                            <PieChart
                                data={pieData}
                                radius={pieChartRadius}
                            />
                            <View style={styles.labelsContainer}>
                                <View style={styles.labelRow}>
                                    <View style={[styles.circleCategory, { backgroundColor: '#E35B5B' }]} />
                                    <Text style={styles.label}>Alimentos</Text>
                                </View>
                                <View style={styles.labelRow}>
                                    <View style={[styles.circleCategory, { backgroundColor: '#F5782A' }]} />
                                    <Text style={styles.label}>Estilo de vida</Text>
                                </View>
                                <View style={styles.labelRow}>
                                    <View style={[styles.circleCategory, { backgroundColor: '#AC5BE3' }]} />
                                    <Text style={styles.label}>Transporte</Text>
                                </View>
                            </View>
                        </View>

                        <Text style={[styles.title, { marginTop: 30 }]}>Comparación con promedio de México (kgCO²e)</Text>
                        <View style={styles.recommendationLabelCircle}>
                            <View style={styles.recommendationItem}>
                                <View style={[styles.circleColor, { width: 24, height: 24, borderRadius: 12, backgroundColor: '#F5782A' }]}></View>
                                <Text style={styles.recommendationLabel}>Tu consumo</Text>
                            </View>
                            <View style={styles.recommendationItem}>
                                <View style={[styles.circleColor, { width: 24, height: 24, borderRadius: 12, backgroundColor: '#3686FF' }]}></View>
                                <Text style={styles.recommendationLabel}>Promedio por persona</Text>
                            </View>
                        </View>

                        <View style={styles.donutChartContainer}>
                            <View style={styles.donutItem}>
                                <View style={styles.donutData}>
                                    <View style={styles.leftGroup}>
                                        <View style={[styles.circleColor, { backgroundColor: '#F5782A' }]}></View>
                                        <Text style={styles.dataLabel}>{Math.round(emisiones?.breakdown?.[0]?.total_kgCO2e || 0)}</Text>
                                    </View>
                                    <View style={styles.rightGroup}>
                                        <View style={[styles.circleColor, { backgroundColor: '#3686FF' }]}></View>
                                        <Text style={styles.dataLabel}>1200</Text>
                                    </View>
                                </View>

                                <PieChart
                                    data={donutDataAlimentos}
                                    donut
                                    sectionAutoFocus
                                    radius={donutChartRadius}
                                    innerRadius={donutChartInnerRadius}
                                    innerCircleColor={'#ffffffff'}
                                    centerLabelComponent={() => (
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
                                                {
                                                    (() => {
                                                        const porcentaje = Math.round(
                                                            (Math.round(emisiones?.breakdown?.[0]?.total_kgCO2e || 0) * 100) / 1400
                                                        );
                                                        return porcentaje > 100 ? `+${porcentaje}%` : `${porcentaje}%`;
                                                    })()
                                                }
                                            </Text>
                                            <Text style={{ fontSize: 10, color: 'black' }}>Alimentos</Text>
                                        </View>
                                    )}
                                />
                            </View>

                            <View style={styles.donutItem}>
                                <View style={styles.donutData}>
                                    <View style={styles.leftGroup}>
                                        <View style={[styles.circleColor, { backgroundColor: '#F5782A' }]}></View>
                                        <Text style={styles.dataLabel}>{Math.round(emisiones?.breakdown?.[2]?.total_kgCO2e || 0)}</Text>
                                    </View>
                                    <View style={styles.rightGroup}>
                                        <View style={[styles.circleColor, { backgroundColor: '#3686FF' }]}></View>
                                        <Text style={styles.dataLabel}>1300</Text>
                                    </View>
                                </View>

                                <PieChart
                                    data={donutDataEstiloVida}
                                    donut
                                    sectionAutoFocus
                                    radius={donutChartRadius}
                                    innerRadius={donutChartInnerRadius}
                                    innerCircleColor={'#ffffffff'}
                                    centerLabelComponent={() => (
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
                                                {
                                                    (() => {
                                                        const porcentaje = Math.round(
                                                            (Math.round(emisiones?.breakdown?.[2]?.total_kgCO2e || 0) * 100) / 1400
                                                        );
                                                        return porcentaje > 100 ? `+${porcentaje}%` : `${porcentaje}%`;
                                                    })()
                                                }
                                            </Text>
                                            <Text style={{ fontSize: 10, color: 'black' }}>Estilo de vida</Text>
                                        </View>
                                    )}
                                />
                            </View>

                            <View style={styles.donutItem}>
                                <View style={styles.donutData}>
                                    <View style={styles.leftGroup}>
                                        <View style={[styles.circleColor, { backgroundColor: '#F5782A' }]}></View>
                                        <Text style={styles.dataLabel}>{Math.round(emisiones?.breakdown?.[1]?.total_kgCO2e || 0)}</Text>
                                    </View>
                                    <View style={styles.rightGroup}>
                                        <View style={[styles.circleColor, { backgroundColor: '#3686FF' }]}></View>
                                        <Text style={styles.dataLabel}>1400</Text>
                                    </View>
                                </View>

                                <PieChart
                                    data={donutDataTransporte}
                                    donut
                                    sectionAutoFocus
                                    radius={donutChartRadius}
                                    innerRadius={donutChartInnerRadius}
                                    innerCircleColor={'#ffffffff'}
                                    centerLabelComponent={() => (
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
                                                {
                                                    (() => {
                                                        const porcentaje = Math.round(
                                                            (Math.round(emisiones?.breakdown?.[1]?.total_kgCO2e || 0) * 100) / 1400
                                                        );
                                                        return porcentaje > 100 ? `+${porcentaje}%` : `${porcentaje}%`;
                                                    })()
                                                }
                                            </Text>
                                            <Text style={{ fontSize: 10, color: 'black' }}>Transporte</Text>
                                        </View>
                                    )}
                                />
                            </View>
                        </View>

                        <Text style={[styles.title, { marginTop: 30 }]}>Tus recomendaciones</Text>

                        <View style={styles.recommendationLabelCircle}>
                            <View style={styles.recommendationItem}>
                                <View style={[styles.circleColor, { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FF0000' }]}></View>
                                <Text style={styles.recommendationLabel}>Esenciales</Text>
                            </View>
                            <View style={styles.recommendationItem}>
                                <View style={[styles.circleColor, { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FF6A00' }]}></View>
                                <Text style={styles.recommendationLabel}>Importantes</Text>
                            </View>
                            <View style={styles.recommendationItem}>
                                <View style={[styles.circleColor, { width: 24, height: 24, borderRadius: 12, backgroundColor: '#1EFF00' }]}></View>
                                <Text style={styles.recommendationLabel}>Consideralo</Text>
                            </View>
                        </View>

                        {recomendaciones.recomendaciones?.map((item, index) => {
                            const dificultad = item.recomendacion?.dificultad?.toLowerCase();

                            let color;
                            if (dificultad === 'baja') color = '#1EFF00';
                            else if (dificultad === 'media') color = '#FF6A00';
                            else if (dificultad === 'alta') color = '#FF0000';
                            else color = '#999999';

                            return (
                                <LinearGradient
                                    key={index}
                                    colors={[color, '#503B3B']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.recommendation}
                                >
                                    <Text style={{ fontSize: 14, fontWeight: '600', padding: 10, color: 'white' }}>
                                        {item.recomendacion?.titulo || 'Sin título'}
                                    </Text>
                                    <Text style={styles.recommendationText}>
                                        {item.recomendacion?.descripcion || 'Sin descripción'}
                                    </Text>
                                </LinearGradient>
                            );
                        })}
                    </ScrollView>
                )}
            </View>
        </SafeAreaProvider>
    );
};

export default UserStatistics;


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
        backgroundColor: '#ffffffff',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 22,
        textAlign: 'justify',
        color: '#000000ff',
        fontWeight: 700
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    cardItem: {
        height: screenHeight * .145,
        width: screenWidth * .48,
        marginRight: 30,
        borderRadius: 20,
        backgroundColor: "#080808ff",
        alignItems: 'center',
    },
    scrollWrapper: {
        marginTop: 10,
    },
    cardNumber: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 700,
        marginTop: 12,
        textAlign: 'center',
    },
    cardText: {
        color: '#fff',
        fontSize: 16,
        marginTop: 20,
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
    pieContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },

    circleCategory: {
        height: 20,
        width: 20,
        borderRadius: 10,
        marginRight: 8,
    },
    labelsContainer: {
        marginLeft: 20,
        justifyContent: 'space-between',
        height: pieChartRadius * 2,
    },


    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#000',
        marginVertical: 5,
    },
    donutChartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    donutData: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 10,
    },
    donutItem: {
        alignItems: 'flex-start'
    },
    dataLabel: {
        fontSize: 10,
        marginLeft: 4
    },
    circleColor: {
        height: 8,
        width: 8,
        borderRadius: 4
    },
    leftGroup: {
        marginLeft: screenWidth * 0.005,
        flexDirection: 'row',
        alignItems: 'center',
    },

    rightGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: screenWidth * 0.05,
        marginRight: 10,
    },
    recommendationLabelCircle: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    recommendationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    recommendationLabel: {
        marginLeft: 5,
        fontSize: 12,
        fontWeight: 500
    },
    recommendationsContainer: {
        marginTop: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    recommendation: {
        marginTop: 25,
        width: screenWidth - 52,
        borderRadius: 20,
        paddingBottom: 10,
        minHeight: 140,
    },
    recommendationText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'justify',
        textAlignVertical: 'auto',
        flex: 1,
        paddingHorizontal: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
})