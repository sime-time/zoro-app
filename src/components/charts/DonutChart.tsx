import Svg, { Circle } from "react-native-svg";
import { u } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

interface DonutChartProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
}

export function DonutChart({
  value,
  max,
  size = u(12),
  strokeWidth = u(2),
  color,
  trackColor,
}: DonutChartProps) {
  const { c } = useTheme();

  const progress = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke={trackColor ?? c.surfaceTertiary}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke={color ?? c.primary}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={dashOffset}
        transform={`rotate(-90 ${center} ${center})`}
      />
    </Svg>
  );
}
