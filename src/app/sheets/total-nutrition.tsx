import { SymbolView } from "expo-symbols";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { DonutChart } from "@/components/charts/DonutChart";
import { ProgressBar } from "@/components/charts/ProgressBar";
import { s, u } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

const calories = {
  value: 1910,
  goal: 2470,
};

const protein = {
  value: 85,
  goal: 135,
};

const carbs = {
  value: 190,
  goal: 235,
};

const fat = {
  value: 56,
  goal: 95,
};

function NutritionBar({
  name,
  value,
  goal,
  color,
}: {
  name: string;
  value: number;
  goal: number;
  color?: string;
}) {
  const { c } = useTheme();

  return (
    <View style={[s.gap2, s.flex1]}>
      <Text
        style={[
          s.textSm,
          s.fontSemibold,
          s.textCenter,
          { color: c.mutedForeground },
        ]}
      >
        {name.toUpperCase()}
      </Text>

      <ProgressBar value={value} max={goal} height={u(2.5)} color={color} />

      <View style={[s.flexRow, s.gap1, s.itemsCenter, s.justifyCenter]}>
        <Text style={[s.textLg, s.fontMedium, { color: c.foreground }]}>
          {value}
        </Text>
        <Text style={[s.textSm, s.fontMedium, { color: c.muted }]}>/</Text>
        <Text style={[s.textSm, { color: c.muted }]}>{goal} g</Text>
      </View>
    </View>
  );
}

export default function TotalNutritionSheet() {
  const { c } = useTheme();

  const caloriesLeft = calories.goal - calories.value;

  return (
    <SafeAreaView style={s.flex1}>
      <View style={[s.p6, s.gap8]}>
        <View style={[s.flexRow, s.itemsCenter, s.gap5]}>
          <DonutChart
            value={calories.value}
            max={calories.goal}
            size={u(29)}
            strokeWidth={u(3.5)}
          />

          <View style={s.gap1}>
            <View style={[s.flexRow, s.itemsCenter, s.gap1]}>
              <Text
                style={[s.text3xl, s.fontSemibold, { color: c.foreground }]}
              >
                {calories.value}
              </Text>
              <Text style={[s.textXl, s.fontMedium, { color: c.muted }]}>
                /
              </Text>
              <Text style={[s.textXl, s.fontMedium, { color: c.muted }]}>
                {calories.goal} cals
              </Text>
            </View>
            <Text style={[s.textBase, s.fontMedium, { color: c.muted }]}>
              {caloriesLeft} cals left
            </Text>
          </View>
        </View>

        <View style={[s.flexRow, s.justifyBetween, s.gap6]}>
          <NutritionBar
            name="Protein"
            value={protein.value}
            goal={protein.goal}
            color={c.destructive}
          />

          <NutritionBar
            name="Carbs"
            value={carbs.value}
            goal={carbs.goal}
            color={c.info}
          />

          <NutritionBar
            name="Fat"
            value={fat.value}
            goal={fat.goal}
            color={c.warning}
          />
        </View>

        <Button
          label="Edit my goals"
          variant="ghost"
          textColor={c.mutedForeground}
          style={[s.justifyCenter]}
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
