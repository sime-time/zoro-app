import { SymbolView } from "expo-symbols";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { DonutChart } from "@/components/charts/DonutChart";
import { ProgressBar } from "@/components/charts/ProgressBar";
import { s, u } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

const calories = {
  value: 653,
  goal: 2470,
};

const protein = {
  value: 62,
  goal: 135,
};

const carbs = {
  value: 210,
  goal: 235,
};

const fat = {
  value: 64,
  goal: 95,
};

function NutritionBar({
  title,
  value,
  goal,
  color,
}: {
  title: string;
  value: number;
  goal: number;
  color?: string;
}) {
  const { c } = useTheme();

  return (
    <View style={[s.gap2]}>
      <View style={[s.flexRow, s.itemsEnd, s.justifyBetween]}>
        <Text style={[s.textXl, s.fontSemibold, { color: c.foreground }]}>
          {title}
        </Text>

        <Text style={[s.textLg, s.fontSemibold, { color: c.foreground }]}>
          {value}/{goal}g
        </Text>
      </View>

      <ProgressBar value={value} max={goal} height={u(7)} color={color} />
    </View>
  );
}

export default function NutritionDetailsSheet() {
  const { c } = useTheme();

  const caloriesLeft = calories.goal - calories.value;

  return (
    <SafeAreaView style={s.flex1}>
      <View style={[s.p6, s.gap4]}>
        <View style={[s.flexRow, s.itemsCenter, s.gap5]}>
          <DonutChart
            value={calories.value}
            max={calories.goal}
            size={u(30)}
            strokeWidth={u(6)}
          />

          <View style={s.gap1}>
            <Text style={[s.text2xl, s.fontSemibold, { color: c.foreground }]}>
              {calories.value} / {calories.goal} cals
            </Text>
            <Text style={[s.textBase, s.fontMedium, { color: c.muted }]}>
              {caloriesLeft} cals left
            </Text>
          </View>
        </View>

        <NutritionBar
          title="Protein"
          value={protein.value}
          goal={protein.goal}
          color={c.destructive}
        />

        <NutritionBar
          title="Carbs"
          value={carbs.value}
          goal={carbs.goal}
          color={c.info}
        />

        <NutritionBar
          title="Fat"
          value={fat.value}
          goal={fat.goal}
          color={c.warning}
        />

        <Button
          label="Edit my goals"
          variant="ghost"
          textColor={c.mutedForeground}
          style={[s.justifyCenter, s.mt2]}
          icon={
            <SymbolView
              name={{ ios: "flag", android: "flag" }}
              size={18}
              tintColor={c.mutedForeground}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}
