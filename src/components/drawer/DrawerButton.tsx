import { useNavigation } from "expo-router";
import type { DrawerNavigationProp } from "expo-router/drawer";
import { SymbolView } from "expo-symbols";
import { Pressable } from "react-native";
import { s } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

export function DrawerButton() {
  // biome-ignore lint: allow any
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { c } = useTheme();

  return (
    <Pressable
      onPress={() => navigation.openDrawer()}
      style={[
        s.p2,
        s.roundedFull,
        s.justifyCenter,
        s.itemsCenter,
        {
          backgroundColor: c.surfaceSecondary,
          borderColor: c.border,
        },
      ]}
    >
      <SymbolView
        name={{ ios: "line.3.horizontal", android: "menu" }}
        size={22}
        tintColor={c.foreground}
      />
    </Pressable>
  );
}
