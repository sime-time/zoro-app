import { type AndroidSymbol, type SFSymbol, SymbolView } from "expo-symbols";
import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { s, u } from "@/ui/styles";
import { type ThemeName, useTheme } from "@/ui/theme";

type SettingRowProps = {
  title: string;
  icon: ReactNode;
  onPress?: () => void;
  showDivider?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function getThemeLabels(theme: ThemeName) {
  if (theme === "dark") {
    return {
      title: "Light mode",
      ios: "sun.max" as SFSymbol,
      android: "sunny" as AndroidSymbol,
    };
  }
  return {
    title: "Dark mode",
    ios: "moon" as SFSymbol,
    android: "moon_stars" as AndroidSymbol,
  };
}

export function SettingsGroup() {
  const { c, toggleTheme, resolvedTheme } = useTheme();
  const themeLabels = getThemeLabels(resolvedTheme);

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
        icon={
          <SymbolView
            name={{ ios: "bell.fill", android: "notifications" }}
            size={18}
            tintColor={c.foreground}
          />
        }
        onPress={() => console.log("Push notifications!")}
        showDivider
      />
      <SettingRow
        title="Edit goals"
        icon={
          <SymbolView
            name={{ ios: "flag", android: "flag" }}
            size={18}
            tintColor={c.foreground}
          />
        }
        onPress={() => console.log("Edit goals!")}
        showDivider
      />
      <SettingRow
        title={themeLabels.title}
        icon={
          <SymbolView name={themeLabels} size={18} tintColor={c.foreground} />
        }
        onPress={toggleTheme}
      />
    </View>
  );
}

function SettingRow({
  title,
  icon,
  onPress,
  showDivider = false,
}: SettingRowProps) {
  const { c } = useTheme();
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <AnimatedPressable
      accessibilityLabel={title}
      accessibilityRole={onPress ? "button" : undefined}
      disabled={!onPress}
      onPressIn={() => {
        opacity.value = withTiming(0.3, { duration: 200 });
      }}
      onPressOut={() => {
        opacity.value = withTiming(1, { duration: 200 });
      }}
      onPress={onPress}
      style={animatedStyle}
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
            <View style={[styles.icon, { backgroundColor: c.background }]}>
              {icon}
            </View>
            <View style={styles.copy}>
              <Text style={[s.textBase, s.fontMedium, { color: c.foreground }]}>
                {title}
              </Text>
            </View>
            <SymbolView
              name={{ ios: "chevron.right", android: "chevron_right" }}
              size={16}
              tintColor={c.muted}
            />
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
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  group: {
    borderRadius: u(5),
    borderWidth: StyleSheet.hairlineWidth,
  },
  row: {
    minHeight: u(14),
    paddingHorizontal: u(3),
    paddingVertical: u(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: u(3),
  },
  icon: {
    width: 36,
    height: 36,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: u(3),
  },
  copy: {
    flex: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: u(4),
  },
});
