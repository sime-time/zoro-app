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
  type ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { s } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = Omit<PressableProps, "style"> & {
  children?: ReactNode;
  label?: string;
  style?: StyleProp<ViewStyle>;
  color?: string;
  textColor?: string;
  icon?: ReactNode;
  isIconOnly?: boolean;
  size?: ButtonSize;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({
  children,
  disabled,
  label,
  style,
  color,
  textColor,
  icon,
  isIconOnly,
  size = "md",
  ...props
}: ButtonProps) {
  const { c, resolvedTheme } = useTheme();
  const canUseGlass =
    Platform.OS === "ios" &&
    isLiquidGlassAvailable() &&
    isGlassEffectAPIAvailable();

  // Animations to match Liquid Glass
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const innerContent =
    typeof children === "string" || (!children && label) ? (
      <Text
        style={[
          s.textLg,
          s.fontSemibold,
          {
            color: disabled ? c.mutedForeground : (textColor ?? c.foreground),
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
            isIconOnly ? iconOnlyStyles[size] : sizeStyles[size],
            isIconOnly ? s.roundedFull : s.roundedLg,
            style,
          ]}
          tintColor={disabled ? c.surfaceTertiary : color}
        >
          {icon}
          {innerContent}
        </GlassView>
      </Pressable>
    );
  }

  return (
    <AnimatedPressable
      accessibilityRole="button"
      disabled={disabled}
      onPressIn={(event) => {
        opacity.value = withTiming(0.3, { duration: 200 });
        props.onPressIn?.(event);
      }}
      onPressOut={(event) => {
        opacity.value = withTiming(1, { duration: 200 });
        props.onPressOut?.(event);
      }}
      style={[
        s.flexRow,
        s.itemsCenter,
        s.gap3,
        s.overflowHidden,
        s.border1,
        isIconOnly ? iconOnlyStyles[size] : sizeStyles[size],
        isIconOnly ? s.roundedFull : s.roundedLg,
        {
          backgroundColor: disabled ? c.surfaceTertiary : (color ?? c.surface),
          borderColor: c.border,
        },
        animatedStyle,
        style,
      ]}
      {...props}
    >
      {icon}
      {innerContent}
    </AnimatedPressable>
  );
}
const sizeStyles = StyleSheet.create({
  sm: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  xl: {
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
});

const iconOnlyStyles = StyleSheet.create({
  sm: {
    width: 36,
    height: 36,
    padding: 0,
    justifyContent: "center",
  },
  md: {
    width: 48,
    height: 48,
    padding: 0,
    justifyContent: "center",
  },
  lg: {
    width: 56,
    height: 56,
    padding: 0,
    justifyContent: "center",
  },
});
