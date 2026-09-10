import { router } from "expo-router";
import { useHeaderHeight } from "expo-router/build/react-navigation";
import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { DonutChart } from "@/components/charts/DonutChart";
import { GlassPressable } from "@/components/GlassPressable";
import { NutritionHeaderDropdown } from "@/components/nutrition/NutritionHeaderDropdown";
import { getPreviousDays, toDayId } from "@/lib/date";
import { s, u } from "@/ui/styles";
import { useTheme } from "@/ui/theme";

type FoodItem = {
  id: string;
  name: string;
  calories: number;
};

const initialFoods: FoodItem[] = [
  {
    id: "1",
    name: "Chicken thighs",
    calories: 400,
  },
  {
    id: "2",
    name: "Croissant",
    calories: 230,
  },
  {
    id: "4",
    name: "White rice",
    calories: 230,
  },
  {
    id: "6",
    name: "Tuna",
    calories: 230,
  },
];

export default function Index() {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const { c } = useTheme();

  const [foodText, setFoodText] = useState("");
  const [foods, setFoods] = useState(initialFoods);
  const [selectedDayId, setSelectedDayId] = useState(toDayId(new Date()));

  const nutritionDays = getPreviousDays(4);

  const foodTextStyle = [
    s.textLg,
    s.fontNormal,
    s.flex1,
    {
      color: c.foreground,
      minHeight: s.textLg.lineHeight,
    },
  ];

  const addFood = () => {
    const name = foodText.trim();

    if (!name) {
      return;
    }

    setFoods((currentFoods) => [
      ...currentFoods,
      {
        id: String(Date.now()),
        name,
        calories: 1000,
      },
    ]);

    setFoodText("");
  };

  return (
    <SafeAreaView style={s.flex1}>
      <FlatList
        data={foods}
        renderScrollComponent={(props) => (
          <KeyboardAwareScrollView {...props} bottomOffset={u(24)} />
        )}
        keyboardDismissMode="interactive"
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          s.p6,
          s.flexGrow,
          {
            paddingTop: headerHeight - u(6),
            paddingBottom: insets.bottom + u(24),
          },
        ]}
        ListHeaderComponent={
          <NutritionHeaderDropdown
            days={nutritionDays}
            selectedDayId={selectedDayId}
            calories={2407}
            onSelectDay={setSelectedDayId}
            onViewAllHistory={() => {
              // Later: open history sheet.
            }}
          />
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push("/sheets/food-details")}
            style={[
              s.flexRow,
              s.justifyBetween,
              {
                minHeight: u(10),
                paddingVertical: u(1.5),
              },
            ]}
          >
            <Text style={foodTextStyle} numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>

            <Text style={[s.textLg, s.fontMedium, { color: c.muted }]}>
              {item.calories}
            </Text>
          </Pressable>
        )}
        ListFooterComponent={
          <TextInput
            value={foodText}
            onChangeText={setFoodText}
            onSubmitEditing={addFood}
            submitBehavior="submit"
            placeholder="Write your food..."
            placeholderTextColor={c.muted}
            selectionColor={c.primary}
            cursorColor={c.primary}
            autoCorrect
            keyboardType="default"
            returnKeyType="done"
            textAlignVertical="top"
            multiline
            style={[
              foodTextStyle,
              {
                paddingVertical: u(0.9),
              },
            ]}
          />
        }
      />

      <GlassPressable
        onPressOut={() => router.push("/sheets/total-nutrition")}
        containerStyle={[
          s.shadowSm,
          {
            position: "absolute",
            left: u(4),
            right: u(4),
            bottom: insets.bottom + u(3),
          },
        ]}
        style={[
          s.relative,
          s.justifyBetween,
          s.flexRow,
          s.rounded3xl,
          s.px6,
          s.py3,
          {
            minHeight: u(18),
          },
        ]}
      >
        <View
          pointerEvents="none"
          style={[
            s.absolute,
            s.itemsCenter,
            {
              top: u(1.25),
              left: 0,
              right: 0,
            },
          ]}
        >
          <View
            style={[
              s.roundedFull,
              {
                width: u(8.5),
                height: u(1.15),
                backgroundColor: c.muted,
                opacity: 0.5,
              },
            ]}
          />
        </View>

        <View style={[s.flexRow, s.itemsCenter, s.gap3]}>
          <DonutChart value={653} max={2590} size={36} strokeWidth={u(1.5)} />
          <View style={[s.itemsStart]}>
            <Text style={[s.textSm, s.fontSemibold, { color: c.foreground }]}>
              653 / 2470 cals
            </Text>
            <Text style={[s.textSm, s.fontMedium, { color: c.muted }]}>
              1817 cals left
            </Text>
          </View>
        </View>

        <View style={[s.flexRow, s.itemsCenter, s.gap4]}>
          <MacroLabel grams={82} label="protein" />
          <MacroLabel grams={210} label="carbs" />
          <MacroLabel grams={64} label="fat" />
        </View>
      </GlassPressable>
    </SafeAreaView>
  );
}

function MacroLabel({ grams, label }: { grams: number; label: string }) {
  const { c } = useTheme();

  return (
    <View style={s.itemsEnd}>
      <Text style={[s.textSm, s.fontSemibold, { color: c.foreground }]}>
        {grams}g
      </Text>
      <Text style={[s.textSm, s.fontMedium, { color: c.muted }]}>{label}</Text>
    </View>
  );
}
