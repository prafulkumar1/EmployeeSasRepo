import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import "@/global.css";
import 'react-native-gesture-handler';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Platform, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/source/views/login/loginUI';
// import { UseFormContextProvider } from '@/components/cobalt/event';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import * as Font from 'expo-font';
import CbLoader from './components/cobalt/cobaltLoader';
import { store } from './components/redux/store';
import DashboardUI from './source/views/dashboard/dashboardUI';
// Global Configurations
const appConfigJson = '[{"PageId":"Login","Controlls":[{"type":"backgroundImage","id":"loginBackground","styles":{"container":{"flex":1,"resizeMode":"cover","justifyContent":"center","alignItems":"center"}}},{"type":"VStack","id":"VStack1","space":"lg"},{"type":"text","id":"username","placeholder":"User Name/Member ID","labelText":"User Name","variant":"outline","errorMessage":"User Name is Requried.","isDisabled":0,"isInvalid":0,"isReadOnly":0,"isRequired":1},{"type":"password","id":"password","placeholder":"Password","labelText":"Password","variant":"underlined","errorMessage":"Password is Requried.","isDisabled":0,"isInvalid":0,"isReadOnly":0,"isRequired":1},{"type":"checkbox","id":"rememberme","labeltext":"Remember Me"},{"type":"select","id":"department","placeholder":"Department","labelText":"Select Department","options":[{"label":"Dining","value":"dining"},{"label":"Golf","value":"golf"},{"label":"Tennis","value":"tennis"},{"label":"Pool","value":"pool"}]},{"type":"radioButton","id":"gender","alignment":"Horizontal","labelText":"Gender","options":[{"label":"Male","value":"male"},{"label":"Female","value":"female"},{"label":"Others","value":"others"}]},{"type":"button","id":"login","text":"Login","variant":"","backgroundColor":"white","borderRadius":"40"},{"id":"cancel","text":"Cancel","variant":"","backgroundColor":"white","borderRadius":"40"}]}]';
global.appConfigJsonArray = typeof appConfigJson === 'string' ? JSON.parse(appConfigJson) : appConfigJson;
global.controlsConfigJson = [];

const Stack = createNativeStackNavigator();

export default function App(props) {
  const [fontsLoaded, setFontsLoaded] = useState(false);


  
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'SourceSansPro_Black': require('./assets/fonts/SourceSansPro-Black.otf'),
        'SourceSansPro_BlackItalic': require('./assets/fonts/SourceSansPro-BlackIt.otf'),
        'SourceSansPro_Bold': require('./assets/fonts/SourceSansPro-Bold.otf'),
        'SourceSansPro_BoldItalic': require('./assets/fonts/SourceSansPro-BoldIt.otf'),
        'SourceSansPro_ExtraLight': require('./assets/fonts/SourceSansPro-ExtraLight.otf'),
        'SourceSansPro_ExtraLightItalic': require('./assets/fonts/SourceSansPro-ExtraLightIt.otf'),
        'SourceSansPro_Italic': require('./assets/fonts/SourceSansPro-It.otf'),
        'SourceSansPro_Light': require('./assets/fonts/SourceSansPro-Light.otf'),
        'SourceSansPro_LightItalic': require('./assets/fonts/SourceSansPro-LightIt.otf'),
        'SourceSansPro_Regular': require('./assets/fonts/SourceSansPro-Regular.otf'),
        'SourceSansPro_SemiBold': require('./assets/fonts/SourceSansPro-Semibold.otf'),
        'SourceSansPro_SemiBoldItalic': require('./assets/fonts/SourceSansPro-SemiboldIt.otf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);


  if (!fontsLoaded) {
    if(Platform.OS !=="web"){
      return (
        <CbLoader />
      );
    }
  }

  return (
    <GluestackUIProvider mode="light">
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer >
            <Stack.Navigator
              initialRouteName="Login"
            >
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="DashboardUI"
                component={DashboardUI}
                options={{ headerShown: false }}
              />
          </Stack.Navigator>
            <StatusBar style="auto" />
          </NavigationContainer>
        </GestureHandlerRootView> 
      </Provider>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 22,
    color: "#4B5154",
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle:{ flex: 1, alignItems: 'flex-start' }
});
