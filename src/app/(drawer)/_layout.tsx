import { Drawer } from "expo-router/drawer";
import { SymbolView } from "expo-symbols";
import { CameraButton } from "@/components/camera/CameraButton";
import { DrawerButton } from "@/components/drawer/DrawerButton";
import { s } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

export default function DrawerLayout() {
  const { c } = useTheme();

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerLeft: () => <DrawerButton />,
        headerShadowVisible: false,
        headerTitle: "",
        headerTransparent: true,
        headerLeftContainerStyle: s.pl4,
        headerRightContainerStyle: s.pr4,
        sceneStyle: {
          backgroundColor: c.background,
        },
        drawerStyle: {
          backgroundColor: c.background,
          width: 300,
        },
        drawerActiveBackgroundColor: c.surfaceTertiary,
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
          headerRight: () => <CameraButton />,
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
              name={{ ios: "gearshape.fill", android: "settings" }}
              size={size}
              tintColor={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="keyboard"
        options={{
          drawerLabel: "Keyboard",
          drawerIcon: ({ color, size }) => (
            <SymbolView
              name={{ ios: "gearshape.fill", android: "settings" }}
              size={size}
              tintColor={color}
            />
          ),
        }}
      />
    </Drawer>
  );
}
