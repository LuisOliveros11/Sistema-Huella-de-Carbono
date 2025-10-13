import { StyleSheet, View, Text, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const screenWidth = Dimensions.get('window').width;
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

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
    <SafeAreaProvider style={styles.container}>
        <Text style={styles.title}>Contesta el cuestionario</Text>
        <View style={[styles.card, {backgroundColor: "#96D55F"}]}>
           <FontAwesome5 style={styles.cardLogo} name="file-contract" size={118} color="white" />
        </View>
        <Text style={styles.title}>Conoce tus estadísticas</Text>
        <View style={[styles.card, {backgroundColor: "#79A4FF"}]}>
            <Ionicons style={styles.cardLogo} name="stats-chart" size={118} color="white" />
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
    backgroundColor: '#eBecf4',
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
    height: 200,
    borderRadius: 18,
    marginBottom: 30
  },
  cardLogo: {
    marginTop: 12,
    marginLeft: 14
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