import { useHeaderHeight } from "expo-router/build/react-navigation";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingsGroup } from "@/components/settings/SettingsGroup";
import { UpgradeButton } from "@/components/settings/UpgradeButton";
import { s, u } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

export default function SettingsScreen() {
  const { c } = useTheme();
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView style={s.flex1}>
      <ScrollView
        contentContainerStyle={[
          s.flexGrow,
          s.p6,
          s.gap6,
          { paddingTop: headerHeight - u(6) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[s.text2xl, s.fontSemibold, { color: c.foreground }]}>
          Settings
        </Text>
        <UpgradeButton />
        <SettingsGroup />
      </ScrollView>
    </SafeAreaView>
  );
}
