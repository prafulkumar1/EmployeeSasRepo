// import { BleManager } from 'react-native-ble-plx';

// class BluetoothService {
//   constructor() {
//     this.manager = new BleManager();
//     this.connectedDevice = null;
//   }

//   // Initialize Bluetooth
//   initialize() {
//     return new Promise((resolve, reject) => {
//       const subscription = this.manager.onStateChange((state) => {
//         if (state === 'PoweredOn') {
//           subscription.remove();
//           resolve();
//         } else if (state === 'PoweredOff') {
//           subscription.remove();
//           reject(new Error('Bluetooth is turned off'));
//         }
//       }, true);
//     });
//   }

//   // Scan for devices
//   scanForDevices(onDeviceFound) {
//     this.manager.startDeviceScan(null, null, (error, device) => {
//       if (error) {
//         console.error('Scan error:', error);
//         return;
//       }
//       onDeviceFound(device);
//     });
//   }

//   // Stop scanning
//   stopScanning() {
//     this.manager.stopDeviceScan();
//   }

//   // Connect to device
//   async connectToDevice(deviceId) {
//     const device = await this.manager.connectToDevice(deviceId);
//     await device.discoverAllServicesAndCharacteristics();
//     this.connectedDevice = device;
//     return device;
//   }

//   // Monitor characteristic (example for heart rate)
//   monitorCharacteristic(deviceId, serviceUUID, characteristicUUID, onValueChanged) {
//     return this.manager.monitorCharacteristicForDevice(
//       deviceId,
//       serviceUUID,
//       characteristicUUID,
//       (error, characteristic) => {
//         if (error) {
//           console.error('Monitoring error:', error);
//           return;
//         }
//         onValueChanged(characteristic.value);
//       }
//     );
//   }

//   // Disconnect from device
//   async disconnect() {
//     if (this.connectedDevice) {
//       await this.connectedDevice.cancelConnection();
//       this.connectedDevice = null;
//     }
//   }
// }

// export default new BluetoothService();


import { BleManager } from 'react-native-ble-plx';

class BluetoothService {
  constructor() {
    this.manager = new BleManager();
    this.connectedDevice = null;
    this.subscriptions = [];
    this.supportedServices = {};
  }

  initialize() {
    return new Promise((resolve, reject) => {
      const subscription = this.manager.onStateChange((state) => {
        if (state === 'PoweredOn') {
          subscription.remove();
          resolve();
        } else if (state === 'Unsupported' || state === 'PoweredOff') {
          subscription.remove();
          reject(new Error(`Bluetooth is ${state}`));
        }
      }, true);
    });
  }

