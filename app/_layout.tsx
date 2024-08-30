import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />  {/* Home n basic welcome */}
      <Stack.Screen name="auth" options={{ title: 'Authentication' }} /> {/* Auth Screen login/signup*/}
    </Stack>
  );
}
