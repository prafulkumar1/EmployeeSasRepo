// AppInit.tsx
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { getAppConfiguration } from './components/redux/reducers/reservationReducer';
import * as Font from 'expo-font';
import { Platform } from 'react-native';
import CbLoader from './components/cobalt/cobaltLoader';

const AppInit = ({ onFontsLoaded }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const initialize = async () => {
    try {
      await AsyncStorage.setItem(
        "apiURL",
        "https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.EngDev/api/"
      );

      dispatch(getAppConfiguration());

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

      onFontsLoaded(true);
    } catch (err) {
      console.error("Initialization error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  if (loading && Platform.OS !== 'web') {
    return <CbLoader />;
  }

  return null;
};

export default AppInit;
