import { StackedBarChart } from "@/components/charts/StackedBarChart";
import { u } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

export default function FoodDetailsSheet() {
  const { c } = useTheme();

  return (
    <StackedBarChart
      orientation="horizontal"
      length={u(40)}
      thickness={u(5)}
      trackColor="transparent"
      segments={[
        { value: 20, color: c.destructive },
        { value: 40, color: c.info },
        { value: 30, color: c.warning },
      ]}
    />
  );
}
