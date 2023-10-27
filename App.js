import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Home from './src/Pages/Home/home';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar style={["auto", styles.StatusBar]} />
          <Home />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 30,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  statusbar: {
    backgroundColor: '#F7EC09',
  }
});
