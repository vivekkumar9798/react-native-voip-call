'use strict';

import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

// Import native modules
import RNVoipPushKitNativeModule from './lib/iosPushKit';
import RNVoipCallNativeModule from './lib/RNVoipCall';

// Extract native call module
const { RNVoipCall } = NativeModules;

// ---- FIX: Prevent crash on iOS ----
let VoipEventEmitter = null;
if (Platform.OS === 'ios' && RNVoipCall) {
  VoipEventEmitter = new NativeEventEmitter(RNVoipCall);
} else if (Platform.OS === 'android') {
  VoipEventEmitter = new NativeEventEmitter();
}

// Export modules
export const RNVoipPushKit = RNVoipPushKitNativeModule;

export default {
  ...RNVoipCallNativeModule,
  RNVoipCall,
  VoipEventEmitter,
};
