import { Button, Host } from "@expo/ui/swift-ui";
import {
  buttonBorderShape,
  buttonStyle,
  controlSize,
  labelStyle,
} from "@expo/ui/swift-ui/modifiers";
import { useNavigation } from "expo-router";
import type { DrawerNavigationProp } from "expo-router/drawer";

export function DrawerButton() {
  // biome-ignore lint: allow any
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <Host matchContents>
      <Button
        label="Open menu"
        systemImage="sidebar.left"
        modifiers={[
          buttonStyle("glass"),
          labelStyle("iconOnly"),
          buttonBorderShape("circle"),
          controlSize("extraLarge"),
        ]}
        onPress={() => navigation.openDrawer()}
      />
    </Host>
  );
}
