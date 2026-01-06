import { NativeModules, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BleManager } from "react-native-ble-plx";

const { UsageStatsBridge } = NativeModules;
const ble = new BleManager();

const KEY_PREFS = "isolation_prefs";

export async function getPrefs() {
  const raw = await AsyncStorage.getItem(KEY_PREFS);
  return raw ? JSON.parse(raw) : {
    gps: true, calls: false, sms: false, usage: true, bluetooth: true, wifi: false
  };
}

export async function setPrefs(prefs) {
  await AsyncStorage.setItem(KEY_PREFS, JSON.stringify(prefs));
}

// ---------- Usage Access ----------
export function openUsageAccessSettings() {
  if (Platform.OS === "android") UsageStatsBridge?.openUsageAccessSettings();
}

export async function getScreenTimeLast24hMs() {
  if (Platform.OS !== "android") return 0;
  return await UsageStatsBridge.getScreenTimeLast24h();
}

// ---------- Bluetooth scan (counts only) ----------
export async function scanBluetoothCountOnce(seconds = 8) {
  return new Promise((resolve) => {
    const seen = new Set();
    const sub = ble.onStateChange((state) => {
      if (state !== "PoweredOn") return;
      ble.startDeviceScan(null, { allowDuplicates: false }, (err, device) => {
        if (device?.id) seen.add(device.id);
      });

      setTimeout(() => {
        ble.stopDeviceScan();
        sub.remove();
        resolve(seen.size);
      }, seconds * 1000);
    }, true);
  });
}
