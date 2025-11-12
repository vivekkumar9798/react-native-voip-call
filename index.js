'use strict';

import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

// Import native modules
import RNVoipPushKitNativeModule from './lib/iosPushKit';
import RNVoipCallNativeModule from './lib/RNVoipCall'; // Only exists if Android has it

const { RNVoipCall } = NativeModules;

// ✅ Safe emitter (no crash even if module missing)
let VoipEventEmitter = null;

if (Platform.OS === 'ios' && RNVoipCall) {
  VoipEventEmitter = new NativeEventEmitter(RNVoipCall);
} else {
  console.warn(
    `⚠️ RNVoipCall native module not found on ${Platform.OS}. EventEmitter disabled.`
  );
}

// Export modules safely
export const RNVoipPushKit = RNVoipPushKitNativeModule;

export default {
  ...RNVoipCallNativeModule,
  RNVoipCall,
  VoipEventEmitter,
};
