import { router } from "expo-router";
import { useHeaderHeight } from "expo-router/build/react-navigation";
import { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { DonutChart } from "@/components/charts/DonutChart";
import { GlassPressable } from "@/components/GlassPressable";
import { MacroLabel } from "@/components/MacroLabel";
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
    name: "chicken thighs",
    calories: 400,
  },
  {
    id: "2",
    name: "croissant",
    calories: 230,
  },
];

export default function Index() {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const { c } = useTheme();
  const [foodText, setFoodText] = useState("");
  const [foods, setFoods] = useState(initialFoods);

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
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          s.p6,
          s.flexGrow,
          { paddingTop: headerHeight - u(6) },
        ]}
        ListHeaderComponent={
          <View
            style={[s.mb4, s.flex1, s.flexRow, s.itemsCenter, s.justifyBetween]}
          >
            <Text style={[s.textXl, s.fontSemibold, { color: c.foreground }]}>
              Today
            </Text>
            <Text style={[s.textLg, s.fontMedium, { color: c.muted }]}>
              240 cals
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              s.flexRow,
              s.itemsCenter,
              s.justifyBetween,
              { height: u(10) },
            ]}
          >
            <Text
              style={[s.textLg, s.fontNormal, s.flex1, { color: c.foreground }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>

            <Text style={[s.textLg, s.fontMedium, { color: c.muted }]}>
              {item.calories}
            </Text>
          </View>
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
            multiline
            textAlignVertical="center"
            autoCorrect
            keyboardType="default"
            returnKeyType="done"
            style={[
              s.textLg,
              s.fontNormal,
              s.flex1,
              s.textLeft,
              { color: c.foreground, minHeight: u(10) },
            ]}
          />
        }
      />

      <GlassPressable
        onPress={() => router.push("/sheets/nutrition-details")}
        containerStyle={[
          s.shadow,
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
                width: u(8),
                height: u(1.1),
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
