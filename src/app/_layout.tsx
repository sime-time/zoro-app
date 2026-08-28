import { Stack } from "expo-router";
import { u } from "@/ui/styles";
import { ThemeProvider } from "@/ui/theme";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)" />
        <Stack.Screen
          name="sheets/nutrition-details"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: [0.6, 0.8],
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
            sheetCornerRadius: u(10),
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
