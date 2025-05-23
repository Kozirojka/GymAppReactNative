import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { BASIC_API } from "../../../utils/BASIC_API";
import nfcImage from "../../../assets/image.png";
import { useAuth } from "../../RootStack";

const SettingsOverlay = ({ visible, onClose, navigation }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.settingsContainer}>
              <View style={styles.settingsHeader}>
                <Text style={styles.settingsTitle}>Налаштування</Text>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close-outline" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <View style={styles.settingsContent}>
                <TouchableOpacity
                  style={styles.settingsItem}
                  onPress={() => {
                    onClose();
                    navigation.navigate("EditProfile");
                  }}
                >
                  <Ionicons name="person-outline" size={24} color="#555" />
                  <Text style={styles.settingsItemText}>
                    Редагувати профіль
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingsItem}>
                  <Ionicons
                    name="notifications-outline"
                    size={24}
                    color="#555"
                  />
                  <Text style={styles.settingsItemText}>Сповіщення</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingsItem}>
                  <Ionicons name="shield-outline" size={24} color="#555" />
                  <Text style={styles.settingsItemText}>Конфіденційність</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingsItem}>
                  <Ionicons name="lock-closed-outline" size={24} color="#555" />
                  <Text style={styles.settingsItemText}>Змінити пароль</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingsItem}>
                  <Ionicons name="help-circle-outline" size={24} color="#555" />
                  <Text style={styles.settingsItemText}>Довідка</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.settingsItem, styles.logoutItem]}
                >
                  <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
                  <Text style={[styles.settingsItemText, styles.logoutText]}>
                    Вийти
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const ProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const { fullName } = useAuth();

  useEffect(() => {
    console.log("✅ FullName from context:", fullName); 
    setProfileImage(nfcImage);
  }, []);


  useEffect(() => {
    setProfileImage(nfcImage);
  }, []);

  const handleNfcPress = async () => {
    try {
      let userToken = await AsyncStorage.getItem("userToken");
      console.log("User token:", userToken);
      const response = await fetch(`${BASIC_API}/contribution`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Помилка від сервера");
      }

      Alert.alert("✅ Успіх", "NFC запит надіслано!");
    } catch (error) {
      console.error("⛔️ NFC Error:", error);
      Alert.alert("⚠️ Помилка", "Не вдалося надіслати запит.");
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Профіль</Text>
        <TouchableOpacity onPress={() => setSettingsVisible(true)}>
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>
             {fullName ? fullName : 'Anonymous User'}
            </Text>
          <Text style={styles.subscription}>
            Subscription Start: Jan 1, 2025
          </Text>
          <Text style={styles.subscription}>Subscription End: Jan 1, 2026</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => alert("Saved Exercise")}
        >
          <Text style={styles.customButtonText}>Saved Exercise</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate("Subscription")}
        >
          <Text style={styles.customButtonText}>Renew Subscription</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.nfcModule} onPress={handleNfcPress}>
        <Text style={styles.nfcText}>NFC Module</Text>
        <Image source={nfcImage} style={styles.nfcImage} />
        <Text style={styles.nfcText}>Use NFC here!</Text>
      </TouchableOpacity>

      <SettingsOverlay
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: { flex: 1, padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  profileContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  profileInfo: { marginLeft: 16 },
  name: { fontSize: 18, fontWeight: "bold" },
  subscription: { fontSize: 14, color: "#666" },
  buttonContainer: { marginVertical: 20 },
  nfcModule: {
    marginTop: 30,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#e0f7fa",
    alignItems: "center",
  },
  nfcText: { fontSize: 16, color: "#00796b" },
  nfcImage: { width: 100, height: 100, marginVertical: 10 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  settingsContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  settingsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingsTitle: { fontSize: 20, fontWeight: "bold" },
  settingsContent: { marginTop: 20 },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  settingsItemText: { marginLeft: 10, fontSize: 16 },
  logoutItem: { marginTop: 20 },
  logoutText: { color: "#FF3B30" },
  customButton: {
    backgroundColor: "#000",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
    alignItems: "center",
  },
  customButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
