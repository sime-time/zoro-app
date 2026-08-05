import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerButton } from "@/components/drawer/DrawerButton";
import { s } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

export default function StatsScreen() {
  const { c } = useTheme();

  return (
    <SafeAreaView style={s.flex1}>
      <View style={[s.px3, s.flexRow, s.justifyBetween]}>
        <DrawerButton />
      </View>

      <View style={[s.flex1, s.justifyCenter, s.itemsCenter]}>
        <Text style={{ color: c.foreground }}>Stats</Text>
      </View>
    </SafeAreaView>
  );
}
