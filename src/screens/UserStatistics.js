import React, { useState, useContext } from 'react';
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
//import { AuthContext } from '../Components/AuthContext';
//import { BASE_URL } from '../../config'; 


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const pieChartRadius = Math.min(screenWidth, screenHeight) * 0.25;
const donutChartRadius = Math.min(screenWidth, screenHeight) * 0.13;
const donutChartInnerRadius = Math.min(screenWidth, screenHeight) * 0.103;

const pieData = [
    { value: 250, label: 'Alimentos' },
    { value: 500, label: 'Estilo de vida' },
    { value: 750, label: 'Transporte' },
];
const donutData = [
    {
        value: 50,
        color: '#F5782A',
    },
    { value: 50, color: '#3686FF' },
];
const UserStatistics = () => {
    const navigation = useNavigation();
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
    }, [navigation]);
    //const { login } = useContext(AuthContext);
    //const baseUrl = BASE_URL;

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#e8ecf4' }} >
            <View style={styles.container}>
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
                                <Text style={styles.cardNumber}>100 kg</Text>
                                <Text style={styles.cardText}>Total generado</Text>
                            </LinearGradient>
                            <LinearGradient
                                colors={['#E35B5B', '#CE9292']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.cardItem}
                            >
                                <Text style={styles.cardNumber}>20 kg</Text>
                                <Text style={styles.cardText}>Alimentos</Text>
                            </LinearGradient>
                            <LinearGradient
                                colors={['#AC5BE3', '#C492CE']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.cardItem}
                            >
                                <Text style={styles.cardNumber}>20 kg</Text>
                                <Text style={styles.cardText}>Estilo de vida</Text>
                            </LinearGradient>
                            <LinearGradient
                                colors={['#E3A35B', '#CE9292']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.cardItem}
                            >
                                <Text style={styles.cardNumber}>20 kg</Text>
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
                                <View style={[styles.circleCategory, { backgroundColor: '#5B81E3' }]} />
                                <Text style={styles.label}>Alimentos</Text>
                            </View>
                            <View style={styles.labelRow}>
                                <View style={[styles.circleCategory, { backgroundColor: '#E35B5B' }]} />
                                <Text style={styles.label}>Estilo de vida</Text>
                            </View>
                            <View style={styles.labelRow}>
                                <View style={[styles.circleCategory, { backgroundColor: '#AC5BE3' }]} />
                                <Text style={styles.label}>Transporte</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.title, { marginTop: 30 }]}>Comparación con promedio de México</Text>
                    <View style={styles.donutChartContainer}>
                        <View style={styles.donutItem}>
                            <View style={styles.donutData}>
                                <View style={styles.leftGroup}>
                                    <View style={[styles.circleColor, { backgroundColor: '#F5782A' }]}></View>
                                    <Text style={styles.dataLabel}>50%</Text>
                                </View>

                                <View style={styles.rightGroup}>
                                    <View style={[styles.circleColor, { backgroundColor: '#3686FF' }]}></View>
                                    <Text style={styles.dataLabel}>50%</Text>
                                </View>

                            </View>
                            <PieChart
                                data={donutData}
                                donut
                                sectionAutoFocus
                                radius={donutChartRadius}
                                innerRadius={donutChartInnerRadius}
                                innerCircleColor={'#ffffffff'}
                                centerLabelComponent={() => {
                                    return (
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text
                                                style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
                                                50%
                                            </Text>
                                            <Text style={{ fontSize: 10, color: 'black' }}>Alimentos</Text>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                        <View style={styles.donutItem}>
                            <View style={styles.donutData}>
                                <View style={styles.leftGroup}>
                                    <View style={[styles.circleColor, { backgroundColor: '#F5782A' }]}></View>
                                    <Text style={styles.dataLabel}>50%</Text>
                                </View>

                                <View style={styles.rightGroup}>
                                    <View style={[styles.circleColor, { backgroundColor: '#3686FF' }]}></View>
                                    <Text style={styles.dataLabel}>50%</Text>
                                </View>

                            </View>
                            <PieChart
                                data={donutData}
                                donut
                                sectionAutoFocus
                                radius={donutChartRadius}
                                innerRadius={donutChartInnerRadius}
                                innerCircleColor={'#ffffffff'}
                                centerLabelComponent={() => {
                                    return (
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text
                                                style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
                                                50%
                                            </Text>
                                            <Text style={{ fontSize: 10, color: 'black' }}>Estilo de vida</Text>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                        <View style={styles.donutItem}>
                            <View style={styles.donutData}>
                                <View style={styles.leftGroup}>
                                    <View style={[styles.circleColor, { backgroundColor: '#F5782A' }]}></View>
                                    <Text style={styles.dataLabel}>50%</Text>
                                </View>

                                <View style={styles.rightGroup}>
                                    <View style={[styles.circleColor, { backgroundColor: '#3686FF' }]}></View>
                                    <Text style={styles.dataLabel}>50%</Text>
                                </View>

                            </View>
                            <PieChart
                                data={donutData}
                                donut
                                sectionAutoFocus
                                radius={donutChartRadius}
                                innerRadius={donutChartInnerRadius}
                                innerCircleColor={'#ffffffff'}
                                centerLabelComponent={() => {
                                    return (
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text
                                                style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
                                                50%
                                            </Text>
                                            <Text style={{ fontSize: 10, color: 'black' }}>Transporte</Text>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                    </View>
                    <Text style={[styles.title, { marginTop: 30 }]}>Tus recomendaciones</Text>
                    <View style={styles.recommendationLabelCircle}>
                        <View style={styles.recommendationItem}>
                            <View style={[styles.circleColor, { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FF0000' }]}></View>
                            <Text style={styles.recommendationLabel}>Escenciales</Text>
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
                    <LinearGradient
                        colors={['#FF0000', '#503B3B']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.recommendation}
                    >
                        <Text style={{ fontSize: 14, fontWeight: 600, padding: 10, color: 'white' }}>Titulo</Text>
                        <Text style={styles.recommendationText}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
                    </LinearGradient>
                    <LinearGradient
                        colors={['#FF6A00', '#503B3B']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.recommendation}
                    >
                        <Text style={{ fontSize: 14, fontWeight: 600, padding: 10, color: 'white' }}>Titulo</Text>
                        <Text style={styles.recommendationText}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
                    </LinearGradient>
                    <LinearGradient
                        colors={['#1EFF00', '#503B3B']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.recommendation}
                    >
                        <Text style={{ fontSize: 14, fontWeight: 600, padding: 10, color: 'white' }}>Titulo</Text>
                        <Text style={styles.recommendationText}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
                    </LinearGradient>
                </ScrollView>
            </View>
        </SafeAreaProvider >
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
        marginLeft: screenWidth * 0.01,
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
        height: 140,
        borderRadius: 20

    },
    recommendationText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'justify',
        textAlignVertical: 'auto',
        flex: 1,
        paddingHorizontal: 10,
    }
})