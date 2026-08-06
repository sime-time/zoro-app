import { useNavigation } from "expo-router";
import type { DrawerNavigationProp } from "expo-router/drawer";
import { SymbolView } from "expo-symbols";
import { Button } from "@/components/Button";
import { useTheme } from "@/ui/theme";

export function DrawerButton() {
  // biome-ignore lint: allow any
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { c } = useTheme();

  return (
    <Button isIconOnly={true} onPress={() => navigation.openDrawer()}>
      <SymbolView
        name={{ ios: "sidebar.left", android: "menu" }}
        size={26}
        tintColor={c.foreground}
      />
    </Button>
  );
}
