import {
  GlassView,
  isGlassEffectAPIAvailable,
  isLiquidGlassAvailable,
} from "expo-glass-effect";
import type { ReactNode } from "react";
import {
  Platform,
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from "react-native";
import { s } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

export type ButtonProps = Omit<PressableProps, "style"> & {
  children?: ReactNode;
  icon?: ReactNode;
  label?: string;
  style?: StyleProp<ViewStyle>;
  color?: string;
};

export function Button({
  children,
  disabled,
  icon,
  label,
  style,
  color,
  ...props
}: ButtonProps) {
  const { c, resolvedTheme } = useTheme();
  const canUseGlass =
    Platform.OS === "ios" &&
    isLiquidGlassAvailable() &&
    isGlassEffectAPIAvailable();

  const innerContent =
    typeof children === "string" || (!children && label) ? (
      <Text
        style={[
          s.textLg,
          s.fontSemibold,
          {
            color: disabled ? c.mutedForeground : c.foreground,
          },
        ]}
      >
        {children ?? label}
      </Text>
    ) : (
      children
    );

  if (canUseGlass) {
    return (
      <Pressable accessibilityRole="button" disabled={disabled} {...props}>
        <GlassView
          colorScheme={resolvedTheme}
          glassEffectStyle="clear"
          isInteractive={!disabled}
          style={[
            s.flexRow,
            s.itemsCenter,
            s.gap3,
            s.overflowHidden,
            s.p4,
            s.px5,
            s.roundedLg,
            style,
          ]}
          tintColor={disabled ? c.surfaceTertiary : color}
        >
          {icon ? (
            <GlassView
              colorScheme={resolvedTheme}
              glassEffectStyle="regular"
              isInteractive={!disabled}
              style={styles.glassIcon}
            >
              {icon}
            </GlassView>
          ) : null}
          {innerContent}
        </GlassView>
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        s.button,
        s.flexRow,
        s.itemsCenter,
        s.gap2,
        s.overflowHidden,
        s.border1,
        s.p4,
        s.roundedLg,
        {
          backgroundColor: disabled
            ? c.mutedBackground
            : pressed
              ? c.surfaceTertiary
              : c.surfaceSecondary,
          borderColor: c.border,
        },
        style,
      ]}
      {...props}
    >
      {icon ? (
        <View
          style={[
            styles.fallbackIcon,
            {
              backgroundColor: c.background,
            },
          ]}
        >
          {icon}
        </View>
      ) : null}
      {innerContent}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fallbackIcon: {
    alignItems: "center",
    borderRadius: 14,
    height: 48,
    justifyContent: "center",
    width: 48,
  } satisfies ViewStyle,
  glassIcon: {
    alignItems: "center",
    borderRadius: 16,
    height: 48,
    justifyContent: "center",
    width: 48,
  } satisfies ViewStyle,
});
