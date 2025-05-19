import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import "@/global.css";
import "react-native-gesture-handler";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { BackHandler, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './components/redux/store';
import { NormalClubNavigation, PremiumClubNavigation } from './components/navigations/Navigation';
import AppInit from './AppInit';
const appConfigJson = '[{"PageId":"Login","Controlls":[{"type":"backgroundImage","id":"loginBackground","styles":{"container":{"flex":1,"resizeMode":"cover","justifyContent":"center","alignItems":"center"}}},{"type":"VStack","id":"VStack1","space":"lg"},{"type":"text","id":"username","placeholder":"User Name/Member ID","labelText":"User Name","variant":"outline","errorMessage":"User Name is Requried.","isDisabled":0,"isInvalid":0,"isReadOnly":0,"isRequired":1},{"type":"password","id":"password","placeholder":"Password","labelText":"Password","variant":"underlined","errorMessage":"Password is Requried.","isDisabled":0,"isInvalid":0,"isReadOnly":0,"isRequired":1},{"type":"checkbox","id":"rememberme","labeltext":"Remember Me"},{"type":"select","id":"department","placeholder":"Department","labelText":"Select Department","options":[{"label":"Dining","value":"dining"},{"label":"Golf","value":"golf"},{"label":"Tennis","value":"tennis"},{"label":"Pool","value":"pool"}]},{"type":"radioButton","id":"gender","alignment":"Horizontal","labelText":"Gender","options":[{"label":"Male","value":"male"},{"label":"Female","value":"female"},{"label":"Others","value":"others"}]},{"type":"button","id":"login","text":"Login","variant":"","backgroundColor":"white","borderRadius":"40"},{"id":"cancel","text":"Cancel","variant":"","backgroundColor":"white","borderRadius":"40"}]}]';
global.appConfigJsonArray = typeof appConfigJson === 'string' ? JSON.parse(appConfigJson) : appConfigJson;
global.controlsConfigJson = [];

const Stack = createNativeStackNavigator();

export default function App(props) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );

    return () => backHandler.remove();
  }, []);

  if (!fontsLoaded) {
    return (
      <Provider store={store}>
        <AppInit onFontsLoaded={setFontsLoaded} />
      </Provider>
    );
  }

  return (
    <GluestackUIProvider mode="light">
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer >
            <Stack.Navigator
              screenOptions={{
                gestureEnabled: false,
              }}>
              <Stack.Screen
                name="NormalClubNavigation"
                component={NormalClubNavigation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PremiumClubNavigation"
                component={PremiumClubNavigation}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
            <StatusBar barStyle="light-content" backgroundColor="#004d78" />
          </NavigationContainer>
          {/*  Full-screen overlay loader */}
          <LoaderContainer />
        </GestureHandlerRootView>
      </Provider>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: {
    fontSize: 22,
    color: "#4B5154",
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { flex: 1, alignItems: "flex-start" },
});
