import { Text, View } from "react-native";
import { s } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

export function MacroLabel({ grams, label }: { grams: number; label: string }) {
  const { c } = useTheme();

  return (
    <View style={s.itemsEnd}>
      <Text style={[s.textSm, s.fontSemibold, { color: c.foreground }]}>
        {grams}g
      </Text>
      <Text style={[s.textSm, s.fontMedium, { color: c.muted }]}>{label}</Text>
    </View>
  );
}
