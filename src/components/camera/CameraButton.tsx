import { SymbolView } from "expo-symbols";
import { Button } from "@/components/Button";
import { useTheme } from "@/ui/theme";

export function CameraButton() {
  const { c } = useTheme();
  return (
    <Button
      isIconOnly={true}
      onPress={() => console.log("Camera scanner opened")}
    >
      <SymbolView
        name={{ ios: "viewfinder", android: "scan" }}
        size={22}
        tintColor={c.foreground}
      />
    </Button>
  );
}
