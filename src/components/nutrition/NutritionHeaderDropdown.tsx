import {
  GlassView,
  isGlassEffectAPIAvailable,
  isLiquidGlassAvailable,
} from "expo-glass-effect";
import { SymbolView } from "expo-symbols";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  type LayoutChangeEvent,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { formatDayLabel, formatWeekdayLabel, toDayId } from "@/lib/date";
import { s, u } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

const DROPDOWN_HEIGHT = u(16);

export function NutritionHeaderDropdown({
  days,
  selectedDayId,
  calories,
  onSelectDay,
  onViewAllHistory,
}: {
  days: Date[];
  selectedDayId: string;
  calories: number;
  onSelectDay: (dayId: string) => void;
  onViewAllHistory: () => void;
}) {
  const { c, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const selectedDay =
    days.find((day) => toDayId(day) === selectedDayId) ?? new Date();

  const canUseGlass =
    Platform.OS === "ios" &&
    isLiquidGlassAvailable() &&
    isGlassEffectAPIAvailable();

  const dropdownHeight = useSharedValue(0);
  const dropdownStyle = useAnimatedStyle(() => ({
    height: dropdownHeight.value,
  }));

  function setDropdownOpen(nextIsOpen: boolean) {
    setIsOpen(nextIsOpen);

    dropdownHeight.value = withTiming(nextIsOpen ? DROPDOWN_HEIGHT : 0, {
      duration: nextIsOpen ? 220 : 180,
      easing: Easing.out(Easing.cubic),
    });
  }

  return (
    <View style={s.mb6}>
      <View style={[s.flexRow, s.itemsCenter, s.justifyBetween]}>
        <Pressable
          onPress={() => setDropdownOpen(!isOpen)}
          accessibilityRole="button"
          accessibilityLabel="Select a day"
          hitSlop={u(2)}
          style={[s.flexRow, s.itemsCenter, s.gap2]}
        >
          <Text style={[s.textXl, s.fontSemibold, { color: c.foreground }]}>
            {formatDayLabel(selectedDay)}
          </Text>

          <SymbolView
            name={{
              ios: isOpen ? "chevron.up" : "chevron.down",
              android: isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down",
            }}
            size={u(3)}
            tintColor={c.muted}
          />
        </Pressable>

        <Text style={[s.textLg, s.fontMedium, { color: c.muted }]}>
          {`${calories} cals`}
        </Text>
      </View>

      <Animated.View style={[s.overflowHidden, dropdownStyle]}>
        <View style={s.pt3}>
          {canUseGlass ? (
            <GlassView
              colorScheme={resolvedTheme}
              glassEffectStyle="regular"
              isInteractive
              style={[
                s.roundedFull,
                s.border1,
                s.overflowHidden,
                {
                  minHeight: u(8),
                  borderColor: c.border,
                },
              ]}
            >
              <DayPickerContent
                days={days}
                selectedDayId={selectedDayId}
                onSelectDay={onSelectDay}
                onViewAllHistory={onViewAllHistory}
                onClose={() => setDropdownOpen(false)}
              />
            </GlassView>
          ) : (
            <View
              style={[
                s.roundedFull,
                s.border1,
                s.overflowHidden,
                {
                  minHeight: u(8),
                  backgroundColor: c.surface,
                  borderColor: c.border,
                },
              ]}
            >
              <DayPickerContent
                days={days}
                selectedDayId={selectedDayId}
                onSelectDay={onSelectDay}
                onViewAllHistory={onViewAllHistory}
                onClose={() => setDropdownOpen(false)}
              />
            </View>
          )}
        </View>
      </Animated.View>
    </View>
  );
}

function DayPickerContent({
  days,
  selectedDayId,
  onSelectDay,
  onViewAllHistory,
  onClose,
}: {
  days: Date[];
  selectedDayId: string;
  onSelectDay: (dayId: string) => void;
  onViewAllHistory: () => void;
  onClose: () => void;
}) {
  const { c } = useTheme();

  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const dayLayouts = useRef<Record<string, { x: number; width: number }>>({});

  const scrollDayToCenter = useCallback(
    (dayId: string, animated = true) => {
      const layout = dayLayouts.current[dayId];

      if (!layout || !scrollViewWidth) {
        return;
      }

      const itemCenter = layout.x + layout.width / 2;
      const targetX = Math.max(0, itemCenter - scrollViewWidth / 2);

      scrollViewRef.current?.scrollTo({
        x: targetX,
        animated,
      });
    },
    [scrollViewWidth],
  );

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      scrollDayToCenter(selectedDayId);
    });

    return () => cancelAnimationFrame(frame);
  }, [selectedDayId, scrollDayToCenter]);

  return (
    <View
      style={[
        s.relative,
        s.flexRow,
        s.itemsCenter,
        s.gap3,
        s.p1,
        { minHeight: u(8) },
      ]}
    >
      <ScrollView
        ref={scrollViewRef}
        onLayout={(event) => {
          setScrollViewWidth(event.nativeEvent.layout.width);
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          s.flexRow,
          s.itemsCenter,
          s.gap6,
          {
            paddingRight: scrollViewWidth / 2.3,
          },
        ]}
        style={s.flex1}
      >
        <Pressable
          onPress={onViewAllHistory}
          accessibilityRole="button"
          style={[s.px4, s.py2]}
        >
          <Text style={[s.textSm, s.fontMedium, { color: c.foreground }]}>
            View all history
          </Text>
        </Pressable>

        {days.map((day) => {
          const dayId = toDayId(day);
          const isSelected = dayId === selectedDayId;
          const label =
            formatDayLabel(day) === "Today" ? "Today" : formatWeekdayLabel(day);

          return (
            <Pressable
              key={dayId}
              onPress={() => {
                onSelectDay(dayId);
                scrollDayToCenter(dayId);
              }}
              onLayout={(event: LayoutChangeEvent) => {
                dayLayouts.current[dayId] = {
                  x: event.nativeEvent.layout.x,
                  width: event.nativeEvent.layout.width,
                };
              }}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              hitSlop={u(2)}
            >
              <Text
                style={[
                  s.textBase,
                  s.fontMedium,
                  {
                    color: isSelected ? c.foreground : c.muted,
                  },
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Pressable
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Close day picker"
        hitSlop={u(2)}
        style={[
          s.absolute,
          s.roundedFull,
          s.center,
          {
            right: 2,
            width: u(10),
            height: u(10),
            backgroundColor: c.surfaceSecondary,
          },
        ]}
      >
        <SymbolView
          name={{
            ios: "xmark",
            android: "close",
          }}
          size={u(3.5)}
          tintColor={c.mutedForeground}
        />
      </Pressable>
    </View>
  );
}
