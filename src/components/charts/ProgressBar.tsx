import { View } from "react-native";
import { s, u } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

export function ProgressBar({
  value,
  max,
  height = u(3),
  color,
  trackColor,
}: {
  value: number;
  max: number;
  height?: number;
  color?: string;
  trackColor?: string;
}) {
  const { c } = useTheme();

  const progress = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0;

  return (
    <View
      style={[
        s.overflowHidden,
        s.roundedSm,
        {
          height,
          backgroundColor: trackColor ?? c.surfaceTertiary,
        },
      ]}
    >
      <View
        style={[
          s.hFull,
          s.roundedSm,
          {
            width: `${progress * 100}%`,
            backgroundColor: color ?? c.primary,
          },
        ]}
      />
    </View>
  );
}
