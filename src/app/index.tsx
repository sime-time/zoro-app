import { useHeaderHeight } from "expo-router/build/react-navigation";
import { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { GlassPressable } from "@/components/GlassPressable";
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
    name: "coffee 1 cup double espresso",
    calories: 10,
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
            <Text style={[s.text2xl, s.fontSemibold, { color: c.foreground }]}>
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
        onPress={() => {}}
        containerStyle={{
          position: "absolute",
          left: u(4),
          right: u(4),
          bottom: insets.bottom + u(3),
        }}
        style={[
          s.justifyCenter,
          s.rounded3xl,
          s.px5,
          {
            height: u(18),
          },
        ]}
      >
        <Text style={{ color: c.foreground }}>HelloWorld</Text>
      </GlassPressable>
    </SafeAreaView>
  );
}
