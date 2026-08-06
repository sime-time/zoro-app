import { Button, Host } from "@expo/ui/swift-ui";
import {
  buttonBorderShape,
  buttonStyle,
  controlSize,
  labelStyle,
} from "@expo/ui/swift-ui/modifiers";

export function CameraButton() {
  return (
    <Host matchContents>
      <Button
        label="Open camera"
        systemImage="viewfinder"
        modifiers={[
          buttonStyle("glass"),
          labelStyle("iconOnly"),
          buttonBorderShape("circle"),
          controlSize("extraLarge"),
        ]}
        onPress={() => console.log("Camera scanner opened")}
      />
    </Host>
  );
}
