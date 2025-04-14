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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

  useEffect(() => {
    setProfileImage(
      "https://images.unsplash.com/photo-1601071160139-446ba0bc1492"
    );
  }, []);

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
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.subscription}>
            Subscription Start: Jan 1, 2025
          </Text>
          <Text style={styles.subscription}>Subscription End: Jan 1, 2026</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Saved Exercise"
          onPress={() => alert("Saved Exercise")}
        />
        <Button
          title="Renew Subscription"
          onPress={() => navigation.navigate("Subscription")}
        />
      </View>

      <View style={styles.nfcModule}>
        <Text style={styles.nfcText}>NFC Module</Text>
        <Image
          source={{ uri: "https://example.com/nfc-image.png" }}
          style={styles.nfcImage}
        />
        <Text style={styles.nfcText}>Use NFC here!</Text>
      </View>

      <SettingsOverlay
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subscription: {
    fontSize: 14,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  nfcModule: {
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 20,
  },
  nfcImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  nfcText: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  settingsContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
    maxHeight: "70%",
  },
  settingsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  settingsContent: {
    paddingHorizontal: 20,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingsItemText: {
    fontSize: 16,
    marginLeft: 16,
    color: "#333",
  },
  logoutItem: {
    borderBottomWidth: 0,
    marginTop: 20,
  },
  logoutText: {
    color: "#FF3B30",
  },
});

export default ProfileScreen;
