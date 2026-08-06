import { SymbolView } from "expo-symbols";
import { Button } from "@/components/Button";
import { s } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

export function UpgradeButton() {
  const { c } = useTheme();
  return (
    <Button
      label="Upgrade to Premium"
      size="md"
      style={s.px3}
      color={c.success}
      icon={
        <Button isIconOnly disabled size="sm" style={s.rounded}>
          <SymbolView
            name={{ ios: "arrow.up", android: "arrow_upward" }}
            size={18}
            tintColor={c.foreground}
          />
        </Button>
      }
    />
  );
}
