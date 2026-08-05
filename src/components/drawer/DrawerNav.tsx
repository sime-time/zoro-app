import { Drawer } from "expo-router/drawer";
import { SymbolView } from "expo-symbols";
import { useTheme } from "@/ui/theme";

export function DrawerNav() {
  const { c } = useTheme();

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: c.background,
        },
        drawerStyle: {
          backgroundColor: c.background,
          width: 280,
        },
        drawerActiveBackgroundColor: c.surface,
        drawerActiveTintColor: c.foreground,
        drawerInactiveTintColor: c.foreground,
        drawerItemStyle: {
          borderRadius: 16,
          marginHorizontal: 6,
          marginVertical: 4,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Nutrition",
          drawerIcon: ({ color, size }) => (
            <SymbolView
              name={{ ios: "fork.knife", android: "fork_spoon" }}
              size={size}
              tintColor={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="workout"
        options={{
          drawerLabel: "Workout",
          drawerIcon: ({ color, size }) => (
            <SymbolView
              name={{ ios: "dumbbell.fill", android: "exercise" }}
              size={size}
              tintColor={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="stats"
        options={{
          drawerLabel: "Stats",
          drawerIcon: ({ color, size }) => (
            <SymbolView
              name={{ ios: "chart.bar.xaxis", android: "bar_chart" }}
              size={size}
              tintColor={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          drawerIcon: ({ color, size }) => (
            <SymbolView
              name={{ ios: "gearshape", android: "settings" }}
              size={size}
              tintColor={color}
            />
          ),
        }}
      />
    </Drawer>
  );
}
