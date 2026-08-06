import { SymbolView } from "expo-symbols";
import { Pressable } from "react-native";
import { s } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

export function CameraButton() {
  const { c } = useTheme();

  return (
    <Pressable
      onPress={() => console.log("open camera")}
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
        name={{ ios: "viewfinder", android: "scan" }}
        size={22}
        tintColor={c.foreground}
      />
    </Pressable>
  );
}
