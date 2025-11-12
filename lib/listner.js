import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

const RNVoipCallModule = NativeModules.RNVoipCall;
const isModuleAvailable = !!RNVoipCallModule;
const eventEmitter = isModuleAvailable
  ? new NativeEventEmitter(RNVoipCallModule)
  : null;

const ensureEventEmitter = (eventName) => {
  if (eventEmitter) {
    return true;
  }

  console.warn(
    `[react-native-voip-call] Native module is not linked. Listener "${eventName}" ignored.`,
  );

  return false;
};

const RNVoipCallPerformAnswerCallAction = 'RNVoipCallPerformAnswerCallAction';
const RNVoipCallPerformEndCallAction = 'RNVoipCallPerformEndCallAction';
const RNVoipCallMissedCallTap = 'RNVoipCallMissedCallTap';

//Ios
const RNVoipCallDidReceiveStartCallAction = 'RNVoipCallDidReceiveStartCallAction';
const RNVoipCallDidActivateAudioSession = 'RNVoipCallDidActivateAudioSession';
const RNVoipCallDidDeactivateAudioSession = 'RNVoipCallDidDeactivateAudioSession';
const RNVoipCallDidDisplayIncomingCall = 'RNVoipCallDidDisplayIncomingCall';
const RNVoipCallDidPerformSetMutedCallAction = 'RNVoipCallDidPerformSetMutedCallAction';
const RNVoipCallDidToggleHoldAction = 'RNVoipCallDidToggleHoldAction';
const RNVoipCallDidPerformDTMFAction = 'RNVoipCallDidPerformDTMFAction';
const RNVoipCallProviderReset = 'RNVoipCallProviderReset';
const RNVoipCallCheckReachability = 'RNVoipCallCheckReachability';

//Android
const RNVoipCallFullScreenIntent = 'RNVoipCallFullScreenIntent';
const RNVoipCallNotificationTap = 'RNVoipCallNotificationTap';

const isIOS = Platform.OS === 'ios';

const didReceiveStartCallAction = handler => {
  if (!ensureEventEmitter(RNVoipCallDidReceiveStartCallAction)) {
    return {remove: () => {}};
  }

  if (isIOS && RNVoipCallModule?._startCallActionEventListenerAdded) {
    // Tell CallKeep that we are ready to receive `RNVoipCallDidReceiveStartCallAction` event and prevent delay
    RNVoipCallModule._startCallActionEventListenerAdded();
  }

  return eventEmitter.addListener(RNVoipCallDidReceiveStartCallAction, (data) => handler(data));
};

const answerCall = handler =>
  ensureEventEmitter(RNVoipCallPerformAnswerCallAction)
    ? eventEmitter.addListener(RNVoipCallPerformAnswerCallAction, (data) => {
        let uuids = isIOS ? data.callUUID : data.callerId;
        handler({callerId : uuids})}
      )
    : {remove: () => {}};

const endCall = handler =>
  ensureEventEmitter(RNVoipCallPerformEndCallAction)
    ? eventEmitter.addListener(RNVoipCallPerformEndCallAction, (data) =>{
        let uuids = isIOS ? data.callUUID : data.callerId;
        handler({callerId : uuids})}
      )
    : {remove: () => {}};

const didActivateAudioSession = handler =>
  ensureEventEmitter(RNVoipCallDidActivateAudioSession)
    ? eventEmitter.addListener(RNVoipCallDidActivateAudioSession, handler)
    : {remove: () => {}};

const didDeactivateAudioSession = handler =>
  ensureEventEmitter(RNVoipCallDidDeactivateAudioSession)
    ? eventEmitter.addListener(RNVoipCallDidDeactivateAudioSession, handler)
    : {remove: () => {}};

const didDisplayIncomingCall = handler =>
  ensureEventEmitter(RNVoipCallDidDisplayIncomingCall)
    ? eventEmitter.addListener(RNVoipCallDidDisplayIncomingCall, (data) => handler(data))
    : {remove: () => {}};

const didPerformSetMutedCallAction = handler =>
  ensureEventEmitter(RNVoipCallDidPerformSetMutedCallAction)
    ? eventEmitter.addListener(RNVoipCallDidPerformSetMutedCallAction, (data) => handler(data))
    : {remove: () => {}};

const didToggleHoldCallAction = handler =>
  ensureEventEmitter(RNVoipCallDidToggleHoldAction)
    ? eventEmitter.addListener(RNVoipCallDidToggleHoldAction, handler)
    : {remove: () => {}};

const didPerformDTMFAction = handler =>
  ensureEventEmitter(RNVoipCallDidPerformDTMFAction)
    ? eventEmitter.addListener(RNVoipCallDidPerformDTMFAction, (data) => handler(data))
    : {remove: () => {}};

const didResetProvider = handler =>
  ensureEventEmitter(RNVoipCallProviderReset)
    ? eventEmitter.addListener(RNVoipCallProviderReset, handler)
    : {remove: () => {}};

const checkReachability = handler =>
  ensureEventEmitter(RNVoipCallCheckReachability)
    ? eventEmitter.addListener(RNVoipCallCheckReachability, handler)
    : {remove: () => {}};
  
const onMissedCallOpen = handler =>
  ensureEventEmitter(RNVoipCallMissedCallTap)
    ? eventEmitter.addListener(RNVoipCallMissedCallTap, handler)
    : {remove: () => {}};
  
//Android Only
const onCallOpenAppEvent = handler =>
  ensureEventEmitter(RNVoipCallFullScreenIntent)
    ? eventEmitter.addListener(RNVoipCallFullScreenIntent, handler)
    : {remove: () => {}};
  
const onCallNotificationOpen = handler =>
  ensureEventEmitter(RNVoipCallNotificationTap)
    ? eventEmitter.addListener(RNVoipCallNotificationTap, handler)
    : {remove: () => {}};

export const listeners = {
  didReceiveStartCallAction,
  answerCall,
  endCall,
  didActivateAudioSession,
  didDeactivateAudioSession,
  didDisplayIncomingCall,
  didPerformSetMutedCallAction,
  didToggleHoldCallAction,
  didPerformDTMFAction,
  didResetProvider,
  checkReachability,
  onMissedCallOpen,
  onCallNotificationOpen,
  onCallOpenAppEvent
  
};
