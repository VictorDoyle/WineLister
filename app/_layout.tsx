import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* TODO: For prod, all screens `headerShown: false` but for now keep during build */}
      <Stack.Screen name="index" options={{ title: 'Home' }} />  {/* Home n basic welcome */}
      <Stack.Screen name="auth" options={{ title: 'Authentication' }} /> {/* Auth Screen login/signup*/}
      <Stack.Screen name="homepage" options={{ title: 'Home Page' }} /> {/* Post-Login Home Page */}
      <Stack.Screen name="profile" options={{ title: 'Profile Page' }} /> {/* Profile Page */}
    </Stack>
  );
}
