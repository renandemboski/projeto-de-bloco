import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../theme/colors';

import SignIn from '../pages/Auth/Sign-in/Sign-in';
import SignUp from '../pages/Auth/Sign-up/Sign-up';
import Home from '../pages/Home/Home';
import Professional from '../pages/Professional/Professional';
import Profile from '../pages/Profile/Profile';
import Schedule from '../pages/Schedule/Schedule';
import Appointments from '../pages/Appointments/Appointments';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeList" component={Home} options={{ headerShown: false }} />
    <Stack.Screen name="ProfessionalDetails" component={Professional} options={{ title: 'Detalhes' }} />
    <Stack.Screen name="Schedule" component={Schedule} options={{ title: 'Agendar Consulta' }} />
  </Stack.Navigator>
);

const AppTabs = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Agendamentos') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.PRIMARY_COLOR,
        tabBarInactiveTintColor: COLORS.TAB_INACTIVE,
        tabBarStyle: {
          backgroundColor: COLORS.TAB_BAR_BACKGROUND,
          borderTopColor: COLORS.TAB_BAR_BORDER,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ title: 'Início' }} />
      <Tab.Screen
        name="Agendamentos"
        component={Appointments}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!isAuthenticated) {
              e.preventDefault();
              navigation.navigate('SignIn');
            }
          },
        })}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!isAuthenticated) {
              e.preventDefault();
              navigation.navigate('SignIn');
            }
          },
        })}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.BACKGROUND_COLOR }}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY_COLOR} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={AppTabs} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
