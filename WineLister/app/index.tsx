import { Text, View, Button, Alert, StyleSheet, Pressable } from "react-native";
import { rgbaColor } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome To WineLister</Text>
      <View style={styles.fixToText}>
        <Pressable style={styles.introButton} onPress={() => Alert.alert('Login button pressed')}>
          <Text style={styles.title}>Login </Text>
        </Pressable>
        <Pressable style={styles.introButton} onPress={() => Alert.alert('Signup button pressed')}>
          <Text style={styles.title}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  introButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 20,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: 'grey'
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
})