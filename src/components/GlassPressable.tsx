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
  View,
  type ViewStyle,
} from "react-native";
import { s } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

type GlassPressableProps = Omit<PressableProps, "style"> & {
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  tintColor?: string;
};

export function GlassPressable({
  children,
  containerStyle,
  style,
  disabled,
  tintColor,
  accessibilityRole = "button",
  ...props
}: GlassPressableProps) {
  const { c, resolvedTheme } = useTheme();

  const canUseGlass =
    Platform.OS === "ios" &&
    isLiquidGlassAvailable() &&
    isGlassEffectAPIAvailable();

  const viewStyle = [
    s.overflowHidden,
    s.border1,
    {
      borderColor: c.border,
    },
    style,
  ];

  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      disabled={disabled}
      style={containerStyle}
      {...props}
    >
      {canUseGlass ? (
        <GlassView
          colorScheme={resolvedTheme}
          glassEffectStyle="regular"
          isInteractive={!disabled}
          style={viewStyle}
          tintColor={disabled ? c.surfaceTertiary : tintColor}
        >
          {children}
        </GlassView>
      ) : (
        <View
          style={[
            viewStyle,
            { backgroundColor: disabled ? c.surfaceTertiary : c.surface },
          ]}
        >
          {children}
        </View>
      )}
    </Pressable>
  );
}
