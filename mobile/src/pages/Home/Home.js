import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/Card';
import Header from '../../components/Header';
import { API_ENDPOINTS } from '../../config/api';
import COLORS from '../../theme/colors';

const Home = ({ navigation }) => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.PROFESSIONALS);
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Erro ao carregar profissionais');
      }

      setProfessionals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProfessionalClick = (professional) => {
    navigation.navigate('ProfessionalDetails', { professional });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Profissionais" />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY_COLOR} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={professionals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Card
                title={item.name}
                description={item.description || `Email: ${item.email}\nTelefone: ${item.phone}`}
                price={item.price}
                imageSrc={item.image}
                buttonText="Ver Detalhes"
                onButtonClick={() => handleProfessionalClick(item)}
              />
            </View>
          )}
          contentContainerStyle={styles.listContent}
          numColumns={1}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: COLORS.ERROR_COLOR,
    fontSize: 16,
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
  },
  cardContainer: {
    marginBottom: 16,
  },
});

export default Home;
