import { Text, View } from "react-native";
import { StackedBarChart } from "@/components/charts/StackedBarChart";
import { s, u } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

// Use largest remainder method to make sure percentages actually add up to 100%
function getRoundedPercents(values: number[]) {
  const total = values.reduce((sum, value) => sum + value, 0);

  if (total <= 0) {
    // Stop here to prevent division by zero error
    return values.map(() => 0);
  }

  const rawPercents = values.map((value) => (value / total) * 100);
  const roundedDown = rawPercents.map(Math.floor);
  const remaining = 100 - roundedDown.reduce((sum, value) => sum + value, 0);

  // Raw percentages may add up to 99, not 100.
  // So we add 1 to the value with the highest decimal amount.
  const byRemainder = rawPercents
    .map((value, index) => ({
      index,
      remainder: value - Math.floor(value),
    }))
    .sort((a, b) => b.remainder - a.remainder);

  for (let i = 0; i < remaining; i += 1) {
    roundedDown[byRemainder[i].index] += 1;
  }

  return roundedDown;
}

function MacroItem({
  label,
  grams,
  percent,
  color,
}: {
  label: string;
  grams: number;
  percent: number;
  color: string;
}) {}
