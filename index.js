'use strict';

import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

// Import native modules
import RNVoipPushKitNativeModule from './lib/iosPushKit';
import RNVoipCallNativeModule from './lib/RNVoipCall';

// Extract native call module
const { RNVoipCall } = NativeModules;

// ---- FIX: Prevent crash on iOS ----
let VoipEventEmitter = null;

// Only initialize the event emitter if the native module exists (especially for iOS)
if (Platform.OS === 'ios' && RNVoipCall) {
  VoipEventEmitter = new NativeEventEmitter(RNVoipCall);
}

// Export modules safely
export const RNVoipPushKit = RNVoipPushKitNativeModule;

export default {
  ...RNVoipCallNativeModule,
  RNVoipCall,
  VoipEventEmitter,
};
