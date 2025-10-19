import { StyleSheet, View, Text, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const cardWidth = screenWidth - 32;

const HomeScreen = () => {
  /*if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#075eec" />
          <Text style={styles.loadingText}>Cargando datos...</Text>
        </View>
      </SafeAreaView>
    );
  }*/
 const navigation = useNavigation();
 

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
    <SafeAreaProvider style={styles.container}>
        <Text style={styles.title}>Contesta el cuestionario</Text>
        <View style={[styles.card, {backgroundColor: "#96D55F"}]}>
            <View style={{marginTop: screenHeight * 0.01}}>
              <View style={[styles.horizontalContainer, { justifyContent: 'space-between'}]}>
                <FontAwesome5 style={{paddingHorizontal: '5%'}} name="file-contract" size={118} color="white" />
                <FontAwesome style={{paddingHorizontal: '11.5%'}} name="tree" size={60} color="white" />
              </View>
              <Text style={styles.cardText}>Calcula tu impacto ambiental</Text>
              <View style={[styles.horizontalContainer, { justifyContent: 'space-between'}]}>
                <Text style={[styles.cardText, {fontWeight: 300, fontSize: 11}]}>Contesta las preguntas del formulario para conocer tu huella de carbono</Text>
                <TouchableOpacity
                  onPress={async () => {
                    navigation.navigate('UserFormPreview');
                  }}>
                  <View style={[styles.cardButton, {paddingHorizontal: '16%'}]}>
                    <Text style={[styles.cardButtonText, {color: "#52C94B"}]}>Iniciar</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
        </View>

        <Text style={styles.title}>Conoce tus estadísticas</Text>
        <View style={[styles.card, {backgroundColor: "#79A4FF"}]}>
          <View style={{marginTop: screenHeight * 0.02}}>
            <View style={[styles.horizontalContainer, { justifyContent: 'space-between'}]}>
              <Ionicons style={{paddingHorizontal: '5%'}} name="stats-chart" size={105} color="white" />
              <FontAwesome style={{paddingHorizontal: '7.5%'}} name="line-chart" size={70} color="white" />
            </View>
            <Text style={[styles.cardText, {width: screenWidth * .60}]}>Tus sugerencias personalizadas</Text>
            <View style={[styles.horizontalContainer, { justifyContent: 'space-between'}]}>
              <Text style={[styles.cardText, {fontWeight: 300, fontSize: 11}]}>Consulta tu nivel de huella de carbono y conoce en qué debes mejorar</Text>
              <TouchableOpacity
                onPress={async () => {
                  //navigation.navigate('UserStatistics');
                }}>
                <View style={[styles.cardButton, {paddingHorizontal: '16%'}]}>
                  <Text style={[styles.cardButtonText, {fontSize: 11}]}>Consultar</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
    </SafeAreaProvider>

    </ScrollView>
   
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 20
    
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 15,
  },
  card: {
    backgroundColor: "blue",
    width: cardWidth,
    height: 215,
    borderRadius: 18,
    marginBottom: 30
  },
  cardLogo: {
    marginTop: 12,
    marginLeft: 14
  },
  cardText: {
    fontSize: 13,
    fontWeight: 900,
    color: "#fff",
    marginTop: 10,
    marginLeft: 14,
    width: screenWidth * 0.50,
  },
  horizontalContainer: {
    flexDirection: 'row',     
    alignItems: 'center',      
  },
  cardButton: {
    height: 35,
    width: 90,
    backgroundColor: '#fff',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardButtonText: {
    fontWeight: 600,
    color: "#79A4FF",
  },












  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});