import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";

import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./loading";
import { useNavigation } from "@react-navigation/native";

const Recipes = ({ categories, meals }) => {
  const navigation = useNavigation();
  return (
    <View className="mx-4 space-y-3">
      <Text
        className="font-semibold text-neutral-600"
        style={{ fontSize: hp(3) }}
      >
        meals
      </Text>
      <View>
        {categories.length == 0 || meals.length == 0 ? (
          <Loading className="mt-20" size="large" />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <CardItem navigation={navigation} item={item} index={i} />
            )}
            // refreshing={isLoadingNext}
            // onRefresh={() => refetch({ first: ITEM_CNT })}
            onEndReachedThreshold={0.1}
            // onEndReached={() => loadNext(ITEM_CNT)}
          />
        )}
      </View>
    </View>
  );
};
const CardItem = ({ item, index, navigation }) => {
  let isEven = index % 2 == 0;
  return (
    <Animated.View entering={FadeInDown.duration(5000).springify()}>
      <Pressable
        onPress={() => {
          navigation.navigate("RecipeDetail", { ...item });
        }}
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5 "
          sharedTransitionTag={item.strMeal}
        />
        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
export default Recipes;
