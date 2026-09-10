import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { u } from "@/ui/styles";
import { ThemeProvider, useTheme } from "@/ui/theme";

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <ThemeProvider>
        <AppStack />
      </ThemeProvider>
    </KeyboardProvider>
  );
}

function AppStack() {
  const { c } = useTheme();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(drawer)" />
      <Stack.Screen
        name="sheets/total-nutrition"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.4],
          sheetInitialDetentIndex: 0,
          sheetGrabberVisible: true,
          sheetCornerRadius: u(10),
          contentStyle: { backgroundColor: c.background },
        }}
      />
      <Stack.Screen
        name="sheets/food-details"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.8],
          sheetInitialDetentIndex: 0,
          sheetGrabberVisible: true,
          sheetCornerRadius: u(10),
          contentStyle: { backgroundColor: c.background },
        }}
      />
    </Stack>
  );
}
