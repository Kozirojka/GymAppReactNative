import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const screenWidth = Dimensions.get('window').width;

const ExerciseDetails = ({ route }) => {
  const { exercise } = route.params;

  const extractVideoId = (url) => {
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(exercise.youtubeUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise.title}</Text>
      <View style={styles.videoContainer}>
        {videoId ? (
          <WebView
            style={styles.webview}ц
            source={{ uri: embedUrl }}
            allowsFullscreenVideo
          />
        ) : (
          <Text>Video not available</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
});

export default ExerciseDetails;
