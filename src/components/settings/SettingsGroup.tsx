import { type ReactNode, useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { s, u } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

type SettingRowProps = {
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
  onPress?: () => void;
  showDivider?: boolean;
};

export function SettingsGroup() {
  const { c } = useTheme();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  return (
    <View
      style={[
        styles.group,
        s.overflowHidden,
        {
          backgroundColor: c.surface,
          borderColor: c.border,
        },
      ]}
    >
      <SettingRow
        title="Push notifications"
        showDivider
        onPress={() => setPushEnabled((value) => !value)}
        trailing={
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: c.surfaceTertiary, true: c.primary }}
            ios_backgroundColor={c.surfaceTertiary}
          />
        }
      />
      <SettingRow
        title="Share usage analytics"
        onPress={() => setAnalyticsEnabled((value) => !value)}
        trailing={
          <Switch
            value={analyticsEnabled}
            onValueChange={setAnalyticsEnabled}
            trackColor={{ false: c.surfaceTertiary, true: c.primary }}
            ios_backgroundColor={c.surfaceTertiary}
          />
        }
      />
    </View>
  );
}

function SettingRow({
  title,
  subtitle,
  trailing,
  onPress,
  showDivider = false,
}: SettingRowProps) {
  const { c } = useTheme();

  return (
    <Pressable
      accessibilityLabel={title}
      accessibilityRole={onPress ? "button" : undefined}
      disabled={!onPress}
      onPress={onPress}
    >
      {({ pressed }) => (
        <>
          <View
            style={[
              styles.row,
              {
                backgroundColor: pressed ? c.surfaceSecondary : c.surface,
              },
            ]}
          >
            <View style={styles.copy}>
              <Text style={[s.textBase, s.fontMedium, { color: c.foreground }]}>
                {title}
              </Text>
              {subtitle ? (
                <Text
                  style={[s.textSm, s.fontNormal, { color: c.mutedForeground }]}
                >
                  {subtitle}
                </Text>
              ) : null}
            </View>
            {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
          </View>
          {showDivider ? (
            <View
              style={[
                styles.divider,
                {
                  backgroundColor: c.border,
                },
              ]}
            />
          ) : null}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  group: {
    borderRadius: u(5),
    borderWidth: StyleSheet.hairlineWidth,
  },
  row: {
    minHeight: u(17),
    paddingHorizontal: u(4),
    paddingVertical: u(3),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: u(4),
  },
  copy: {
    flex: 1,
    gap: u(1),
  },
  trailing: {
    marginLeft: u(3),
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: u(4),
  },
});
