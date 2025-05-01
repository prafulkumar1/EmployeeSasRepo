// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet, ScrollView, PermissionsAndroid, Platform } from 'react-native';
// import BluetoothService from './BluetoothService';

// const HealthMonitorScreen = () => {
//   const [devices, setDevices] = useState([]);
//   const [connected, setConnected] = useState(false);
//   const [heartRate, setHeartRate] = useState(null);
//   const [error, setError] = useState(null);
//   const [isScanning, setIsScanning] = useState(false);

//   useEffect(() => {
//     // Initialize Bluetooth when component mounts
//     const initBluetooth = async () => {
//       try {
//         await BluetoothService.initialize();
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     initBluetooth();

//     return () => {
//       // Clean up on unmount
//       BluetoothService.stopScanning();
//       BluetoothService.disconnect();
//     };
//   }, []);

//   const startScan = () => {
//     setDevices([]);
//     setIsScanning(true);
//     BluetoothService.scanForDevices((device) => {
//       setDevices(prevDevices => {
//         // Avoid duplicates
//         if (!prevDevices.some(d => d.id === device.id)) {
//           return [...prevDevices, device];
//         }
//         return prevDevices;
//       });
//     });
//   };

//   const stopScan = () => {
//     BluetoothService.stopScanning();
//     setIsScanning(false);
//   };

//   const connectAndMonitor = async (deviceId) => {
//     try {
//       await BluetoothService.connectToDevice(deviceId);
//       setConnected(true);
      
//       // Example: Monitor heart rate (replace with your service/characteristic UUIDs)
//       BluetoothService.monitorCharacteristic(
//         deviceId,
//         '180D', // Heart Rate Service UUID
//         '2A37', // Heart Rate Measurement Characteristic UUID
//         (value) => {
//           // Parse the heart rate value (this depends on your device's data format)
//           // This is a simplified example - actual parsing will depend on your device
//           setHeartRate(parseInt(value, 10) || 0);
//         }
//       );
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   console.log(connected,"--->>>>>11111")
//   console.log(heartRate,"--->>>>>222222")
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Health Monitor</Text>
      
//       {error && <Text style={styles.error}>{error}</Text>}
      
//       <Button 
//         title={isScanning ? "Scanning..." : "Scan for Health Devices"} 
//         onPress={startScan} 
//         disabled={isScanning}
//       />
      
//       {isScanning && (
//         <Button 
//           title="Stop Scanning" 
//           onPress={stopScan} 
//         />
//       )}
      
//       <ScrollView style={styles.deviceList}>
//         {devices.map((device, index) => {
//           return(
//             <View key={index} style={styles.deviceItem}>
//               <Text>{device.localName || '-----'}</Text>
//               <Text>{device.id}</Text>
//               <Button 
//                 title="Connect" 
//                 onPress={() => connectAndMonitor(device.id)} 
//               />
//             </View>
//           )
//         })}
//       </ScrollView>
      
//       {connected && (
//         <View style={styles.healthData}>
//           <Text style={styles.dataTitle}>Health Data:</Text>
//           {heartRate !== null && <Text>Heart Rate: {heartRate} bpm</Text>}
//         </View>
//       )}
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   error: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   deviceList: {
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   deviceItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   healthData: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//   },
//   dataTitle: {
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
// });

// export default HealthMonitorScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import BluetoothService from './BluetoothService';

const HealthMonitorScreen = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [healthData, setHealthData] = useState({});
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initBluetooth = async () => {
      try {
        await BluetoothService.initialize();
      } catch (err) {
        setError(err.message);
      }
    };

    initBluetooth();

    return () => {
      BluetoothService.stopScanning();
      BluetoothService.disconnect();
    };
  }, []);

  const startScan = () => {
    setDevices([]);
    setIsScanning(true);
    BluetoothService.scanForDevices((device) => {
      setDevices(prevDevices => {
        if (!prevDevices.some(d => d.id === device.id)) {
          return [...prevDevices, device];
        }
        return prevDevices;
      });
    });
  };

  const stopScan = () => {
    BluetoothService.stopScanning();
    setIsScanning(false);
  };

  const connectAndMonitor = async (deviceId) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Connect to device
      const device = await BluetoothService.connectToDevice(deviceId);
      setConnectedDevice(device);
      
      // Read device info
      const info = await BluetoothService.readDeviceInfo(deviceId);
      setDeviceInfo(info);
      
      // Monitor health data
      BluetoothService.monitorHealthData(deviceId, (newData) => {
        setHealthData(prev => ({ ...prev, ...newData }));
      });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderDeviceInfo = () => {
    if (!deviceInfo) return null;
    
    return (
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Device Information</Text>
        {deviceInfo.manufacturer && <Text>Manufacturer: {deviceInfo.manufacturer}</Text>}
        {deviceInfo.model && <Text>Model: {deviceInfo.model}</Text>}
        {deviceInfo.serial && <Text>Serial: {deviceInfo.serial}</Text>}
        {deviceInfo.fwVersion && <Text>Firmware: {deviceInfo.fwVersion}</Text>}
        {deviceInfo.hwVersion && <Text>Hardware: {deviceInfo.hwVersion}</Text>}
      </View>
    );
  };

  const renderHealthData = () => {
    if (Object.keys(healthData).length === 0) return null;
    
    return (
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Health Metrics</Text>
        {healthData.heartRate !== undefined && <Text>❤️ Heart Rate: {healthData.heartRate} bpm</Text>}
        {healthData.bloodPressure !== undefined && (
          <Text>🩸 Blood Pressure: {healthData.bloodPressure.systolic}/{healthData.bloodPressure.diastolic}</Text>
        )}
        {healthData.oxygenSaturation !== undefined && <Text>🫁 Oxygen: {healthData.oxygenSaturation}%</Text>}
        {healthData.temperature !== undefined && <Text>🌡️ Temperature: {healthData.temperature}°C</Text>}
        {healthData.batteryLevel !== undefined && <Text>🔋 Battery: {healthData.batteryLevel}%</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Monitor</Text>
      
      {error && <Text style={styles.error}>{error}</Text>}
      
      <View style={styles.buttonRow}>
        <Button 
          title={isScanning ? "Scanning..." : "Scan Devices"} 
          onPress={startScan} 
          disabled={isScanning}
        />
        {isScanning && (
          <Button 
            title="Stop" 
            onPress={stopScan} 
          />
        )}
      </View>
      
      <ScrollView style={styles.deviceList}>
        {devices.map((device, index) => (
          <View key={index} style={styles.deviceItem}>
            <Text style={styles.deviceName}>{device.localName || 'Unnamed Device'}</Text>
            <Text style={styles.deviceId}>{device.id}</Text>
            <Button 
              title="Connect" 
              onPress={() => connectAndMonitor(device.id)} 
              disabled={isLoading}
            />
          </View>
        ))}
      </ScrollView>
      
      {isLoading && <ActivityIndicator size="large" style={styles.loader} />}
      
      {connectedDevice && (
        <View style={styles.connectedDevice}>
          <Text style={styles.connectedTitle}>Connected to: {connectedDevice.localName}</Text>
          {renderDeviceInfo()}
          {renderHealthData()}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  deviceList: {
    marginBottom: 20,
  },
  deviceItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  deviceName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  deviceId: {
    color: '#666',
    fontSize: 12,
    marginVertical: 5,
  },
  connectedDevice: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  connectedTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  infoSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  loader: {
    marginVertical: 20,
  },
});

export default HealthMonitorScreen;