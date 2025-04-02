import { StyleSheet, Text, SafeAreaView, Button, Alert } from 'react-native';

export default function App() {

  const handleTextPress = () => {
    console.log('Text pressed');
  };

  const handleButtonPress = () => {
    Alert.alert("Button pressed", "Main message", [
      {text: "Yes", onPress: () => console.log("Yes pressed")},
      {text: "No", onPress: () => console.log("No pressed")},
    ]);
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text  style={styles.text} onPress={handleTextPress}>Open up App.js to
        {'\n'}start working on your app!</Text>

      <Button title="Press me" color="red" onPress={handleButtonPress}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    color: 'red',
  },
});
