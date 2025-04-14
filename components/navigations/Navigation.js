import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdvanceLoginUI from '@/AdvancedSource/views/login/loginUI'
import AdvanceDashboardUI from '@/AdvancedSource/views/dashboard/dashboardUI'

import dashboardUI from '@/source/views/dashboard/dashboardUI';
import LoginScreen from '@/source/views/login/loginUI';

const NormalCubStack = createNativeStackNavigator();
const PremiumClubStack = createNativeStackNavigator();
export const NormalClubNavigation = () => {
    return (
      <NormalCubStack.Navigator
        initialRouteName="Login"
      >
        <NormalCubStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <NormalCubStack.Screen
          name="DashboardUI"
          component={dashboardUI}
          options={{ headerShown: false }}
        />
      </NormalCubStack.Navigator>
    )
  }

  export const PremiumClubNavigation = () => {
    return (
      <PremiumClubStack.Navigator
        initialRouteName="AdvanceLogin"
      >
        <PremiumClubStack.Screen
          name="AdvanceLogin"
          component={AdvanceLoginUI}
          options={{ headerShown: false }}
        />
        <PremiumClubStack.Screen
          name="AdvanceDashboard"
          component={AdvanceDashboardUI}
          options={{ headerShown: false }}
        />
      </PremiumClubStack.Navigator>
    )
  }