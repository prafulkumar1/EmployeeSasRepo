import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdvanceLoginUI from '@/AdvancedSource/views/login/loginUI'
import AdvanceDashboardUI from '@/AdvancedSource/views/dashboard/dashboardUI'

import dashboardUI from '@/source/views/dashboard/dashboardUI';
import LoginScreen from '@/source/views/login/loginUI';
import addMemberUI from '@/source/views/addMember/addMemberUI';
import MemberDirectoryUI from '@/source/views/memberDirectory/memberDirectoryUI';

const NormalCubStack = createNativeStackNavigator();
const PremiumClubStack = createNativeStackNavigator();
export const NormalClubNavigation = () => {
    return (
      <NormalCubStack.Navigator
        initialRouteName="MemberDirectoryUI"
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
        <NormalCubStack.Screen
          name="AddMemberUI"
          component={addMemberUI}
          options={{ headerShown: false }}
        />
        <NormalCubStack.Screen
          name="MemberDirectoryUI"
          component={MemberDirectoryUI}
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