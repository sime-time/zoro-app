import { SymbolView } from "expo-symbols";
import { ScrollView, Text } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { s } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

export default function SettingsScreen() {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={s.flex1}>
      <ScrollView
        contentContainerStyle={[
          s.flexGrow,
          s.p6,
          s.gap6,
          { paddingTop: insets.top * 1.5 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[s.text2xl, s.fontSemibold, { color: c.foreground }]}>
          Settings
        </Text>
        <Button
          label="Light Mode"
          color={c.success}
          /*icon={<SymbolView name="arrow.up" size={26} tintColor="white" />}*/
        />
      </ScrollView>
    </SafeAreaView>
  );
}
