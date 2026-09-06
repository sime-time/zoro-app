import {
  type DimensionValue,
  type StyleProp,
  View,
  type ViewStyle,
} from "react-native";
import { u } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

export interface StackedBarChartSegment {
  value: number;
  color: string;
}

export function StackedBarChart({
  segments,
  orientation = "horizontal",
  length = "100%",
  thickness = u(5),
  gap = 0,
  borderRadius = 999,
  trackColor,
  style,
}: {
  segments: StackedBarChartSegment[];
  orientation?: "vertical" | "horizontal";
  length?: DimensionValue;
  thickness?: DimensionValue;
  gap?: number;
  borderRadius?: number;
  trackColor?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const { c } = useTheme();

  const visibleSegments = segments.filter((segment) => segment.value > 0);
  const total = visibleSegments.reduce(
    (sum, segment) => sum + segment.value,
    0,
  );

  const isHorizontal = orientation === "horizontal";
  const sizeStyle = isHorizontal
    ? { width: length, height: thickness }
    : { width: thickness, height: length };

  return (
    <View
      style={[
        {
          gap,
          borderRadius,
          backgroundColor: trackColor ?? c.surfaceTertiary,
          flexDirection: isHorizontal ? "row" : "column-reverse",
          overflow: "hidden",
        },
        sizeStyle,
        style,
      ]}
    >
      {total > 0 &&
        visibleSegments.map((segment, index) => (
          <View
            key={`${segment.color}-${index.toString()}`}
            style={{
              overflow: "hidden",
              flex: segment.value,
              backgroundColor: segment.color,
              borderRadius,
            }}
          />
        ))}
    </View>
  );
}