  scanForDevices(onDeviceFound) {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Scan error:', error);
        return;
      }
      onDeviceFound(device);
    });
  }

  stopScanning() {
    this.manager.stopDeviceScan();
  }

  async connectToDevice(deviceId) {
    try {
      const device = await this.manager.connectToDevice(deviceId);
      await device.discoverAllServicesAndCharacteristics();
      this.connectedDevice = device;
      
      // Discover supported services
      await this.discoverSupportedServices(deviceId);
      
      return device;
    } catch (error) {
      console.error('Connection error:', error);
      throw error;
    }
  }
  async discoverSupportedServices(deviceId) {
    try {
      const services = await this.manager.servicesForDevice(deviceId);
      this.supportedServices = {};
      
      // Check for common health services
      const healthServices = {
        heartRate: { service: '180D', characteristic: '2A37' },
        battery: { service: '180F', characteristic: '2A19' },
        deviceInfo: { service: '180A', characteristics: ['2A29', '2A24', '2A25'] }
      };
      
      for (const [serviceName, config] of Object.entries(healthServices)) {
        const service = services.find(s => s.uuid.toLowerCase() === config.service.toLowerCase());
        if (service) {
          this.supportedServices[serviceName] = config;
          console.log(`Found supported service: ${serviceName}`);
        }
      }
      
      return this.supportedServices;
    } catch (error) {
      console.error('Service discovery error:', error);
      throw error;
    }
  }

  async readDeviceInfo(deviceId) {
    if (!this.supportedServices.deviceInfo) return null;
    
    try {
      const deviceInfo = {
        manufacturer: await this.safeReadCharacteristic(deviceId, '180A', '2A29'),
        model: await this.safeReadCharacteristic(deviceId, '180A', '2A24'),
        serial: await this.safeReadCharacteristic(deviceId, '180A', '2A25')
      };
      return deviceInfo;
    } catch (error) {
      console.warn('Device info read error:', error);
      return null;
    }
  }

  async safeReadCharacteristic(deviceId, serviceUUID, characteristicUUID) {
    try {
      const characteristic = await this.manager.readCharacteristicForDevice(
        deviceId,
        serviceUUID,
        characteristicUUID
      );
      return characteristic.value || 'Unknown';
    } catch (error) {
      console.warn(`Could not read ${characteristicUUID}:`, error);
      return 'Unavailable';
    }
  }
  monitorSupportedServices(deviceId, onDataReceived) {
    this.clearSubscriptions();
    
    Object.entries(this.supportedServices).forEach(([serviceName, config]) => {
      if (serviceName === 'deviceInfo') return; // Skip device info service
      
      const subscription = this.manager.monitorCharacteristicForDevice(
        deviceId,
        config.service,
        config.characteristic,
        (error, char) => {
          if (error) {
            console.error(`Error monitoring ${serviceName}:`, error);
            return;
          }
          const value = this.parseCharacteristic(char.value, serviceName);
          onDataReceived({ [serviceName]: value });
        }
      );
      this.subscriptions.push(subscription);
    });
  }

  async readCharacteristic(deviceId, serviceUUID, characteristicUUID) {
    try {
      const characteristic = await this.manager.readCharacteristicForDevice(
        deviceId,
        serviceUUID,
        characteristicUUID
      );
      return characteristic.value;
    } catch (error) {
      throw error;
    }
  }

  monitorHealthData(deviceId, onDataReceived) {
    // Clear previous subscriptions
    this.clearSubscriptions();

    // Standard Health Service UUIDs
    const servicesToMonitor = [
      { service: '180D', characteristic: '2A37', name: 'heartRate' }, // Heart Rate
      { service: '1810', characteristic: '2A35', name: 'bloodPressure' }, // Blood Pressure
      { service: '180F', characteristic: '2A19', name: 'batteryLevel' }, // Battery
      { service: '1816', characteristic: '2A5B', name: 'oxygenSaturation' }, // Oxygen
      { service: '1809', characteristic: '2A1C', name: 'temperature' } // Temperature
    ];

    servicesToMonitor.forEach(({ service, characteristic, name }) => {
      const subscription = this.manager.monitorCharacteristicForDevice(
        deviceId,
        service,
        characteristic,
        (error, char) => {
          if (error) {
            console.error(`Error monitoring ${name}:`, error);
            return;
          }
          const value = this.parseCharacteristic(char.value, name);
          onDataReceived({ [name]: value });
        }
      );
      this.subscriptions.push(subscription);
    });
  }

  parseCharacteristic(value, type) {
    if (!value) return null;
    
    try {
      switch (type) {
        case 'heartRate':
          // Heart rate format: first byte is flags, second is value
          const flags = parseInt(value.substr(0, 2), 16);
          const rateValue = parseInt(value.substr(2, 2), 16);
          return rateValue;
          
        case 'bloodPressure':
          // Parse according to BLP spec
          return {
            systolic: parseInt(value.substr(0, 2), 16),
            diastolic: parseInt(value.substr(2, 2), 16),
            mean: parseInt(value.substr(4, 2), 16)
          };
          
        case 'batteryLevel':
          return parseInt(value, 16);
          
        case 'oxygenSaturation':
          return parseInt(value, 16);
          
        case 'temperature':
          // Temperature in Celsius
          return parseInt(value, 16) / 10;
          
        default:
          return value;
      }
    } catch (e) {
      console.error('Parsing error:', e);
      return value;
    }
  }

  clearSubscriptions() {
    this.subscriptions.forEach(sub => sub.remove());
    this.subscriptions = [];
  }

  async disconnect() {
    this.clearSubscriptions();
    if (this.connectedDevice) {
      await this.connectedDevice.cancelConnection();
      this.connectedDevice = null;
    }
  }
}

export default new BluetoothService()